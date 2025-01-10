const connection = require('../database/connection');
const sha1 = require('sha1')
const md5 = require('md5')

function show(req, res) {
    const email = req.body.email
    const password = sha1(md5(req.body.password))

    console.log(`email: ${email}. password: ${password} ${req.body.password}`);

    const sql = `SELECT * FROM proprietari WHERE email= ? AND password= ?`

    connection.query(sql, [email, password], (err, result) => {
        if (err) return res.status(err).json({ error: err.message })
        if (!result[0]) return res.status(404).json({ message: 'Email o Password sbagliati', err })
        res.status(200).json({ success: true })
    })
}

function store(req, res) {

    const { nome, cognome, email, password, numero_telefonico } = req.body
    const hashedPassword = sha1(md5(password))

    if (!nome || !cognome || !email || !password) {
        return res.status(400).json({ error: 'Non hai inserito tutti i campi obbligatori!' })
    }

    const sql = `INSERT INTO proprietari SET nome= ?, cognome= ?, email= ?, password= ?, numero_telefonico= ? `;

    connection.query(sql, [nome, cognome, email, hashedPassword, numero_telefonico], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}

module.exports = {
    show,
    store
}