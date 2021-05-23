export default {
    checkEmail: (emailRegex) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailRegex);
    },
    checkPhoneNumber: (phone) => {
        const re = /(84|0[2|3|5|7|8|9])+([0-9]{8,9})\b/;
        return re.test(phone);
    },
}