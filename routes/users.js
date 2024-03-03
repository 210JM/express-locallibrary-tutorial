const express = require('express');
const router = express.Router();

router.get('/cool', (req, res) => {
    const language = req.headers['accept-language'];
    if (language && language.startsWith('uk')) {
        res.send("Ну, ви і крутий!");
    } else {
        res.send("You're so cool!");
    }
});

module.exports = router;