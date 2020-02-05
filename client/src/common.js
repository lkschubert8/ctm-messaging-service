//Getting repeated in both locations to avoid spending too much time
//fighting with react on shared code

const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
export const isValidPhoneNumber = (phoneNumber) => {
    return phoneRegex.test(phoneNumber);
}