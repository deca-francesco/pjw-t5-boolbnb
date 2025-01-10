// import connection
const connection = require('../database/connection');

// index
function index(req, res) {

    // db query 
    const sql = `SELECT * FROM appartamenti`;

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
    const apartment_sql = `SELECT * FROM appartamenti WHERE id = ? `

    // db query for owner
    const owner_sql = `
    select proprietari.*
    from proprietari
    join appartamenti
    on appartamenti.id_proprietario = proprietari.id
    where appartamenti.id = ? `

    // db query for services
    const services_sql = `
    select servizi.label
    from servizi
    join servizi_appartamento
    on servizi.id = servizi_appartamento.id_servizio
    where servizi_appartamento.id_appartamento = ? `

    // db query for reviews
    const reviews_sql = `
    select *
    from recensioni
    where id_appartamento = ? `

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
            apartment.proprietario = owner_results[0]

            // execute query for services
            connection.query(services_sql, Number([id]), (err, services_results) => {
                // handle errors
                if (err) return res.status(500).json({ err: err })

                // save results as a property of apartment
                const services_labels = services_results.map(service => service.label)
                apartment.servizi = services_labels

                // execute query for reviews
                connection.query(reviews_sql, Number([id]), (err, reviews_results) => {
                    // handle errors
                    if (err) return res.status(500).json({ err: err })

                    // save results as a property of apartment
                    apartment.recensioni = reviews_results

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
    const { username, recensione, giorni_permanenza } = req.body

    // sql query
    const review_sql = `INSERT INTO recensioni SET id_appartamento = ?, username = ?, recensione = ?, data = CURRENT_DATE, giorni_permanenza = ?`

    // execute query
    connection.query(review_sql, [apartment_id, username, recensione, giorni_permanenza], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}


module.exports = {
    index,
    show,
    review
}