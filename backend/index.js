const express = require('express');
const pool = require('./db/db.js');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

//POST: Add/update happiness entry
app.post('/api/happiness', async (req, res) => {
    const {date, score, entry} = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO happiness (date, score, entry) 
            VALUES ($1, $2, $3) 
            ON CONFLICT (date) 
            DO UPDATE SET score = EXCLUDED.score, 
            entry = EXCLUDED.entry RETURNING *`,
            [date, score, entry]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
        }
    });

app.get('/api/happiness', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM happiness 
            WHERE date >= NOW() - INTERVAL '30 days'
            ORDER BY date ASC`);
            res.json(result.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    });
    
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});