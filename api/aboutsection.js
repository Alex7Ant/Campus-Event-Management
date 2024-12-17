const express = require("express");
const router = express.Router();

router.get("/api/aboutsection.js", (req, res) => {
  res.json({
    title: "Campus Event Management System",
    description: "Discover and register for exciting campus events like workshops, seminars, and club activities. Built to bring the campus community together.",
    services: [
      "Event Registration",
      "Event Listings",
      "Admin Event Creation",
      "Event Calendar View",
    ],
    history: "Our system was established to streamline event discovery and participation for students and staff.",
  });
});

module.exports = router;
