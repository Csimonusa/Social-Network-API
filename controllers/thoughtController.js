const {Thought, User} = require('../models')

module.exports = {

    getThoughts(req,res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : res.json(thought))
    },

    createThought(req,res) {
        Thought.create(req.body)
            .then((thought) => User.findOneAndUpdate(
                { username: thought.username },
                {$addToSet: { thoughts: thought._id }},
                { new: true }))
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : res.json(thought))
            
    },

    updateThought(req,res) {

    },

    deleteThought(req,res) {

    },

    createReaction(req,res) {

    },

    deleteReaction(req,res) {

    },
}