const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const MAINTENANCE_DIR = '/var/maintenance';
const SCHEDULE_FILE = path.join(MAINTENANCE_DIR, 'schedule.json');

// Public : retourne la planification en cours (utilisé par le banner React)
router.get('/', (req, res) => {
  try {
    const enabled = fs.existsSync(path.join(MAINTENANCE_DIR, 'maintenance.enabled'));
    if (!fs.existsSync(SCHEDULE_FILE)) {
      return res.json({ scheduled: false, enabled });
    }
    const schedule = JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
    res.json({ ...schedule, enabled });
  } catch {
    res.json({ scheduled: false, enabled: false });
  }
});

// Admin : définir (ou effacer) la fenêtre de maintenance planifiée
// Protégé par l'en-tête x-maintenance-secret (valeur = var d'env MAINTENANCE_SECRET)
router.post('/schedule', (req, res) => {
  const secret = process.env.MAINTENANCE_SECRET;
  const provided = req.headers['x-maintenance-secret'];

  if (!secret || provided !== secret) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { scheduledStart, scheduledEnd, message } = req.body;

  try {
    fs.mkdirSync(MAINTENANCE_DIR, { recursive: true });

    if (!scheduledStart && !scheduledEnd) {
      // Supprime la planification
      if (fs.existsSync(SCHEDULE_FILE)) fs.unlinkSync(SCHEDULE_FILE);
      return res.json({ success: true, scheduled: false });
    }

    const schedule = {
      scheduled: true,
      scheduledStart: scheduledStart || null,
      scheduledEnd: scheduledEnd || null,
      message: message || null,
    };

    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2));

    // Notifier tous les clients connectés en temps réel
    const io = req.app.locals.io;
    if (io) io.emit('maintenance:scheduled', schedule);

    res.json({ success: true, ...schedule });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin : activer la maintenance immédiatement (appelé par deploy.sh)
router.post('/enable', (req, res) => {
  const secret = process.env.MAINTENANCE_SECRET;
  const provided = req.headers['x-maintenance-secret'];

  if (!secret || provided !== secret) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    fs.mkdirSync(MAINTENANCE_DIR, { recursive: true });
    fs.writeFileSync(path.join(MAINTENANCE_DIR, 'maintenance.enabled'), '');

    const io = req.app.locals.io;
    if (io) io.emit('maintenance:enabled');

    res.json({ success: true, enabled: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin : désactiver la maintenance (appelé par deploy.sh en fin de deploy)
router.post('/disable', (req, res) => {
  const secret = process.env.MAINTENANCE_SECRET;
  const provided = req.headers['x-maintenance-secret'];

  if (!secret || provided !== secret) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const flagPath = path.join(MAINTENANCE_DIR, 'maintenance.enabled');
    if (fs.existsSync(flagPath)) fs.unlinkSync(flagPath);

    const io = req.app.locals.io;
    if (io) io.emit('maintenance:disabled');

    res.json({ success: true, enabled: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
