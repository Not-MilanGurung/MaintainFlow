const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const rolesEnum = ['admin', 'maintainer', 'requester'];

const userSchema = new Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: rolesEnum, default: ['requester']}
    },
    {
        timestamps : true
    }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

module.exports = {User, rolesEnum};