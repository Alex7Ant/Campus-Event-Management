const express = require("express");
const router = express.Router();


router.post("/:action", (req, res) => {
  const { action } = req.params;

  if (action === "rsvp") {
    
    res.json({ success: true, message: "RSVP successful!" });
  } else if (action === "cancel") {
    
    res.json({ success: true, message: "RSVP canceled!" });
  } else {
    res.status(400).json({ success: false, message: "Invalid action." });
  }
});

module.exports = router;
