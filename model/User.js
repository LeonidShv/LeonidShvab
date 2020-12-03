const { Schema, model } = require('mongoose');

const schema = new Schema({
    _id: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

const UserList = new Schema(schema, {collection: 'user'})

exports.UserList = model('UserList', UserList);