// Importation du package mongoose (pour mongo DB), express (pour Node JS)
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// importer l'URI via le fichier .env (ça permet de ne pas afficher le mot de passe ici)
require('dotenv').config()

// image
const path = require('path')

// importation des routes
const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauces')
const likeRoutes = require('./routes/like')

// Se connecter a mongodb avec le package mongoose, ça nous facilite l'interraction avec la BDD
mongoose
	.connect(`${process.env.LIEN_BDD}`, {useNewUrlParser: true,useUnifiedTopology: true,})
	.then(() => console.log('Connexion à MongoDB réussie !'))
  	.catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS : système de sécurité qui bloque par défaut les appels HTTP entre des serveurs !=
app.use((req, res, next) => {
	// accéder à notre API depuis n'importe où
	res.setHeader('Access-Control-Allow-Origin', '*')
	// ajouter les headers sur nos réponses
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	// nous permet d'utiliser le CRUD
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	next()
})

// middleware
app.use(express.json()) // met à dispostion leur body directement sur l'objet req
app.use('/images', express.static(path.join(__dirname, 'images')))

// routes
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)
app.use('/api/sauces', likeRoutes)

module.exports = app
