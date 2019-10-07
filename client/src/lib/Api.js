import axios from "axios";
let apiHost = "http://localhost:3001";
const client = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" }
});
export const authenticateUser = (email, password) => {
  let data = {
    auth: {
      email,
      password
    }
  };

  return client
    .post("/user/token", data)
    .then(response => {
      return response.data.jwt;
    })
    .catch(err => console.log("there was an error ", err));
};

export const getPages = () => {
  return client
    .get(`/pages`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const getCurrentUser = jwt => {
  let config = {
    headers: {}
  };

  if (jwt) {
    config["headers"]["Authorization"] = `Bearer ${jwt}`;
  }

  return client
    .get(`/users/current`, config)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log("there was an error ", err));
};

export const getPage = (jwt, id) => {
  let config = {
    headers: {}
  };

  if (jwt) {
    config["headers"]["Authorization"] = `Bearer ${jwt}`;
  }

  return client
    .get(`/pages/${id}`, config)
    .then(response => response.data)
    .catch(err => console.log("error ", err));
};
