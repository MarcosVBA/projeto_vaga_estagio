import axios from "axios";

const sensorAPI = axios.create({
  baseURL: 'http://localhost:8080',
})

export default sensorAPI;