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
            res.status(500).json({error: 'the projects info could not be retrieved'})
        })
});

module.exports = router;