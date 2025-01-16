const connection = require('../database/connection');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

// secret key
const JWT_SECRET = process.env.JWT_SECRET

// show function
function show(req, res) {

    // take values from the request query
    const { email, password } = req.query

    // console log to check the email and the passwords
    console.log(`email: ${email}. password: ${password}`);

    // check if the user add an email and a password
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e Password sono obbligatori' })
    }

    // create the sql query
    const sql = `SELECT * FROM owners WHERE email= ?`

    // execute the query
    connection.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result[0]) return res.status(401).json({ message: 'Email o Password sbagliati', err })

        // save the data
        const owner = result[0]

        // bcrypt compare the password in the request body with the password in the database
        const match = bcrypt.compareSync(password, owner.password)

        // check if they match
        if (!match) {
            return res.status(401).json({ message: 'Email o Password sbagliati' })
        }

        // create a token JWT
        const token = jwt.sign(
            { id: owner.id, email: owner.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        // saves the data without the hashed password and give the token to the owner
        const ownerWithoutPassword = { ...owner }

        delete ownerWithoutPassword.password

        console.log(ownerWithoutPassword);


        res.status(200).json({ utente: ownerWithoutPassword, token })
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
        phone_number: Joi.string().allow('', null)
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    // take values from the request body
    const { name, last_name, email, password, phone_number } = req.body

    // using bcrypt to hash the password
    const hashedPassword = bcrypt.hashSync(password, 10)

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

        const token = jwt.sign(
            { id: result.insertId, email: email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        const newOwner = {
            id: result.insertId,
            name,
            last_name,
            email,
            phone_number
        };

        res.status(200).json({ utente: newOwner, token })
    })
}

module.exports = {
    show,
    store
}