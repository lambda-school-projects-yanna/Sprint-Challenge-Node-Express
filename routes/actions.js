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
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({error: "the actions with the specified id could not be retrieved."})
        })
});

// ================ POST endpoints 

module.exports = router;