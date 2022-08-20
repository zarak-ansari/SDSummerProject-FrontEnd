import axios from "axios";

function axiosDefaultConfig() {
    axios.defaults.baseURL = 'https://startup-growth-backend.herokuapp.com/';
}
// http://localhost:8080/
// https://startup-growth-backend.herokuapp.com/
export default axiosDefaultConfig