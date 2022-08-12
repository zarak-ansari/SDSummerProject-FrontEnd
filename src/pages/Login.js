import React from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = () => {

        //reqres registered sample user
        const loginPayload = {
            email: email,
            password: password
        }

        axios.post("http://localhost:8080/api/auth/register", loginPayload)
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
        <form
            onSubmit={(event) => {
                event.preventDefault()
                const [email, password] = event.target.children;
                handleSubmit(email, password);
            }}
        >
            <label htmlFor="email">Email</label><br />
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
            <input type="submit" value="Submit" />
        </form>
    );
}
export default Login