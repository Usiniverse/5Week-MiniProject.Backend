const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userId: String,
        password: String,
        confirmPassword: String,
    },
    { timestamps: true }
);

UserSchema.virtual('authorId').get(function () { return this._id.toHexString(); });
UserSchema.set('toJSON', { virtuals: true, });

const User = mongoose.model('User', UserSchema);

async function getUserByAuthorName(authorName)
{
    return User.find({ authorName });
}

async function findById(id) {
    return User.findById(id);
}

async function getUserByIdAndPs(authorName, password)
{
    return User.findOne({ authorName, password });
}


async function createUser(user)
{
    return new User(user).save();
}


module.exports.getUserByAuthorName = getUserByAuthorName;
module.exports.findById = findById;
module.exports.getUserByIdAndPs = getUserByIdAndPs;
module.exports.createUser = createUser;
