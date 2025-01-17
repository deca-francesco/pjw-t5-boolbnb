// import connection
const Joi = require('joi');
const connection = require('../database/connection');
const upload = require("../middleware/Multer")
const verifyToken = require('../middleware/TokenValidation')

const HOST = process.env.HOST;
const PORT = process.env.PORT;

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

        // Ciclo per correggere l'URL di ogni immagine
        results.forEach(apartment => {
            if (apartment.image) {
                // Formatta il percorso dell'immagine per il frontend
                apartment.image = `${req.protocol}://${req.get('host')}/${apartment.image.replace(/\\/g, '/')}`;
            }
        });

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

        // If image exists, create a URL for the image
        if (apartment.image) {
            // Replace backslashes with forward slashes for URL compatibility
            apartment.image = `${HOST}:${PORT}/${apartment.image.replace(/\\/g, '/')}`;
        }

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

        const fetch_reviews_sql = `SELECT * FROM reviews WHERE apartment_id = ? ORDER BY date DESC`;

        connection.query(fetch_reviews_sql, [apartment_id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err });

            // Return the updated list of reviews as part of the response
            return res.status(201).json({ success: true, reviews: reviews });
        });
    })
}


// create apartment
function create(req, res) {
    console.log("Dati ricevuti:", req.body);
    console.log("File caricato:", req.file); // Mostra i dettagli del file caricato

    // Verifica che l'immagine sia stata caricata
    if (!req.file) {
        return res.status(400).json({ error: "Immagine richiesta." });
    }

    // Estrai l'ID dell'utente dal token (già presente nel middleware)
    const { id: userId } = req.user;

    // Validazione del corpo della richiesta (formato dei dati, senza l'immagine)
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        rooms: Joi.number().integer().min(1).required(),
        beds: Joi.number().integer().min(1).required(),
        bathrooms: Joi.number().integer().min(1).required(),
        square_meters: Joi.number().min(1).required(),
        address: Joi.string().required(),
        city: Joi.string().min(2).required(),
        services: Joi.array().items(Joi.number().integer()).optional(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Dati dell'immagine
    const imagePath = req.file.path;  // Percorso dell'immagine salvata da Multer

    // Dati provenienti dal body
    const { title, rooms, beds, bathrooms, square_meters, address, city, services = [] } = req.body;

    // Query SQL per inserire il nuovo appartamento
    const newApartmentSql = `
        INSERT INTO apartments (owner_id, title, rooms, beds, bathrooms, square_meters, address, city, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(newApartmentSql, [userId, title, rooms, beds, bathrooms, square_meters, address, city, imagePath], (err, result) => {
        if (err) {
            console.error("Errore nell'inserimento dell'appartamento:", err);
            return res.status(500).json({ error: 'Errore nel salvataggio dell\'appartamento.' });
        }

        const apartmentId = result.insertId;

        // Se non ci sono servizi, ritorna una risposta di successo
        if (services.length === 0) {
            return res.status(201).json({
                success: true,
                new_apartment_id: apartmentId
            });
        }

        // Inserimento dei servizi associati all'appartamento
        const serviceApartmentValues = services.map(serviceId => [apartmentId, serviceId]);

        const serviceApartmentSql = `
            INSERT INTO services_apartments (apartment_id, service_id) VALUES ?
        `;

        connection.query(serviceApartmentSql, [serviceApartmentValues], (err) => {
            if (err) {
                console.error("Errore nell'inserimento dei servizi:", err);
                return res.status(500).json({ error: 'Errore nell\'associazione dei servizi.' });
            }

            // Risposta di successo con l'ID del nuovo appartamento
            res.status(201).json({
                success: true,
                new_apartment_id: apartmentId,
                image_path: req.file.path
            });
        });
    });
}


// vote
function vote(req, res) {

    // get id from request_params
    const id = Number(req.params.id)

    // vote +1 query
    const vote_sql = `UPDATE apartments SET vote = vote + 1 WHERE id = ?`

    // execute query
    connection.query(vote_sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Errore durante l'aggiornamento del voto" });

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Voto aggiornato con successo" });
        } else {
            res.status(404).json({ error: "Appartamento non trovato" });
        }
    })
}


module.exports = {
    index,
    show,
    review,
    create,
    vote
}