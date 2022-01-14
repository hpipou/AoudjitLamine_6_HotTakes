// importation du package mongoose
const mongoose = require('mongoose')

// importation du package mongoose-unique-validator 
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

// Note : Le package 'mongoose-unique-validaor' comme son nom l'indique, va s'assurer 
// que l'adresse mail est unique, et appartient à un seul et unique utilisateur
userSchema.plugin(uniqueValidator)

// exportation du schema User
module.exports = mongoose.model('User', userSchema)
