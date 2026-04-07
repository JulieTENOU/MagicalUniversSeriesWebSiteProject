#!/bin/bash
# schedule-maintenance.sh — Programme l'annonce ET le déploiement automatique
# Usage: ./schedule-maintenance.sh "2026-04-15T22:00:00+02:00" "2026-04-15T23:30:00+02:00"

set -e

SCRIPT_DIR="/data/apps/mus-website"
START="$1"
END="$2"

if [ -z "$START" ] || [ -z "$END" ]; then
    echo "Usage: $0 <scheduledStart> <scheduledEnd>"
    echo "Exemple: $0 '2026-04-15T22:00:00+02:00' '2026-04-15T23:30:00+02:00'"
    exit 1
fi

# Lire le secret depuis back/.env
MAINTENANCE_SECRET=$(grep "^MAINTENANCE_SECRET=" "$SCRIPT_DIR/back/.env" | head -1 | cut -d= -f2)

if [ -z "$MAINTENANCE_SECRET" ]; then
    echo "Erreur: MAINTENANCE_SECRET introuvable dans back/.env"
    exit 1
fi

# 1. Enregistrer le schedule → bannière visible sur le site
echo "→ Enregistrement de l'annonce..."
RESPONSE=$(curl -s -X POST http://localhost:3333/api/maintenance/schedule \
    -H "Content-Type: application/json" \
    -H "x-maintenance-secret: $MAINTENANCE_SECRET" \
    -d "{\"scheduledStart\":\"$START\",\"scheduledEnd\":\"$END\"}")
echo "  $RESPONSE"

# 2. Programmer le deploy.sh à l'heure de début via 'at'
AT_TIME=$(date -d "$START" "+%H:%M %Y-%m-%d")
echo ""
echo "→ Programmation du déploiement pour le $AT_TIME..."
JOB=$(echo "$SCRIPT_DIR/deploy.sh >> /var/log/mus-deploy.log 2>&1" | sudo at "$AT_TIME" 2>&1)
echo "  $JOB"

echo ""
echo "✓ Tout est programmé !"
echo "  - Annonce visible dès maintenant sur le site"
echo "  - Déploiement automatique le $AT_TIME"
echo ""
echo "  Pour annuler : atq (voir les jobs) puis atrm <numéro>"
