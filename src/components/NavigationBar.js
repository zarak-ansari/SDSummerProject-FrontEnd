import { setAuthToken } from "../helpers/setAuthToken";
import axios from "axios";
import React from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material"


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
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Typography variant="h6" mr={10}>
                    Logged in User: {user}
                </Typography>
                <Button variant="contained" color="secondary" onClick={logout}>Log Out</Button>
            </Toolbar>
        </AppBar>
    )

}

export default NavigationBar