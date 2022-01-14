// importation du package password-validator
const passwordValidator = require('password-validator');

// Création du schéma
let passwordSchema = new passwordValidator();
 
// Les propriétés pour un MDP difficile à déchiffre
passwordSchema
.is().min(8)       
.is().max(100)        
.has().uppercase()  
.has().lowercase()     
.has().digits(3)    
.has().not().spaces()

// exporter le schéma
module.exports = passwordSchema;