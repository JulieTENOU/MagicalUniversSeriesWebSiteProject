CREATE TABLE IF NOT EXISTS `scenario_snapshots` (
  `id`            INT          NOT NULL AUTO_INCREMENT,
  `character_id`  INT          NOT NULL,
  `snapshot_data` JSON         NOT NULL,
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
