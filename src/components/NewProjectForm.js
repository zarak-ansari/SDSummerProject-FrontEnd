import { TextareaAutosize, TextField, Button } from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import React from "react"

function NewProjectForm(props) {

    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        numberOfPeriods: 10
    })

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await axios.post("api/user/add_project", formData)
        props.updateProjectList()
        props.handleClose()
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                bgcolor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                padding: 2
            }}
        >
            <Stack spacing={1.5}>
                <TextField label="Name of the Project" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <TextareaAutosize placeholder="Description" minRows={5} type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <TextField label="Number of Periods" type="number" id="numberOfPeriods" name="numberOfPeriods" value={formData.numberOfPeriods} onChange={handleChange} />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Box >
    )
}

export default NewProjectForm