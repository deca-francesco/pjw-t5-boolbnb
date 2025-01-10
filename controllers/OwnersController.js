const connection = require('../database/connection');
const sha1 = require('sha1')
const md5 = require('md5')

// show function
function show(req, res) {

    // take values from the request body
    const email = req.body.email

    // using sha1 and md5 to hash the password
    const password = sha1(md5(req.body.password))

    // console log to check the email and the passwords
    console.log(`email: ${email}. password: ${password} ${req.body.password}`);

    // create the sql query
    const sql = `SELECT * FROM proprietari WHERE email= ? AND password= ?`

    // execute the query
    connection.query(sql, [email, password], (err, result) => {
        if (err) return res.status(err).json({ error: err.message })
        if (!result[0]) return res.status(404).json({ message: 'Email o Password sbagliati', err })
        res.status(200).json({ success: true })
    })
}

// function store to add a new owner
function store(req, res) {

    // take values from the request body
    const { nome, cognome, email, password, numero_telefonico } = req.body

    // using sha1 and md5 to hash the password
    const hashedPassword = sha1(md5(password))

    // validation for important fields
    if (!nome || !cognome || !email || !password) {
        return res.status(400).json({ error: 'Non hai inserito tutti i campi obbligatori!' })
    }

    // create the sql query
    const sql = `INSERT INTO proprietari SET nome= ?, cognome= ?, email= ?, password= ?, numero_telefonico= ? `;

    // execute the query
    connection.query(sql, [nome, cognome, email, hashedPassword, numero_telefonico], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}

module.exports = {
    show,
    store
}