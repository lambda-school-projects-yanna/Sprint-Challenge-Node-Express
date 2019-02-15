const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');


// ================ GET endpoints 

router.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({error: 'the actions info could not be retrieved.'})
        })
});

router.get('/:id', (req, res) => {
    const actionID = req.params.id;
    db.get(actionID)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            }
            else {
                res.status(404).json({message: "the action with the specified id does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({error: "the actions with the specified id could not be retrieved."})
        })
});

// ================ POST endpoints 


router.post('/', (req, res) => {
    const action = req.body;
    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({message: 'please provide the action with a project_id, description, and notes.'})
    }
    else {
        db.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({error: "the new action could not be posted"})
        })
    }
});

// ================ DELETE endpoints 

router.delete('/:id', (req, res) => {
    const actionId = req.params.id;
    db.remove(actionId)
        .then((action) => {
            res.status(204).json(action)
        })
        .catch(() => {
            res.status(500).json({error: "the action could not be removed."})
        })
});

// ================ PUT endpoints 

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    db.update(id, update)
        .then(actionMatch => {
            if (!actionMatch) {
                res.status(404).json({message: "The action with the specified ID does not exist."})
            }
            else if (!update.project_id || !update.description || !update.notes) {
                res.status(400).json({ errorMessage: "Please provide notes, description, and project_id for the action." })
            }
            else {
                res.status(200).json(update)
            }
        })
        .catch(() => {
            res.status(500).json({error: "The action information could not be modified."})
        })
});

module.exports = router;