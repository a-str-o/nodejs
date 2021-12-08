
const isEmpty = (string) => {
    if(string.trim() === ''){
        return true;
    }
    else {
        return false;
    }
}

const isEmail = (email) => {
    const regex = "";
    if (email.match(regex)) return true;
    else return false; 
}

exports.validateSignupData = (data) => {

    //TODO Validate Data
    
    let error =  {};

    if (isEmpty(data.email)){
        error.email = "Must not be empty"
    }
    else {
        if (!isEmail(data.email)){
            error.email = 'Must be a valid email address'
        }
    }

    if (isEmpty(data.password)){
        error.password = "Must not be empty"
    }

    if (data.confirmPassword !== data.password){ 
        error.confirmPassword = "Passwords must match"
    }
    if (isEmpty(data.handle)){
        error.handle = "Must not be empty"
    }

    return {
        error, 
        valid : Object.keys(error).length === 0 ? true : false
    }
    
}





exports.validateLoginData = (data) => {

let errors = {}
if (isEmpty(data.email)){
    errors.email = "Must not be empty"
}

if (isEmpty(data.password)){ 
    errors.password = "Must not be empty"
}


return {
    errors, 
    valid : Object.keys(errors).length === 0 ? true : false
}
}