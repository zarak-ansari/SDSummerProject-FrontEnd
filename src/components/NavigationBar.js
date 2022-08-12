import { setAuthToken } from "../helpers/setAuthToken";
import axios from "axios";
import React from "react";

function NavigationBar() {

    function logout() {
        setAuthToken()
        localStorage.removeItem("token")
        window.location.href = "/login"
    }

    const [user, setUser] = React.useState("")

    axios.get("/api/user/info")
        .then(response => {
            setUser(response.data)
        })
        .catch(err => console.log(err));
    return (
        <>
            <p>
                Logged in User: {user}
            </p>
            <button onClick={logout}>Log Out</button>
        </>
    )

}

export default NavigationBar