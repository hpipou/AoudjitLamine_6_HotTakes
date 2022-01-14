// importation du model sauce
const Sauce = require('../models/Sauce')

// Fonctionnalités de l'utilisateur : j'aime, j'aime pas, annuler son vote
exports.likeStatus = (req, res) => {
	const like = req.body.like
	const userId = req.body.userId

	// Trouver la sauce sélectionnée
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			// avec la fonction find : On vérifie l'existance ou non de userId
			let userLike = sauce.usersLiked.find((id) => id === userId)
			let userDislike = sauce.usersDisliked.find((id) => id === userId)

			console.log('Statut : ', like)
			switch (like) {
				// like +1
				case 1:
					sauce.likes += 1
					sauce.usersLiked.push(userId)
					break
				// annule -1
				case 0:
					if (userLike) {
						sauce.likes -= 1
						sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId)
					}
					if (userDislike) {
						sauce.dislikes -= 1
						sauce.usersDisliked = sauce.usersDisliked.filter(
							(id) => id !== userId
						)
					}
					break
				// dislike +1
				case -1:
					sauce.dislikes += 1
					sauce.usersDisliked.push(userId)
			}
			// sauvegarder la sauce
			sauce
				.save()
				.then(() => res.status(201).json({ message: 'Sauce enregistrée avec succès' }))
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}
