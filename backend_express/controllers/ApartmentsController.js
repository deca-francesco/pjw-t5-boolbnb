// import connection
const Joi = require('joi');
const connection = require('../database/connection');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

function index(req, res) {
    const { city } = req.query;  // Ottieni il parametro della città dalla query, se presente

    let sql = 'SELECT * FROM apartments ORDER BY vote DESC';  // Query di base

    if (city) {
        sql = 'SELECT * FROM apartments WHERE city LIKE ? ORDER BY vote DESC';
    }

    console.log('SQL Query:', sql);  // Aggiungi un log per la query SQL

    connection.query(sql, city ? [`%${city}%`] : [], (err, results) => {
        if (err) {
            console.error('Database error:', err);  // Log degli errori del database
            return res.status(500).json({ error: 'Internal Server Error', details: err });  // Risposta più dettagliata
        }

        // Log per i risultati della query
        console.log('Query Results:', results);

        // Ciclo per correggere l'URL di ogni immagine
        results.forEach(apartment => {
            if (apartment.image) {
                apartment.image = `${req.protocol}://${req.get('host')}/${apartment.image.replace(/\\/g, '/')}`;
            }

            if (apartment.id) {
                const sqlImages = 'SELECT image_path FROM apartment_images WHERE apartment_id = ?';
                connection.query(sqlImages, [apartment.id], (err, imageResults) => {
                    if (err) {
                        console.error('Error fetching images:', err);
                        return res.status(500).json({ error: 'Error fetching images', details: err });
                    }

                    apartment.images = imageResults.map(image => {
                        return `${req.protocol}://${req.get('host')}/${image.image_path.replace(/\\/g, '/')}`;
                    });

                    // Dopo aver elaborato tutte le immagini, invia la risposta
                    if (results.indexOf(apartment) === results.length - 1) {
                        return res.status(200).json({
                            count: results.length,
                            data: results
                        });
                    }
                });
            }
        });
    });
}


// show
function show(req, res) {
    const id = req.params.id;
    let title = req.params.title; // Decodifica l'URL
    title = title.replace(' ', '-');
    console.log(`Received ID: ${id}, Title: ${title}`);

    // SQL queries
    const apartment_sql = `SELECT * FROM apartments WHERE id = ?`;
    const owner_sql = `
        SELECT owners.id, owners.name, owners.last_name, owners.email, owners.phone_number
        FROM owners
        JOIN apartments ON apartments.owner_id = owners.id
        WHERE apartments.id = ?`;
    const services_sql = `
        SELECT services.label
        FROM services
        JOIN services_apartments ON services.id = services_apartments.service_id
        WHERE services_apartments.apartment_id = ?`;
    const reviews_sql = `SELECT * FROM reviews WHERE apartment_id = ?`;
    const images_sql = `SELECT image_path FROM apartment_images WHERE apartment_id = ?`;

    // Helper function to create URL for images
    const createImageUrl = (imagePath) => {
        return `${HOST}:${PORT}/${imagePath.replace(/\\/g, '/')}`;
    };

    // Fetch apartment details
    connection.query(apartment_sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err });
        if (!results[0]) return res.status(404).json({ err: '404! Apartment not found' });

        const apartment = results[0];

        // Process apartment image if it exists
        if (apartment.image) {
            apartment.image = createImageUrl(apartment.image);
        }

        // Fetch owner details
        connection.query(owner_sql, [id], (err, owner_results) => {
            if (err) return res.status(500).json({ err: err });
            apartment.owner = owner_results[0];

            // Fetch apartment services
            connection.query(services_sql, [id], (err, services_results) => {
                if (err) return res.status(500).json({ err: err });
                apartment.services = services_results.map(service => service.label);

                // Fetch apartment reviews
                connection.query(reviews_sql, [id], (err, reviews_results) => {
                    if (err) return res.status(500).json({ err: err });
                    apartment.reviews = reviews_results;

                    // Fetch apartment images
                    connection.query(images_sql, [id], (err, images_results) => {
                        if (err) return res.status(500).json({ err: err });

                        apartment.images = images_results.map(image => {
                            return `${HOST}:${PORT}/${image.image_path.replace(/\\/g, '/')}`;
                        });

                        // Send the response
                        const responseData = { data: apartment };
                        console.log(responseData);
                        res.status(200).json(responseData);
                    });
                });
            });
        });
    });
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
    console.log("File caricati:", req.files); // Mostra i dettagli dei file caricati

    // Verifica che siano stati caricati dei file
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Almeno un'immagine è richiesta." });
    }

    // Estrai l'ID dell'utente dal token (già presente nel middleware)
    const { id: userId } = req.user;

    // Validazione del corpo della richiesta (formato dei dati, senza le immagini)
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

    // Dati provenienti dal body
    const { title, rooms, beds, bathrooms, square_meters, address, city, services = [] } = req.body;

    // Query SQL per inserire il nuovo appartamento
    const newApartmentSql = `
        INSERT INTO apartments (owner_id, title, rooms, beds, bathrooms, square_meters, address, city)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(newApartmentSql, [userId, title, rooms, beds, bathrooms, square_meters, address, city], (err, result) => {
        if (err) {
            console.error("Errore nell'inserimento dell'appartamento:", err);
            return res.status(500).json({ error: 'Errore nel salvataggio dell\'appartamento.' });
        }

        const apartmentId = result.insertId;

        // Se non ci sono servizi, ritorna una risposta di successo
        if (services.length === 0) {
            return res.status(201).json({
                success: true,
                new_apartment_id: apartmentId,
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
        });

        // Salvataggio delle immagini nella tabella apartment_images
        const imagePaths = req.files.map(file => file.path);  // Array di percorsi delle immagini
        const apartmentImagesValues = imagePaths.map(imagePath => [apartmentId, imagePath]);

        const apartmentImagesSql = `
            INSERT INTO apartment_images (apartment_id, image_path) VALUES ?
        `;

        connection.query(apartmentImagesSql, [apartmentImagesValues], (err) => {
            if (err) {
                console.error("Errore nell'inserimento delle immagini:", err);
                return res.status(500).json({ error: 'Errore nel salvataggio delle immagini.' });
            }

            // Risposta di successo con l'ID del nuovo appartamento
            res.status(201).json({
                success: true,
                new_apartment_id: apartmentId,
                image_paths: imagePaths,
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


// search
function search(req, res) {
    async (req, res) => {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({ error: 'City query parameter is required' });
        }

        try {
            // Query al database per filtrare gli appartamenti per città
            const [rows] = await db.query(
                'SELECT * FROM apartments WHERE city LIKE ?',
                [`%${city}%`]
            );

            res.json({ data: rows });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}



module.exports = {
    index,
    show,
    review,
    create,
    vote,
    search
}