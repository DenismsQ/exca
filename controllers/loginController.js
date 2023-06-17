const bcrypt = require('bcryptjs')
const User = require('../models/user')


async function login(req,res) {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send('Введите Email и пароль')
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('Неверный Email или пароль');
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send('Неверный Email или пароль');
    }

    req.session.isAuthenticated = true;
    req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    
    res.redirect('/')
};

module.exports = {
    login
}