const valid = ({fullname, username, email, password, cf_password}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Le prénom est nécssaire pour votre inscription"
    }else if(fullname.length > 25){
        err.fullname = "Votre prénom ne doit pas être supérieur à 25 caractères"
    }

    if(!username) {
        err.username = "Le nom est nécssaire pour votre inscription"
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "Votre nom ne doit pas être supérieur à 25 caractères"
    }

    if(!email) {
        err.email = "Merci de saisir un email valide."
    }else if(!validateEmail(email)){
        err.email = "Email incorrecte."
    }

    if(!password) {
        err.password = "Merci de saisir le mot de passe."
    }else if(password.length < 6){
        err.password = "Le mot de passe doit être supérieur à 6 caractères."
    }

    if(password !== cf_password) {
        err.cf_password = "La confirmation du mot de passe est incorrecte."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
export default valid