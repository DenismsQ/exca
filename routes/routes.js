const express = require('express');
const router = express.Router();
const dashboardRoutes = require('./dashboardRoutes');
const indexRoutes = require('./indexRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const registerRoutes = require('./registerRoutes');

router.use('/', indexRoutes);
router.use('/login',loginRoutes)
router.use('/logout', logoutRoutes);
router.use('/register',registerRoutes);

// Добавляем путь "/dashboard" для включения dashboardRoutes
router.use('/dashboard', dashboardRoutes);

module.exports = router;