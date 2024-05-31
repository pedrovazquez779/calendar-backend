// Events routes
// host + /api/events

const {Router} = require('express');
const {jwtValidator} = require('../middlewares/jwt-validator');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/field-validator');
const {isValidDate} = require('../helpers/isDate');

const router = Router();

router.use(jwtValidator);

router.get('/', getEvents);
router.post('/', [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom(isValidDate),
        check('end', 'end date is required').custom(isValidDate),
        fieldValidator
    ],
    createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;