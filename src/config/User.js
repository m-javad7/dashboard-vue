import Token from "./Token";
import AppStorage from "./AppStorage";

class User {
    responseAfterLogin(res,username,password) {
      debugger

        let result = res.data;

        const access_token = result.access_token;

        if (Token.isValid(access_token)) {
            AppStorage.store('hjh' ,access_token,'12')
        }
    }

    hasToken() {
        const storeToken = localStorage.getItem('token');
        if (storeToken) {
            return Token.isValid(storeToken) ? true : false
        }
        false;
    }

    loggedIn() {
        return this.hasToken()
    }

    name() {
        if (this.loggedIn()) {
            return localStorage.getItem('user')
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(localStorage.getItem('token'));
            return payload.sub
        }
        return false
    }

    hasPermissions(p){
       return localStorage.getPermissions().includes(p);
    }
}

export default User = new User();
