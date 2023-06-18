const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/runs", async(req, res) => {
    try {
        const getBooks = await client.query('SELECT * FROM "SBM-Final"');

        res.json(getBooks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/runs/:sid", async(req, res) => {
    try {
        const {sid} = req.params;
        const getValue = await client.query('SELECT * FROM "SBM-Final" WHERE run = $1', [sid]);

        res.json(getValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/runs", async(req, res) => {
    try {
        const {temperature, humidity, distance, gyro, run} = req.body;
        const postValue = await client.query('INSERT INTO "SBM-Final"(temperature, humidity, distance, gyro, run) VALUES($1, $2, $3, $4, $5) RETURNING *', [temperature, humidity, distance, gyro, run]);

        res.json(postValue);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/runs/:sid", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteValue = await client.query('DELETE FROM "SBM-Final" WHERE run = $1 RETURNING *', [id]);

        res.json(deleteValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/runs", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteValue = await client.query('TRUNCATE "SBM-Final" RETURNING *');

        res.json(deleteValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log("server started");
});