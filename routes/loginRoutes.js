const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', (req,res) => {
    if (req.session.isAuthenticated) {
        return res.send('Вы уже авторизованы');
    }
    res.render('login', { session: req.session});
})

router.post('/', loginController.login);

module.exports = router;