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


function show(req, res) {

    // get apartment id from request params
    const id = req.params.id

    // db query for single apartment
    const apartment_sql = `SELECT * FROM appartamenti WHERE id = ?`;

    // execute the apartment_sql query
    connection.query(apartment_sql, [id], (err, results) => {
       if (err) return res.status(500).json({ err: err })

            if (results.length == 0) return res.status(404).json({ err: 'movie not found'
    })
})
}



module.exports = {
    index,
    show
    

}