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
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : res.json(thought))
    },

    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id }},
                { new: true })
            )
    },

    createReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { new: true })
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : res.json(thought))
    },

    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId }}},
            { new: true })
            .then((thought) => !thought ? res.json({ message: 'No thought with that ID '}) : res.json(thought))
    },
}