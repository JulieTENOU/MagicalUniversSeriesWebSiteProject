import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Collapse } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';

function MaintenanceBanner() {
  const { t, i18n } = useTranslation();
  const [schedule, setSchedule] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function applySchedule(data) {
      if (!data) return;

      // Maintenance active → rediriger (le serveur a confirmé)
      if (data.enabled) {
        window.location.href = '/maintenance.html';
        return;
      }

      if (!data.scheduled || !data.scheduledStart) return;

      const start = new Date(data.scheduledStart);
      const now = new Date();
      const diff = start - now;

      if (diff <= 0 || diff > 14 * 24 * 60 * 60 * 1000) return;

      const dismissKey = `maintenance_banner_dismissed_${data.scheduledStart}`;
      const dismissedUntil = localStorage.getItem(dismissKey);
      if (dismissedUntil && new Date(dismissedUntil) > now) return;

      setSchedule(data);
      setVisible(true);
    }

    function checkSchedule() {
      fetch('/api/maintenance')
        .then(r => (r.ok ? r.json() : null))
        .then(applySchedule)
        .catch(() => {});
    }

    checkSchedule();
    const interval = setInterval(checkSchedule, 10 * 1000);

    // Socket.io : notifications temps réel depuis le serveur
    const socket = io({ path: '/socket.io', transports: ['websocket'] });
    socket.on('maintenance:scheduled', (data) => {
      applySchedule({ ...data, enabled: false });
    });
    socket.on('maintenance:enabled', () => {
      window.location.href = '/maintenance.html';
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  const handleDismiss = () => {
    if (schedule) {
      const dismissKey = `maintenance_banner_dismissed_${schedule.scheduledStart}`;
      localStorage.setItem(dismissKey, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    }
    setVisible(false);
  };

  if (!schedule) return null;

  const locale = i18n.language.startsWith('fr') ? 'fr-FR' : 'en-GB';
  const fmtDate = iso =>
    new Date(iso).toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  const fmtTime = iso =>
    new Date(iso).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Collapse in={visible}>
      <Alert
        severity="warning"
        icon={<BuildIcon />}
        action={
          <Button color="inherit" size="small" onClick={handleDismiss}>
            {t('maintenance.dismiss')}
          </Button>
        }
        sx={{ borderRadius: 0, position: 'relative', zIndex: 1300 }}
      >
        <AlertTitle>{t('maintenance.banner_title')}</AlertTitle>
        {t('maintenance.banner_text', {
          date: fmtDate(schedule.scheduledStart),
          startTime: fmtTime(schedule.scheduledStart),
          endTime: schedule.scheduledEnd ? fmtTime(schedule.scheduledEnd) : '?',
        })}
      </Alert>
    </Collapse>
  );
}

export default MaintenanceBanner;
