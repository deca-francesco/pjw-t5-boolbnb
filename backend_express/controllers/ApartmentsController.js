// import connection
const Joi = require('joi');
const connection = require('../database/connection');

// index
function index(req, res) {
    const { city } = req.query;  // Ottieni il parametro della città dalla query, se presente

    let sql = 'SELECT * FROM apartments ORDER BY vote DESC';  // Query di base

    // Se c'è un parametro city, modifica la query per filtrare per città
    if (city) {
        sql = 'SELECT * FROM apartments WHERE city LIKE ? ORDER BY vote DESC';
    }

    // Esegui la query
    connection.query(sql, city ? [`%${city}%`] : [], (err, results) => {
        if (err) return res.status(500).json({ err: err });  // Gestione errori

        // Risposta con gli appartamenti trovati
        res.status(200).json({
            count: results.length,
            data: results
        });
    });
}

// show
function show(req, res) {

    // get apartment id from request params
    const id = req.params.id

    // db query for single apartment
    const apartment_sql = `SELECT * FROM apartments WHERE id = ? `

    // db query for owner
    const owner_sql = `
    select owners.id, owners.name, owners.last_name, owners.email, owners.phone_number
    from owners
    join apartments
    on apartments.owner_id = owners.id
    where apartments.id = ? `

    // db query for services
    const services_sql = `
    select services.label
    from services
    join services_apartments
    on services.id = services_apartments.service_id
    where services_apartments.apartment_id = ? `

    // db query for reviews
    const reviews_sql = `
    select *
    from reviews
    where apartment_id = ? `

    // execute the apartment_sql query
    connection.query(apartment_sql, Number([id]), (err, results) => {

        // handle errors
        if (err) return res.status(500).json({ err: err })
        if (!results[0]) return res.status(404).json({ err: '404! Apartment not found' })

        // save result
        const apartment = results[0]

        // execute query for owner
        connection.query(owner_sql, Number([id]), (err, owner_results) => {

            // handle errors
            if (err) return res.status(500).json({ err: err })

            // save results as a property of apartment
            apartment.owner = owner_results[0]

            // execute query for services
            connection.query(services_sql, Number([id]), (err, services_results) => {

                // handle errors
                if (err) return res.status(500).json({ err: err })

                // save results as a property of apartment
                const services_labels = services_results.map(service => service.label)
                apartment.services = services_labels

                // execute query for reviews
                connection.query(reviews_sql, Number([id]), (err, reviews_results) => {
                    // handle errors
                    if (err) return res.status(500).json({ err: err })

                    // save results as a property of apartment
                    apartment.reviews = reviews_results

                    // create the response
                    const responseData = {
                        data: apartment
                    }

                    console.log(responseData);

                    // return the response
                    res.status(200).json(responseData)
                })
            })
        })
    })
}


// review
function review(req, res) {

    // validate data input
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        review: Joi.string().min(3).required(),
        days: Joi.number().min(1).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    // take apartment id from request parameters
    const apartment_id = Number(req.params.id)

    // take values from request body
    const { username, email, review, days } = req.body

    // sql query
    const review_sql = `INSERT INTO reviews SET apartment_id = ?, username = ?, email = ?, review = ?, date = CURRENT_DATE, days = ?`

    // execute query
    connection.query(review_sql, [apartment_id, username, email, review, days], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}


// create apartment
function create(req, res) {

    // verification token
    const { id: userId } = req.user

    // validate data input
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        rooms: Joi.number().integer().min(1).required(),
        beds: Joi.number().integer().min(1).required(),
        bathrooms: Joi.number().integer().min(1).required(),
        square_meters: Joi.number().min(1).required(),
        address: Joi.string().required(),
        city: Joi.string().min(2).required(),
        image: Joi.string().required(),
        services: Joi.array().items(Joi.number().integer()).optional()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    // take values from request body
    const { title, rooms, beds, bathrooms, square_meters, address, city, image, services = [] } = req.body


    // sql query for new apartment
    const new_apartment_sql = `INSERT INTO apartments SET owner_id = ?, title = ?, rooms = ?, beds = ? , bathrooms = ?, square_meters = ?, address = ?, city = ?, image = ?`

    // execute query
    connection.query(new_apartment_sql, [userId, title, rooms, beds, bathrooms, square_meters, address, city, image], (err, result) => {
        if (err) return res.status(500).json({ error: err })

        const apartmentId = result.insertId;

        // If there are no services, return success response
        if (services.length === 0) {
            return res.status(201).json({
                success: true,
                new_apartment_id: apartmentId
            })
        }

        // Insert services_apartments records
        const service_apartment_values = services.map(serviceId => [apartmentId, serviceId]);

        const service_apartment_sql = `
            INSERT INTO services_apartments (apartment_id, service_id) VALUES ?
        `

        connection.query(service_apartment_sql, [service_apartment_values], (err) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                success: true,
                new_apartment_id: apartmentId
            });
        })

    })

}


// vote
function vote(req, res) {

    // get id from request_params
    const id = Number(req.params.id)

    // vote +1 query
    const vote_sql = `UPDATE apartments SET vote = vote + 1 WHERE id = ?`

    // execute query
    connection.query(vote_sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        index(req, res)
    })
}


module.exports = {
    index,
    show,
    review,
    create,
    vote
}