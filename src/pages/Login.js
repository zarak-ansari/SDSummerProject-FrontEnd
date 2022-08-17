import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import { Box, Button, TextField, Link } from "@mui/material"
function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        //reqres registered sample user
        const loginPayload = {
            email: email,
            password: password
        }

        axios.post("api/auth/login", loginPayload)
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
            <TextField
                margin="normal"
                required
                name="email"
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">Log In</Button>
            <Link
                href="/register"
                variant="body2"
            >
                {"Don't have an account? Register here"}
            </Link>
        </Box>

    );
}
export default Login