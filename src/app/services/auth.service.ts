/* to make this class acts as a service: need to import @Injectable() and add it to providers property of any module, or just add it to providers property of any module */
export class AuthService {
  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;

    /* semulating ajax call */
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(this.isLoggedIn)
    //     }, 3000);
    // })
  }
}
