const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const isAuth = require("../middleware/is-auth");

// Get events
router.get("/", isAuth, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create an event
router.post("/", isAuth, async (req, res) => {
  const { title, description, auteur } = req.body;

  try {
    const event = new Event({
      title,
      description,
      auteur,
    });

    const newEvent = await event.save();

    res.status(201).json({ event: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update an event
router.put("/:id", isAuth, async (req, res) => {
  const eventID = req.params.id;
  const { title, description, auteur } = req.body;

  const updatedEvent = {};
  if (title) updatedEvent.title = title;
  if (description) updatedEvent.description = description;
  if (auteur) updatedEvent.auteur = auteur;

  const event = await Event.findByIdAndUpdate(
    eventID,
    { $set: updatedEvent },
    { new: true }
  );

  res.status(201).json({ event });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete an event
router.delete("/:id", isAuth, async (req, res) => {
  const eventID = req.params.id;

  try {
    await Event.findByIdAndRemove(eventID);
    res.status(200).json({ msg: "Event Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
