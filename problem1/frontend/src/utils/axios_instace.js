import axios from "axios";

const axios_create = axios.create({
  baseURL: "https://kind-lime-crane-sari.cyclic.app",
  // baseURL:'http://localhost:5000'
});

export default axios_create;
