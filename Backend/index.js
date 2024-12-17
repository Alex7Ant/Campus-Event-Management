const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5502;
const { Pool } = require('pg');


const pool = new Pool({
    user: "campus_9ctb_user", 
    host: "dpg-cte7k5rgbbvc73ep0qa0-a.oregon-postgres.render.com", 
    database: "campus_9ctb",
    password: "oIGbS0QJUiXOm7p22G0XFjJgaQwCL0bf",
    ssl: true
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        
        const userExists = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        
        const result = await pool.query(
            `INSERT INTO users (email, password, role) 
             VALUES ($1, $2, $3) 
             RETURNING id, email, role, created_at`,
            [email, password, role || 'user']
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});


app.post("/api/events", async (req, res) => {
    try {
        const { 
            name, 
            date, 
            time, 
            location, 
            description, 
            capacity 
        } = req.body;

        const result = await pool.query(
            `INSERT INTO events (
                name, 
                date, 
                time, 
                location, 
                description, 
                capacity, 
                seats_available
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [name, date, time, location, description, capacity, capacity]
        );

        res.status(201).json({
            message: "Event created successfully",
            event: result.rows[0]
        });
    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
});


app.post("/api/rsvp", async (req, res) => {
    try {
        const { user_id, event_id } = req.body;

        
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            
            const eventResult = await client.query(
                'SELECT seats_available FROM events WHERE id = $1 FOR UPDATE',
                [event_id]
            );

            if (eventResult.rows[0].seats_available <= 0) {
                throw new Error('Event is fully booked');
            }

            
            const rsvpResult = await client.query(
                `INSERT INTO rsvps (user_id, event_id) 
                 VALUES ($1, $2) 
                 RETURNING id, created_at`,
                [user_id, event_id]
            );

            
            await client.query(
                'UPDATE events SET seats_available = seats_available - 1 WHERE id = $1',
                [event_id]
            );

            await client.query('COMMIT');

            res.status(201).json({
                message: "RSVP successful",
                rsvp: rsvpResult.rows[0]
            });

        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("RSVP error:", error);
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/events", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, date, time, location, description, 
                    capacity, seats_available, created_at 
             FROM events 
             ORDER BY date, time`
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});


app.get("/api/users/:userId/rsvps", async (req, res) => {
    try {
        const { userId } = req.params;
        
        const result = await pool.query(
            `SELECT r.id as rsvp_id, r.created_at as rsvp_date,
                    e.id as event_id, e.name, e.date, e.time, 
                    e.location, e.description
             FROM rsvps r
             JOIN events e ON r.event_id = e.id
             WHERE r.user_id = $1
             ORDER BY e.date, e.time`,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching RSVPs:", error);
        res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
});


app.delete("/api/rsvp/:rsvpId", async (req, res) => {
    try {
        const { rsvpId } = req.params;
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            
            const rsvpResult = await client.query(
                'SELECT event_id FROM rsvps WHERE id = $1',
                [rsvpId]
            );

            if (rsvpResult.rows.length === 0) {
                throw new Error('RSVP not found');
            }

            
            await client.query(
                'DELETE FROM rsvps WHERE id = $1',
                [rsvpId]
            );

            
            await client.query(
                'UPDATE events SET seats_available = seats_available + 1 WHERE id = $1',
                [rsvpResult.rows[0].event_id]
            );

            await client.query('COMMIT');
            res.json({ message: "RSVP cancelled successfully" });

        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error cancelling RSVP:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = pool;