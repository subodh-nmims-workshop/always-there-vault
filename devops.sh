#!/bin/bash

echo "🚀 Starting DevOps Workflow for DeadMan Protocol (Account: subodh40)..."

# 1. Target the Docker Desktop Engine so images appear in the GUI application
export DOCKER_HOST=unix:///home/nothing/.docker/desktop/docker.sock

echo "🔑 Step 1: Login to your Docker Hub account..."
# Using docker directly (without sudo) for Docker Desktop context
if ! docker login -u subodh40; then
    echo "❌ Docker Hub login failed/canceled. Push might fail."
fi

echo "🏗️ Step 2: Building images for Docker Desktop..."
# Build without sudo to integrate with the Desktop GUI
if ! docker compose build; then
    echo "❌ Build failed! Stopping..."
    exit 1
fi

echo "☁️ Step 3: Pushing images to your Docker Hub repository..."
docker push subodh40/lastwish-blockchain:latest
docker push subodh40/lastwish-backend:latest
docker push subodh40/lastwish-web:latest

echo "🏃‍♂️ Step 4: Starting all services locally..."
docker compose up -d

echo "☸️ Step 5: Kubernetes Deployment Check..."
# Kubernetes in Docker Desktop will pick up these local images
kubectl apply -f k8s/deployment.yaml

echo "✅ DevOps workflow complete!"
