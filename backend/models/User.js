const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        //match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character']
    },
    favorites: [
        {
            type: {
                type: String,
                enum: ['song', 'artist'],
                required: true
            },
            targetId: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)