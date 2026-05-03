#!/bin/bash

# ========================================================
# Always There Protocol - Database Backup Script
# ========================================================

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="alwaysthere_backup_${TIMESTAMP}.gz"

mkdir -p "$BACKUP_DIR"

echo "🗄️  Starting database backup..."
echo ""

# Backup MongoDB
docker exec alwaysthere-mongodb mongodump \
  --username=admin \
  --password="${MONGO_PASSWORD:-password}" \
  --authenticationDatabase=admin \
  --db=digital-will \
  --archive=/tmp/backup.archive \
  --gzip

# Copy backup from container
docker cp alwaysthere-mongodb:/tmp/backup.archive "${BACKUP_DIR}/${BACKUP_FILE}"

# Clean up container
docker exec alwaysthere-mongodb rm /tmp/backup.archive

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}"
echo ""

# Keep only last 7 backups
cd "$BACKUP_DIR"
ls -t alwaysthere_backup_*.gz | tail -n +8 | xargs -r rm
echo "🧹 Old backups cleaned up"
echo ""

echo "📊 Available backups:"
ls -lh alwaysthere_backup_*.gz
echo ""
