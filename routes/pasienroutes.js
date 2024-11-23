const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET: Menampilkan daftar pasien
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pasien';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', {
            layout: 'layouts/main-layout',
            title: 'Daftar Pasien',
            pasien: results,
        });
    });
});

// GET: Form tambah pasien
router.get('/add', (req, res) => {
    res.render('add', {
        layout: 'layouts/main-layout',
        title: 'Tambah Pasien',
    });
});

// POST: Tambah pasien
router.post('/add', (req, res) => {
    const { nama, alamat } = req.body;
    const sql = 'INSERT INTO pasien (nama, alamat) VALUES (?, ?)';
    db.query(sql, [nama, alamat], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// GET: Form edit pasien
router.get('/edit/:id', (req, res) => {
    const sql = 'SELECT * FROM pasien WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        res.render('edit', {
            layout: 'layouts/main-layout',
            title: 'Edit Pasien',
            pasien: results[0],
        });
    });
});

// POST: Simpan perubahan pasien
router.post('/edit/:id', (req, res) => {
    const { nama, alamat } = req.body;
    const sql = 'UPDATE pasien SET nama = ?, alamat = ? WHERE id = ?';
    db.query(sql, [nama, alamat, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// GET: Hapus pasien
router.get('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM pasien WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;