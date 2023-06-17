const bcrypt = require('bcryptjs')
const User = require('../models/user')

async function register(req,res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send('Введите email и пароль');
    }
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).send('Пользователь с таким email уже зарегистрирован');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
    });
    try {
        await user.save();
        res.send('Вы успешно зарегистрировались');
    } catch(err) {
        res.status(500).send('Ошибка при сохранении пользователя в базе данных')
        console.log(err)
    }
};

module.exports = {
    register
}