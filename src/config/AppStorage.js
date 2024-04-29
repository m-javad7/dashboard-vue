class AppStorage {

    storeToken(token) {
      debugger

        localStorage.setItem('token', token);
    }

    storeUser(user) {
      debugger

        localStorage.setItem('user', user);
    }

    // storePermission(permissions) {
    //     localStorage.setItem('permissions', permissions);
    // }


    storeUsername(username) {
      debugger

        localStorage.setItem('username', username);
    }

    storePassword(password) {
      debugger

        localStorage.setItem('password', password);
    }


    store(user, token, password, username) {
      debugger
      console.log("Storing data:", { user, token, password, username });
      this.storeToken(token);
      this.storeUser(user);
      this.storeUsername(username);
      this.storePassword(password);
  }
    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // localStorage.removeItem('permissions');

    }

    getToken() {
      debugger
      return localStorage.getItem('token');
  }

  getUser() {
    debugger
      return localStorage.getItem('user');
  }

    getPermissions() {
        localStorage.getItem('permissions');
    }

    getUsername() {
        localStorage.getItem('username');
    }

    getPassword() {
        localStorage.getItem("password");
    }

}

export default AppStorage = new AppStorage();
