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
            res.status(500).json({error: 'the projects info could not be retrieved'})
        })
});

module.exports = router;