import axios from "axios";
import React from "react";
import NavigationBar from "../components/NavigationBar"
import NewProjectForm from "../components/NewProjectForm"
import StartupProject from "../components/StartupProjectComponents/StartupProject";
import { Modal, Stack, Box, List, ListItemButton, CssBaseline, Drawer, Toolbar } from "@mui/material"


const drawerWidth = 240;

function Menu() {

    const [projects, setProjects] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    ['& .MuiDrawer-paper']: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {
                            projects.map(project => <ListItemButton key={project.id}> {project.name}</ListItemButton>)
                        }
                        <ListItemButton onClick={handleOpen}>
                            Add New Project
                        </ListItemButton>
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <NewProjectForm updateProjectList={updateProjectList} handleClose={handleClose} />
                        </Modal>
                    </List>
                </Box>
            </Drawer>
        )

    }

    return (
        <>
            <CssBaseline />
            <NavigationBar />
            <h1>Home Page</h1>
            <Box sx={{ display: 'flex' }}>
                <ProjectList />

                <Stack width='100%'>
                    {projects.length > 0 && <StartupProject project={projects[0]} />}
                </Stack>
            </Box >
        </>
    );
}

export default Menu;