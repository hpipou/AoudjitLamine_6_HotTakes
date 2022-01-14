// importer le package multer
const multer = require('multer')

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
}

const storage = multer.diskStorage({
	// désigner le dossier images
	destination: (req, file, callback) => {
		callback(null, 'images')
	},
	// fichier
	filename: (req, file, callback) => {
		// remplace les espaces par des _
		const name = file.originalname.split(' ').join('_') 
		// détecter l'extension de l'image
		const extension = MIME_TYPES[file.mimetype] 
		// création du filename complet
		callback(null, name + Date.now() + "." + extension);
	},
})

module.exports = multer({ storage: storage }).single('image')