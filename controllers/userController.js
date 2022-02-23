const {User, Thought} = require('../models')

module.exports = {

    getUsers(res,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.json(err))
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => !user ? res.json({ message: 'No user with that ID '}) : res.json(user))
    },

    createUser(res,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.json(err))
    },

    updateUser(res,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body}, {new: true})
            .then((user) => !user ? res.json({ message: 'No user with that ID'}) : res.json(user))
    },

    deleteUser(res,res) {

    },

    createUserFriends(res,res) {

    },

    deleteUserFriends(res,res) {

    },
}