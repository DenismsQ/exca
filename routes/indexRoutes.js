const express = require('express');
const router = express.Router();
const MainPage = require('../models/MainPage');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/cards');
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
        const mainPage = await MainPage.find();
        res.render('index', { mainPage, session: req.session });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/new-card', upload.single('imageUrl'), async (req, res) => {
    try {
      // Получаем данные из формы
      const { name, about, price } = req.body;
  
      // Получаем путь к загруженному аватару, если он присутствует
      let imageUrl = null;
      if (req.file) {
        imageUrl = path.join('/img/cards', req.file.filename);
      }
  
      // Создаем новую запись о пользователе
      const newCard = new MainPage({
        imageUrl,
        name,
        about,
        price,
        
      });
  
      // Сохраняем запись в базе данных
      await newCard.save();
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });



module.exports = router;