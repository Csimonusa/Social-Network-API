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

    },

    updateUser(res,res) {

    },

    deleteUser(res,res) {

    },

    createUserFriends(res,res) {

    },

    deleteUserFriends(res,res) {

    },
}