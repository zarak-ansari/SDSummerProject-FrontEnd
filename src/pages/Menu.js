import axios from "axios";
import React from "react";
import NavigationBar from "../components/NavigationBar"
import NewProjectForm from "../components/NewProjectForm"
import StartupProject from "../components/StartupProjectComponents/StartupProject";

function Menu() {

    const [projects, setProjects] = React.useState([])

    function updateProjectList() {
        axios.get("/api/user/projects")
            .then(response => {
                setProjects(response.data)
            })
            .catch(err => console.log(err))
        console.log("update projects ran")
    }

    React.useEffect(updateProjectList, [])

    function ProjectList() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Number Of Periods</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(project => <tr key={project.id}><td>{project.id}</td><td>{project.name}</td><td>{project.description}</td><td>{project.numberOfPeriods}</td></tr>)
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <NavigationBar />
            <h1>Home Page</h1>
            <ProjectList />
            <NewProjectForm updateProjectList={updateProjectList} />
            {projects.length > 0 && <StartupProject project={projects[0]} />}
        </div>
    );
}

export default Menu;