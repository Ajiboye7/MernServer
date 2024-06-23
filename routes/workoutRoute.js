const express = require('express');
const router = express.Router();
const requireAuth = require('../Middleware/requireAuth.js')
const {
    getallworkout,
    getaworkout,
    createaworkout,
    deleteaworkout,
    updateaworkout
} = require('../controller/workoutController')
// we are using this middleware to protect all the route below 
router.use(requireAuth)

// Get all workout
router.get('/', getallworkout)
router.get('/:id' ,getaworkout)
router.post('/', createaworkout)
router.delete('/:id', deleteaworkout)
router.put('/:id', updateaworkout)

module.exports = router


