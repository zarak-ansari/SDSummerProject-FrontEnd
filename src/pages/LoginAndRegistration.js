import { Paper, Stack, Typography } from "@mui/material";
import Login from "../components/Auth Helpers/Login";
import Register from "../components/Auth Helpers/Register";
import React from "react";

function LoginAndRegistration() {

    return (
        <>
            <Stack
                alignItems="center"
                justifyContent="center"
                spacing={2}
                mt={5}
            >
                <Typography variant="h2">Startup Growth Engineering</Typography>
                <Typography variant="h5">An Application to Visualize User Growth</Typography>
                <Typography variant="body1">Log In or Register Below to get started</Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={5}
                style={{ minHeight: '50vh' }}
            >
                <Paper sx={{ padding: 5 }}><Login /></Paper>
                <Paper sx={{ padding: 5 }}><Register /></Paper>


            </Stack >
        </>
    )
}

export default LoginAndRegistration