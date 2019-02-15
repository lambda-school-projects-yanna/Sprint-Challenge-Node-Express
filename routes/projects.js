const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel');

// ================ GET endpoints 

router.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({error: 'the projects info could not be retrieved.'})
        })
});

router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    db.get(projectId)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({error: "the projects could not be retrieved by the id."})
        })
});

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    db.getProjectActions(projectId)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({error: "the project's actions could not be retrieved by the id."})
        })
});

// ================ POST endpoints 

module.exports = router;