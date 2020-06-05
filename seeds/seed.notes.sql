BEGIN;

TRUNCATE notes;

INSERT INTO notes (title, folder_id, content)
VALUES
  ('Vet', 1, 'Mirah has an appointment next Tuesday'),
  ('Ecology', 2, 'Christmas Bird Count Totals: 204'),
  ('Python', 3, 'Exploring CPython’s Internals'),
  ('Lyrics', 4, 'I tear down all my walls, give you everything'),
  ('Today', 1, 'Do not forget that today is today!'),
  ('French', 2, 'Listen to more Flavien'),
  ('Django', 3, 'excited to build a backend with django!'),
  ('Discover', 4, 'La Femme, Billy Strings, Black Pumas'),
  ('socket.io', 3, 'look into this already!');

  COMMIT;