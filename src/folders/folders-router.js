const express = require('express');
const FoldersService = require('./folders-service');
const xss = require('xss');

const foldersRouter = express.Router();
const jsonBodyParser = express.json();

const sanitize = item => ({
  id: item.id,
  folder_name: xss(item.folder_name),
});

foldersRouter
  .route('/')
  .get((req, res, next) => {
    FoldersService.getAllFolders(req.app.get('db'))
      .then(folders => res.json(folders.map(folder => sanitize(folder))));
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { folder_name } = req.body;

    if (!folder_name) {
      res.status(400).json({ error: 'A folder name is required' });
    }

    const newFolder = {
      folder_name
    };

    FoldersService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        res.status(201).json(sanitize(folder));
      })
      .catch(next);
  });

foldersRouter
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params;

    FoldersService.getFolderById(
      req.app.get('db'), 
      id
    )
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: 'Folder does not exist' }
          });
        }
        res.folder = folder;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(sanitize(res.folder));
  })
  .delete((req, res, next) => {
    FoldersService.deleteFolder(
      req.app.get('db'), 
      req.params.id
    )
      .then(() => {
        res.status(204).end();
      });
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { folder_name } = req.body;
    const folderToUpdate = { folder_name };
    const id = req.body.id;

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;

    if (numberOfValues === 0) {
      return res.status(400).json({ 
        error: {
          message: 'Request body must contain \'folder_name\''
        }
      });
    }

    FoldersService.updateFolder(
      req.app.get('db', id, folderToUpdate)
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = foldersRouter;

