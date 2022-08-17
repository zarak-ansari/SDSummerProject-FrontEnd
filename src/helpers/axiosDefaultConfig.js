import axios from "axios";

function axiosDefaultConfig() {
    axios.defaults.baseURL = 'https://startup-growth-backend.herokuapp.com/';
}

export default axiosDefaultConfig