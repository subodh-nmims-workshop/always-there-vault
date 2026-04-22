#!/bin/bash

# ========================================================
# Last Wish Protocol - Database Restore Script
# ========================================================

set -e

if [ -z "$1" ]; then
    echo "Usage: ./restore-database.sh <backup_file>"
    echo ""
    echo "Available backups:"
    ls -lh ./backups/lastwish_backup_*.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  WARNING: This will replace the current database!"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled"
    exit 0
fi

echo ""
echo "🗄️  Starting database restore..."
echo ""

# Copy backup to container
docker cp "$BACKUP_FILE" lastwish-mongodb:/tmp/restore.archive

# Restore MongoDB
docker exec lastwish-mongodb mongorestore \
  --username=admin \
  --password="${MONGO_PASSWORD:-password}" \
  --authenticationDatabase=admin \
  --archive=/tmp/restore.archive \
  --gzip \
  --drop

# Clean up container
docker exec lastwish-mongodb rm /tmp/restore.archive

echo ""
echo "✅ Database restored successfully!"
echo ""
