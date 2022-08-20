import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import { Button, Box, TextField, Typography } from "@mui/material"

function Register() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = (event) => {

        event.preventDefault()

        //reqres registered sample user
        const loginPayload = {
            email: email,
            password: password
        }

        axios.post("api/auth/register", loginPayload)
            .then(response => {
                //get token from response
                const token = response.data.token;

                //set JWT token to local
                localStorage.setItem("token", token);

                //set token to axios common header
                setAuthToken(token);

                //redirect user to home page
                window.location.href = '/'

            })
            .catch(err => console.log(err));
    };

    return (
        <Box
            component="form"
            onSubmit={(event) => handleSubmit(event)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="h4">Register</Typography>

            <TextField
                margin="normal"
                required
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">Register</Button>

        </Box>
    );
}
export default Register