BEGIN;

TRUNCATE folders, notes;

INSERT INTO folders (title)
VALUES 
  ('Important'), 
  ('Educational'), 
  ('Software'), 
  ('Music');

COMMIT;