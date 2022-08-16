import React from "react"
import axios from "axios"
import { TextField, Button, ButtonGroup, Box, List, ListItem, IconButton, Slider } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export default function Activation(props) {

    const [activationElements, setActivationElements] = React.useState(() => props.activationElements)

    const finalActivationPercentage = props.finalActivationPercentage
    const setFinalActivationPercentage = props.setFinalActivationPercentage

    const handleChange = (id, event) => {
        event.preventDefault()
        let data = [...activationElements]
        const elementIndex = data.findIndex(element => element.id === id)
        data[elementIndex][event.target.name] = event.target.value
        setActivationElements(data)
    }

    function createNewActivationElement() {
        return {
            id: activationElements.length,
            name: "",
            percentage: 0.0
        }
    }

    function addActivationElement() {
        const newElement = createNewActivationElement()
        setActivationElements(prevElements => [...prevElements, newElement])
    }

    function deleteElement(id) {
        setActivationElements(prev => prev.filter(element => element.id !== id))
    }


    const activationInputs = activationElements.map(element => <ListItem key={element.id}>

        <TextField
            label="Stage of Activation"
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={element.name}
            onChange={(event) => handleChange(element.id, event)}
        />
        {/* <TextField
            label="Percentage of Users Activated to this Stage"
            type="number"
            id="percentage"
            name="percentage"
            placeholder="Percentage"
            value={element.percentage}
            onChange={(event) => handleChange(element.id, event)}
        /> */}
        <Slider
            type="number"
            id="percentageSlider"
            name="percentage"
            placeholder="Percentage"
            valueLabelDisplay="auto"
            min={0.00}
            max={1.00}
            step={0.01}
            value={element.percentage}
            onChange={(event) => handleChange(element.id, event)}
        />
        <IconButton onClick={() => deleteElement(element.id)}><DeleteIcon /></IconButton>
    </ListItem>)


    React.useEffect(updateActivationPercentage, [activationElements])
    React.useEffect(updateUsersAfterActivation, [props.acquisitions])

    function updateActivationPercentage() {
        let activationPercentage = 1.0
        activationElements.forEach(element => activationPercentage *= element.percentage)
        setFinalActivationPercentage(activationPercentage)
    }

    function updateUsersAfterActivation() {
        axios.post(`/api/startup_project/${props.projectId}/activation_elements`, activationElements)
        let activatedUsers = Array(props.acquisitions.length).fill(0)
        props.acquisitions.forEach((acquiredUsers, index) => {
            activatedUsers[index] = acquiredUsers * finalActivationPercentage
        })
        props.setUsersAfterActivation(activatedUsers)
    }

    return (
        <>
            <Box>
                <List>{activationInputs}</List>
            </Box>

            <ButtonGroup>
                <Button variant="contained" onClick={addActivationElement}>Add Activation Stage</Button>
                <Button variant="contained" onClick={updateUsersAfterActivation}>Update</Button>
            </ButtonGroup>
        </>

    )
}