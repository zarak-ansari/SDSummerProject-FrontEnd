import axios from "axios";

function axiosDefaultConfig() {
    axios.defaults.baseURL = 'http://localhost:8080/';
}

export default axiosDefaultConfig