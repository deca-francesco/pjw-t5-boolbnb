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
            data: results,
            count: results.lenght
        })
    })
}






module.exports = {
    index

}