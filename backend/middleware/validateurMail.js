// vérifie le format de l'email

// importer le package email-validator
const emailValidation = require("email-validator");

//exporte le middleware
module.exports = (req, res, next) => {
    
    if (!emailValidation.validate(req.body.email)) {
      res.status(401).json({
        error: new Error(`Saisir un email valide !`)
      });
     
    } else {
      next();
    }
};
