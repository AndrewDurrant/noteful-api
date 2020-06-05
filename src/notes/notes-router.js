const express = require('express');
const xss = require('xss');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const jsonBodyParser = express.json();

const sanitize = item => ({
  id: item.id,
  modified: item.modified,
  folderid: item.folderid,
  note_name: xss(item.note_name),
  content: xss(item.content)
});

notesRouter
  .route('/')
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get('db'))
      .then(notes => res.json(notes.map(note => sanitize(note))));
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { note_name, content, folderid, modified } = req.body;

    const newNote = {
      note_name,
      content,
      folderid,
      modified
    };

    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    NotesService.insertNote(req.app.get('db'), newNote)
      .then(note => {
        res.status(201).json(sanitize(note));
      })
      .catch(next);
  });

notesRouter
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params;

    NotesService.getNoteById(
      req.app.get('db'),
      id
    )
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: 'note does not exist' }
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(sanitize(res.note));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { note_name, content, folderid } = req.body;
    const noteToUpdate = { note_name, content, folderid };
    const id = req.params.id;

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;

    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain \'note_name\', \'content\', and \'folderId\''
        }
      });
    }

    NotesService.updateNote(
      req.app.get('db', id, noteToUpdate)
    )
      .then(() => {
        res.status(204);
      })
      .catch(next);
  });

module.exports = notesRouter;