const sgMail = require('@sendgrid/mail');
const db = require('../database/connection');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sender = process.env.EMAIL_SENDER

const sendContactEmail = (req, res) => {
    const { name, message } = req.body;
    const apartmentId = req.params.apartment_id;

    // Sql query to get owner's email based on apartment_id
    const sql = `
        SELECT owners.email AS owner_email 
        FROM owners 
        JOIN apartments ON apartments.owner_id = owners.id 
        WHERE apartments.id = ?;
    `;

    // Execute the sql query to get owner's email
    db.query(sql, [apartmentId], (err, result) => {
        if (err) {
            console.error('Errore nella query:', err);
            return res.status(500).json({ success: false, message: 'Errore nella query' });
        }

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Proprietario non trovato.' });
        }

        const ownerEmail = result[0].owner_email;

        //  Message to send with SendGrid
        const msg = {
            to: ownerEmail,
            from: sender,
            subject: `Messaggio da ${name}`,
            text: message,
            html: `<p>${message}</p>`,
        };

        console.log(msg);

        // Send email
        sgMail.send(msg)
            .then(() => {
                res.status(200).json({ success: true, message: 'Messaggio inviato!' });
            })
            .catch((error) => {
                console.error('Errore nell\'invio dell\'email:', error);
                console.error('Errore dettagliato:', error.response.body);
                res.status(500).json({ success: false, message: 'Errore nell\'invio della mail.' });
            });

    });
};

module.exports = { sendContactEmail };
