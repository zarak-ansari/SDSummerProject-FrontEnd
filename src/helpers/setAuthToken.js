import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(token)
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}