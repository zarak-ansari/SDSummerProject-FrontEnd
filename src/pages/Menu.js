import axios from "axios";
import React from "react";
import NavigationBar from "../components/NavigationBar"
function Menu() {
    let token = ""
    localStorage.getItem("token") ? token = localStorage.getItem("token") : token = "not found"

    const [projects, setProjects] = React.useState([])

    function updateProjects() {
        axios.get("http://localhost:8080/api/user/projects")
            .then(response => {
                setProjects(response.data)
            })
            .catch(err => console.log(err))
    }

    function addNewProject() {

        const new_project = {
            name: "new project",
            description: "my awesome new project from react"
        }

        axios.post("http://localhost:8080/api/user/add_project", new_project)
    }

    updateProjects()

    return (
        <div>
            <NavigationBar />
            <h1>Home Page</h1>
            <p>{token}</p>
            <p>{JSON.stringify(projects)}</p>
            <button onClick={addNewProject}>Add New Project</button>
        </div>
    );
}

export default Menu;