// import connection
const connection = require('../database/connection');

// index
function index(req, res) {

    // db query 
    const sql = `SELECT * FROM apartments ORDER BY vote DESC`;

    // execute the sql query
    connection.query(sql, (err, results) => {
        // error
        if (err) return res.status(500).json({ err: err })

        // response object
        res.status(200).json({
            count: results.length,
            data: results
        })
    })
}

// show
function show(req, res) {

    // get apartment id from request params
    const id = req.params.id

    // db query for single apartment
    const apartment_sql = `SELECT * FROM apartments WHERE id = ? `

    // db query for owner
    const owner_sql = `
    select owners.*
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

    // take apartment id from request parameters
    const apartment_id = Number(req.params.id)

    // take values from request body
    const { username, review, days } = req.body

    // sql query
    const review_sql = `INSERT INTO reviews SET apartment_id = ?, username = ?, review = ?, date = CURRENT_DATE, days = ?`

    // execute query
    connection.query(review_sql, [apartment_id, username, review, days], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}

// create apartment

function create(req, res) {

    // take owner id from request parameters
    const owner_id = Number(req.params.id)

    // take values from request body
    const { title, rooms, beds, bathrooms, square_meters, address, image } = req.body

    // sql query for new apartment
    const new_apartment_sql = `INSERT INTO apartments SET owner_id = ?, title = ?, rooms = ?, beds = ? , bathrooms = ?, square_meters = ?, address = ?, image = ?`

    // execute query
    connection.query(new_apartment_sql, [owner_id, title, rooms, beds, bathrooms, square_meters, address, image], (err, result) => {
        if (err) return res.status(500).json({ error: err })

        return res.status(201).json({ success: true })
    })

}

module.exports = {
    index,
    show,
    review,
    create
}