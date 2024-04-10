// // use this to decode a token and get the user's information out of it
// import decode from 'jwt-decode';

// // create a new class to instantiate for a user
// class AuthService {
//   // get user data
//   getProfile() {
//     return decode(this.getToken());
//   }

//   // check if user's logged in
//   loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token); // handwaiving here
//   }

//   // check if token is expired
//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         return true;
//       } else return false;
//     } catch (err) {
//       return false;
//     }
//   }

//   getToken() {
//     // Retrieves the user token from localStorage
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     // Saves user token to localStorage
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     // Clear user token and profile data from localStorage
//     localStorage.removeItem('id_token');
//     // this will reload the page and reset the state of the application
//     window.location.assign('/');
//   }
// }

// export default new AuthService();

class AuthService {
  // check if user is logged in
  async loggedIn() {
    // Implement a check with your GraphQL API to verify if the user is authenticated
    // For example, you can send a request to the server to verify the token
    const response = await fetch('/verifyToken', {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.loggedIn;
    } else {
      return false;
    }
  }

  getToken() {
    // Implement a way to retrieve the token from the GraphQL API response or from a secure storage mechanism
    // For example, after a successful login mutation, store the token in memory or a secure storage
    return ''; // Return the token from the appropriate location
  }

  // Example method to handle login
  async login(email, password) {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Store the token securely after a successful login
      // Implement the storage mechanism based on your security requirements
      // localStorage.setItem('id_token', data.token);
      return true;
    } else {
      return false;
    }
  }

  // Example method to handle logout
  async logout() {
    // Implement a way to log the user out on the server side
    // For example, send a request to the server to invalidate the token
    // Then, remove the token from the client side
    // localStorage.removeItem('id_token');
    return true;
  }
}

export default new AuthService();
