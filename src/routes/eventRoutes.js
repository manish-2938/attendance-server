const express = require('express');
const { getEvents, createEvent} = require('../controllers/eventController');
const router = express.Router();
const Event = require('../models/event');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getEvents);
router.post('/', authMiddleware, createEvent);

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update an event
router.put('/:id', async (req, res) => {
  try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) {
          return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(updatedEvent);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(`Error deleting event ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;