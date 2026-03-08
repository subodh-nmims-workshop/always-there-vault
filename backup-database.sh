#!/bin/bash

# ========================================================
# DeadMan Protocol - Database Backup Script
# ========================================================

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="deadman_backup_${TIMESTAMP}.gz"

mkdir -p "$BACKUP_DIR"

echo "🗄️  Starting database backup..."
echo ""

# Backup MongoDB
docker exec deadman-mongodb mongodump \
  --username=admin \
  --password="${MONGO_PASSWORD:-password}" \
  --authenticationDatabase=admin \
  --db=digital-will \
  --archive=/tmp/backup.archive \
  --gzip

# Copy backup from container
docker cp deadman-mongodb:/tmp/backup.archive "${BACKUP_DIR}/${BACKUP_FILE}"

# Clean up container
docker exec deadman-mongodb rm /tmp/backup.archive

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}"
echo ""

# Keep only last 7 backups
cd "$BACKUP_DIR"
ls -t deadman_backup_*.gz | tail -n +8 | xargs -r rm
echo "🧹 Old backups cleaned up"
echo ""

echo "📊 Available backups:"
ls -lh deadman_backup_*.gz
echo ""
