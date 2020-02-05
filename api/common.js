const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
export const isValidPhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
}

export const normalizePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace("-", "")
                      .replace("(", "")
                      .replace(")", "");
}