const Workout = require('../routes/models/workoutModels')
const mongoose = require('mongoose')


const getallworkout= async (req, res) => {
    try {
        const userId = req.user._id
        const workouts = await Workout.find({userId}).sort({createdAt:-1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getaworkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createaworkout = async (req, res) => {
    try {
        const userId = req.user._id
        const { title, load, repeat } = req.body;
        const workout = await Workout.create({ title, load, repeat, userId});
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
};

const deleteaworkout = async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateaworkout = async (req, res) => {
    try {
        const { title, load, repeat } = req.body;
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, { title, load, repeat }, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports= {
    getallworkout,
    getaworkout,
    createaworkout,
    deleteaworkout,
    updateaworkout
}