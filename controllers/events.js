const Event = require('../models/Event');

const getEvents = async (req, res) => {

    try {
        const events = await Event.find()
            .populate('user', 'name');

        res.json({
            ok: true,
            events
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong getting events'
        });
    }
};

const createEvent = async (req, res) => {

    const event = new Event(req.body);
    const {uid} = req;

    try {

        event.user = uid;
        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: savedEvent
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong creating event'
        });
    }

};

const updateEvent = async (req, res) => {

    const {uid} = req;
    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event doesn\'t exist'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You can\' edit this event'
            });
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            ...req.body,
            user: uid
        }, {
            new: true // return the updated event
        });

        res.json({
            ok: true,
            event: updatedEvent
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong updating event'
        });
    }

};

const deleteEvent = async (req, res) => {

    const {uid} = req;
    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event doesn\'t exist'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You can\' delete this event'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong deleting event'
        });
    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};