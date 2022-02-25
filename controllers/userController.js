const {User, Thought} = require('../models')

module.exports = {

    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.json(err))
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => !user ? res.json({ message: 'No user with that ID '}) : res.json(user))
    },

    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.json(err))
    },

    updateUser(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body}, {new: true})
            .then((user) => !user ? res.json({ message: 'No user with that ID'}) : res.json(user))
    },

    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user ? res.json({ message: 'No user with that ID'}) : res.json(user))
    },

    createUserFriends(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true })
            .then((user) => { !user ? res.json({ message: 'No user with that ID'}) : res.json(user)})
    },

    deleteUserFriends(req,res) {
        User.findOneAndRemove(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId }},
            { runValidators: true, new: true })
            .then((user) => { !user ? res.json({ message: 'No user with that ID'}) : res.json(user)})
    },
}