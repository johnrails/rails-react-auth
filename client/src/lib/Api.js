import axios from "axio";
let apiHost = "localhost:3001";

module.exports = {
  authenticateUser: function(email, password) {
    let data = {
      auth: {
        email,
        password
      }
    };

    return axios
      .post(apiHost + "/api/user/token", data)
      .then(response => {
        return response.data.jwt;
      })
      .catch(err => console.log("there was an error ", err));
  },
  getCurrentUser: jwt => {
    let config = {
      headers: {}
    };

    if (jwt) {
      config["headers"]["Authorization"] = `Bearer ${jwt}`;
    }

    return axios
      .get(`${apiHost}/api/users/current`, config)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("there was an error ", err));
  },
  getPage: (jwt, id) => {
    let config = {
      headers: {}
    };

    if (jwt) {
      config["headers"]["Authorization"] = `Bearer ${jwt}`;
    }

    return axios
      .get(`${apiHost}/api/pages/${id}`, config)
      .then(response => response.data)
      .catch(err => console.log("error ", err));
  }
};
