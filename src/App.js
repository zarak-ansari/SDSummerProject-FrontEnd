import './App.css';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './routes';
import axiosDefaultConfig from './helpers/axiosDefaultConfig';
import { setAuthToken } from './helpers/setAuthToken'

function App() {
  //check jwt token

  axiosDefaultConfig()

  const token = localStorage.getItem("token")
  if (token) setAuthToken(token)

  return (
    <div className="App">
      <Routers />
    </div>
  )
}

export default App;
