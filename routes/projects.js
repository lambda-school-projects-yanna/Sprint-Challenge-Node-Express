const express = require('express');
const router = express.Router();
const cors = require('cors');

const db = require('../data/helpers/projectModel');

// ================ GET endpoints 

router.get('/', cors(), (req, res) => {
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
    const proj = req.body;
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

// ================ DELETE endpoints 

router.delete('/:id', (req, res) => {
    const projectId = req.params.id;
    db.remove(projectId)
        .then((proj) => {
            res.status(204).json(proj)
        })
        .catch(() => {
            res.status(500).json({error: "the project could not be removed."})
        })
});


// ================ PUT endpoints 


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    db.update(id, update)
        .then(projMatch => {
            if (!projMatch) {
                res.status(404).json({message: "The project with the specified ID does not exist."})
            }
            else if (!update.name || !update.description) {
                res.status(400).json({ errorMessage: "Please provide name and description for the project." })
            }
            else {
                res.status(200).json(update)
            }
        })
        .catch(() => {
            res.status(500).json({error: "The project information could not be modified."})
        })
});

module.exports = router;