import { Stack } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import React from "react";

function LoginAndRegistration() {

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={5}
            style={{ minHeight: '50vh' }}
        >

            <Login />
            <Register />
        </Stack >
    )
}

export default LoginAndRegistration