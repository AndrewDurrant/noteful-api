BEGIN;

TRUNCATE notes;

INSERT INTO notes (note_name, modified, folderId, content)
VALUES
  ('Vet', now() - '2 days'::INTERVAL, 5, 'Mirah has an appointment next Tuesday'),
  ('Ecology', now() - '28 days'::INTERVAL, 6, 'Christmas Bird Count Totals: 204'),
  ('Python', now() - '5 days'::INTERVAL, 7, 'Exploring CPython’s Internals'),
  ('Lyrics', now() - '1 days'::INTERVAL, 8, 'I tear down all my walls, give you everything'),
  ('Today', now() - '3 days'::INTERVAL, 5, 'Do not forget that today is today!'),
  ('French', now() - '11 days'::INTERVAL, 6, 'Listen to more Flavien'),
  ('Django', now() - '21 days'::INTERVAL, 7, 'excited to build a backend with django!'),
  ('Discover', now() - '4 days'::INTERVAL, 8, 'La Femme, Billy Strings, Black Pumas'),
  ('socket.io', now() - '7 days'::INTERVAL, 7, 'look into this already!');

  COMMIT;