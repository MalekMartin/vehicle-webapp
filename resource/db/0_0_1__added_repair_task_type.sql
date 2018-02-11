-- Types:
-- 0 - MATERIAL
-- 1 - WORK
-- 2 - OTHER
ALTER TABLE repair_task
ADD COLUMN type tinyint NOT NULL DEFAULT 0