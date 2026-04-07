#!/bin/bash
# deploy.sh — Rebuild de la prod avec page de maintenance automatique
set -e

MAINTENANCE_DIR="/data/docker/mus-maintenance"
PROJECT_DIR="/data/apps/mus-website"
COMPOSE="docker compose -f $PROJECT_DIR/docker-compose.yml"
MAINTENANCE_SECRET=$(grep "^MAINTENANCE_SECRET=" "$PROJECT_DIR/back/.env" | head -1 | cut -d= -f2)

echo "======================================"
echo " Déploiement Magical Universe"
echo "======================================"

# 1. Créer le dossier de maintenance si besoin
mkdir -p "$MAINTENANCE_DIR"

# 2. Activer la page de maintenance
# nginx reste UP et sert maintenance.html pendant tout le deploy
echo ""
echo "→ Activation de la maintenance..."
touch "$MAINTENANCE_DIR/maintenance.enabled"
curl -s -X POST http://localhost:3333/api/maintenance/enable \
  -H "x-maintenance-secret: $MAINTENANCE_SECRET" > /dev/null || true
echo "  ✓ Page de maintenance active (les visiteurs sont redirigés immédiatement)"

# 3. Build des nouvelles images (nginx reste UP pendant ce temps)
echo ""
echo "→ Build des images..."
cd "$PROJECT_DIR"
$COMPOSE build
echo "  ✓ Images construites"

# 4. Redémarrer uniquement back + db — nginx reste UP et continue de servir maintenance.html
echo ""
echo "→ Redémarrage du backend..."
$COMPOSE up -d back db
echo "  ✓ Backend relancé"

# 5. Attendre que le backend soit prêt
echo ""
echo "→ Attente du backend..."
MAX_WAIT=120
WAITED=0
until $COMPOSE exec -T back wget -q --spider http://localhost:3333/api/maintenance 2>/dev/null; do
  sleep 5
  WAITED=$((WAITED + 5))
  echo "  ... ($WAITED s / ${MAX_WAIT} s max)"
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "  ⚠ Timeout — désactivation de la maintenance quand même"
    break
  fi
done
echo "  ✓ Backend prêt"

# 6. Attendre la fin de la fenêtre planifiée si elle n'est pas encore écoulée
SCHEDULED_END=$(python3 -c "
import json
try:
  d = json.load(open('$MAINTENANCE_DIR/schedule.json'))
  print(d.get('scheduledEnd',''))
except: print('')
" 2>/dev/null || echo "")

if [ -n "$SCHEDULED_END" ]; then
  END_TS=$(date -d "$SCHEDULED_END" +%s 2>/dev/null || echo 0)
  NOW_TS=$(date +%s)
  WAIT=$((END_TS - NOW_TS))
  if [ "$WAIT" -gt 0 ]; then
    echo ""
    echo "→ Attente de la fin de la fenêtre de maintenance ($WAIT s)..."
    sleep "$WAIT"
  fi
fi

# 7. Désactiver la maintenance — les clients connectés sont notifiés via socket
echo ""
echo "→ Désactivation de la maintenance..."
curl -s -X POST http://localhost:3333/api/maintenance/disable \
  -H "x-maintenance-secret: $MAINTENANCE_SECRET" > /dev/null || true
rm -f "$MAINTENANCE_DIR/maintenance.enabled"
echo "  ✓ Site de nouveau accessible"

# 8. Redémarrer nginx en dernier avec la nouvelle image (brève coupure ~1 s, maintenance déjà désactivée)
echo ""
echo "→ Mise à jour du frontend..."
$COMPOSE up -d nginx
echo "  ✓ Frontend mis à jour"

echo ""
echo "======================================"
echo " Déploiement terminé avec succès !"
echo "======================================"
