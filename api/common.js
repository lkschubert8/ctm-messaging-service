const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
module.exports.isValidPhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
}
