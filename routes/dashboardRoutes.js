const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/avatars');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({ user: req.session.user._id });

    res.render('userDashboard', { user: req.session.user, userDetails , session: req.session});
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

router.post('/add-data', upload.single('avatar'), async (req, res) => {
  try {
    // Получаем данные из формы
    const { nickname, about } = req.body;

    // Получаем путь к загруженному аватару, если он присутствует
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = path.join('/img/avatars', req.file.filename);
    }

    // Создаем новую запись о пользователе
    const newUserData = new UserDetails({
      user: req.session.user._id,
      nickname,
      about,
      avatarUrl,
    });

    // Сохраняем запись в базе данных
    await newUserData.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

router.post('/delete-data', async (req, res) => {
  try {
    // Удаляем данные о пользователе из базы данных
    await UserDetails.deleteOne({ user: req.session.user._id });

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

module.exports = router;