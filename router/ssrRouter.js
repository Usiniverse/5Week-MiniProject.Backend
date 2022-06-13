const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).render('index');
});

router.get('/login', async (req, res) => {
    res.status(200).render('login');
});

router.get('/signup', async (req, res) => {
    res.status(200).render('signup');
});

router.get('/read', async (req, res) => {
    res.status(200).render('read');
});

router.get('/write', async (req, res) => {
    res.status(200).render('write');
});

module.exports = router;