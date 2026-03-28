-- Étape 1 : copier le fichier PNG sur le serveur
--   scp signature.png user@serveur:/var/www/mus_storage/images/signature.png
--
-- Étape 2 : lancer ce script
--   mysql -u <user> -p <db_name> < insert_signature_media.sql
--
-- Étape 3 : noter l'ID retourné et mettre à jour Home.jsx

INSERT INTO media (
  owner_user_id,
  kind,
  storage,
  filename,
  original_name,
  disk_path,
  mime_type,
  size,
  visibility,
  created_at,
  alt
) VALUES (
  NULL,
  'image',
  'local',
  'signature.png',
  'signature.png',
  '/var/www/mus_storage/images/signature.png',
  'image/png',
  0,
  'public',
  NOW(),
  'Signature de l\'autrice'
);

SELECT LAST_INSERT_ID() AS ID_media_signature;
