/*module.exports = router;*/

async function loginUser(email, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Login failed!');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

const events = [];

function rsvpEvent(eventId) {
    try {
        const event = events.find(e => e.id === eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.seatsAvailable > 0) {
            event.seatsAvailable--;
            alert(`You have successfully RSVP'd for ${event.name}.`);
            renderEvents();
        } else {
            alert("No seats available for this event.");
        }
    } catch (error) {
        console.error('RSVP error:', error);
        alert('An error occurred while processing your RSVP');
    }
}

document.getElementById("create-event-form").addEventListener("submit", function(e) {
});

document.getElementById("create-event-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    
    const name = document.getElementById("event-name").value.trim();
    const capacity = parseInt(document.getElementById("event-capacity").value);
    
    if (!name) {
        alert("Event name is required!");
        return;
    }
    
    if (isNaN(capacity) || capacity <= 0) {
        alert("Please enter a valid capacity!");
        return;
    }

    const newEvent = {
        id: events.length + 1,
        name: name,
        date: document.getElementById("event-date").value,
        time: document.getElementById("event-time").value,
        location: document.getElementById("event-location").value.trim(),
        description: document.getElementById("event-description").value.trim(),
        capacity: capacity,
        seatsAvailable: capacity,
    };

    try {
        events.push(newEvent);
        alert("Event created successfully!");
        renderEvents();
        document.getElementById("create-event-form").reset();
    } catch (error) {
        console.error('Error creating event:', error);
        alert('An error occurred while creating the event');
    }
});


function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}


function loadEvents() {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
        events.push(...JSON.parse(savedEvents));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    renderEvents();
});


function rsvpEvent(eventId) {
    saveEvents();
}

events.push(newEvent);
saveEvents();


function renderEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach(event => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${escapeHtml(event.name)}</h3>
            <p>Date: ${escapeHtml(event.date)} | Time: ${escapeHtml(event.time)} | Location: ${escapeHtml(event.location)}</p>
            <p>${escapeHtml(event.description)}</p>
            <p>Seats Available: <strong>${event.seatsAvailable}</strong></p>
            <button onclick="rsvpEvent(${event.id})">RSVP</button>
        `;
        eventList.appendChild(li);
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('../db');
const { generateToken } = require('../utils/auth');

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/register', [
    
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().isLength({ min: 2 }),
], async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Invalid input',
                errors: errors.array() 
            });
        }

        const { email, password, name } = req.body;

        
        const userExists = await db.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            });
        }

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const result = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        const user = result.rows[0];

        
        const token = generateToken(user);

        
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;


const jwt = require('jsonwebtoken');

/*function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}*/

module.exports = { generateToken };