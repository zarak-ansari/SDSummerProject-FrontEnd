import axios from "axios";
import React from "react";
import NavigationBar from "../components/NavigationBar"
import NewProjectForm from "../components/NewProjectForm"
import StartupProject from "../components/StartupProjectComponents/StartupProject";
import { Modal, Stack, Box, List, ListItemButton, CssBaseline, Drawer, Toolbar, Typography, IconButton } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 300;

function Menu() {

    const [projects, setProjects] = React.useState([])
    const [selectedProjectIndex, setSelectedProjectIndex] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    function updateProjectList() {
        axios.get("/api/user/projects")
            .then(response => {
                setProjects(response.data.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
            })
            .catch(err => console.log(err))
    }

    function updateSelectedProject(projectId) {
        setSelectedProjectIndex(projects.findIndex(project => project.id === projectId))
    }

    async function deleteProject(event, projectId) {
        event.stopPropagation()
        await axios.delete(`/api/startup_project/${projectId}`)
        setSelectedProjectIndex(0)
        setProjects(prev => prev.filter(project => project.id !== projectId))
    }

    React.useEffect(updateProjectList, [selectedProjectIndex])

    function ProjectList() {
        return (
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Typography variant="h4">Projects<IconButton onClick={handleOpen}><AddBoxIcon fontSize="large" /></IconButton></Typography>
                        {
                            projects.map(project => {
                                return <ListItemButton
                                    key={project.id}
                                    onClick={() => updateSelectedProject(project.id)}
                                >
                                    {project.name}
                                    <IconButton
                                        onClick={(event) => deleteProject(event, project.id)}
                                        sx={{ position: "absolute", right: "0px" }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemButton>
                            })

                        }
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <Box>
                                <NewProjectForm updateProjectList={updateProjectList} handleClose={handleClose} />

                            </Box>
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
            <Box sx={{ display: 'flex' }}>
                <ProjectList />

                <Stack width='90%' margin={15}>
                    {projects.length > 0 && <StartupProject key={selectedProjectIndex} project={projects[selectedProjectIndex]} />}
                </Stack>
            </Box >
        </>
    );
}

export default Menu;