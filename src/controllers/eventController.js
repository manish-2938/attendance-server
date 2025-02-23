const Event = require('../models/event');
const moment = require('moment');

// Get all events
// const getEvents = async (req, res) => {
//     try {
//         const currentDate = moment().startOf('day').toDate();
//         const events = await Event.find({ date: { $gte: currentDate } }).sort('startTime');
//         res.json(events);
//       } catch (error) {
//         res.status(500).json('Failed to fetch events');
//       }
// };


// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort('-date');
        res.json(events);
    } catch (error) {
        res.status(500).json('Failed to fetch events');
    }
};



// Create an event
const createEvent = async (req, res) => {
    try {
        const { name, date, startTime, entryTime, eligibleGroups } = req.body;
        const newEvent = new Event({ name, date, startTime, entryTime, eligibleGroups });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getEvents, createEvent };
