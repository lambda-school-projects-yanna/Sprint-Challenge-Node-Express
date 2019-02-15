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
            if (projects) {
                res.status(200).json(projects)
            }
            else {
                res.status(404).json({message: 'the project with the specified id does not exist.'})
            }
        })
        .catch(() => {
            res.status(500).json({error: "the projects could not be retrieved by the id."})
        })
});

router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    db.getProjectActions(projectId)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            }
            else {
                res.status(404).json({message: "the specified project has no actions."})
            }

        })
        .catch(() => {
            res.status(500).json({error: "the project's actions could not be retrieved by the id."})
        })
});

// ================ POST endpoints 

router.post('/', (req, res) => {
    proj = req.body;
    if (!proj.name || !proj.description) {
        res.status(400).json({message: 'please provide the project with a name and description.'})
    }
    else {
        db.insert(proj)
        .then(proj => {
            res.status(201).json(proj)
        })
        .catch(() => {
            res.status(500).json({error: "the new project could not be posted"})
        })
    }
});

module.exports = router;