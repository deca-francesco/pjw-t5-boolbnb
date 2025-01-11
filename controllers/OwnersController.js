const connection = require('../database/connection');
const sha1 = require('sha1')
const md5 = require('md5')
const Joi = require('joi')

// show function
function show(req, res) {

    // take values from the request body
    const email = req.body.email

    // using sha1 and md5 to hash the password
    const password = sha1(md5(req.body.password))

    // console log to check the email and the passwords
    console.log(`email: ${email}. password: ${password} ${req.body.password}`);

    // create the sql query
    const sql = `SELECT * FROM owners WHERE email= ? AND password= ?`

    // execute the query
    connection.query(sql, [email, password], (err, result) => {
        if (err) return res.status(err).json({ error: err.message })
        if (!result[0]) return res.status(404).json({ message: 'Email o Password sbagliati', err })
        res.status(200).json({ success: true })
    })
}



// function store to add a new owner
function store(req, res) {

    // validation datas for a new owner

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone_number: Joi.string().optional()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    // take values from the request body
    const { name, last_name, email, password, phone_number } = req.body

    // using sha1 and md5 to hash the password
    const hashedPassword = sha1(md5(password))

    // validation for important fields
    if (!name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'Non hai inserito tutti i campi obbligatori!' })
    }

    // create the sql query
    const sql = `INSERT INTO owners SET name= ?, last_name= ?, email= ?, password= ?, phone_number= ? `;

    // execute the query
    connection.query(sql, [name, last_name, email, hashedPassword, phone_number], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: `L'email è già registrata` })
            }

            return res.status(500).json({ error: err })

        }

        return res.status(201).json({ success: true })
    })
}

module.exports = {
    show,
    store
}