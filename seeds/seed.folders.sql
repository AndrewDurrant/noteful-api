BEGIN;

TRUNCATE folders, notes;

INSERT INTO folders (folder_name)
VALUES 
  ('Important'), 
  ('Educational'), 
  ('Software'), 
  ('Music');

COMMIT;