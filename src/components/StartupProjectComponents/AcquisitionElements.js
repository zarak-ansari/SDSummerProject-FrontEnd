import React from "react"
import axios from "axios"
import { Box, TextField, ButtonGroup, Button, ListItem, List, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
export default function AcquisitionElements(props) {

  const numberOfPeriods = props.numberOfPeriods

  const [acquisitionElements, setAcquisitionElements] = React.useState(() => props.acquisitionElements)

  const acquisitionsInputs = acquisitionElements.map(element => <ListItem margin="normal" key={element.id}>
    <TextField label="Name of the Element" type="text" id="name" name="name" placeholder="name" value={element.name} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <TextField label="Description" type="text" id="description" name="description" placeholder="description" value={element.description} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <TextField label="Acquisitions Per Period" type="number" InputProps={{ inputProps: { min: 0 } }} id="startingValue" name="startingValue" placeholder="Starting Value" value={element.startingValue} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <TextField label="Increase in Acquisitions per Period" type="number" InputProps={{ inputProps: { min: 0 } }} id="incrementEachPeriod" name="incrementEachPeriod" placeholder="Increase Each Period" value={element.incrementEachPeriod} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <TextField label="Cost per Acquisition" type="number" InputProps={{ inputProps: { min: 0, step: 0.01 } }} id="costPerAcquisition" name="costPerAcquisition" placeholder="Cost Per Acquisition" value={element.costPerAcquisition} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <IconButton onClick={(event) => deleteElement(event, element.id)} ><DeleteIcon /></IconButton>
  </ListItem>)

  const handleChangeInAcquisitionElements = (id, event) => {
    event.preventDefault()
    let data = [...acquisitionElements]
    const targetElementIndex = data.findIndex(element => element.id === id)
    data[targetElementIndex][event.target.name] = event.target.value
    setAcquisitionElements(data)
  }

  function createNewAcquisitionElement() {
    return {
      id: acquisitionElements.length,
      name: "",
      description: "",
      startingValue: 0,
      incrementEachPeriod: 0,
      costPerAcquisition: 0
    }
  }

  React.useEffect(updateAcquisitionsData, [props.numberOfPeriods])

  function updateAcquisitionsData() {
    axios.post(`/api/startup_project/${props.projectId}/acquisition_elements`, acquisitionElements)
    const acquisitionsResult = []
    const acquisitionsCostsResult = []

    for (var i = 0; i < numberOfPeriods; i++) {
      acquisitionsResult.push(0)
      acquisitionsCostsResult.push(0)
    }

    acquisitionElements.forEach(
      element => {
        for (var i = 0; i < numberOfPeriods; i++) {
          acquisitionsResult[i] += parseInt(element.startingValue) + (i * parseInt(element.incrementEachPeriod))
          acquisitionsCostsResult[i] += acquisitionsResult[i] * element.costPerAcquisition
        }
      }
    )
    props.setAcquisitionsData(acquisitionsResult)
    props.setAcquisitionsCost(acquisitionsCostsResult)
  }

  function addAcquisitionElement() {
    const newElement = createNewAcquisitionElement()
    setAcquisitionElements(prevElements => [...prevElements, newElement])
  }

  function deleteElement(event, id) {
    setAcquisitionElements(prev => prev.filter(element => element.id !== id))
  }


  return (
    <>
      <Box>
        <List>{acquisitionsInputs}</List>
      </Box>

      <ButtonGroup>
        <Button variant="contained" onClick={addAcquisitionElement}>Add Linear Acquisition Element</Button>
        <Button variant="contained" onClick={updateAcquisitionsData}>Update Chart</Button>
      </ButtonGroup>
    </>

  );

}