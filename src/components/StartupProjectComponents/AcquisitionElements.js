import React from "react"
import axios from "axios"
import { Box, TextField, Button, ListItem, List, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
export default function AcquisitionElements(props) {

  const numberOfPeriods = props.numberOfPeriods

  const [acquisitionElements, setAcquisitionElements] = React.useState(() => props.acquisitionElements)

  const acquisitionsInputs = acquisitionElements.map(element => <ListItem margin="normal" key={element.id}>
    <TextField
      label="Name of the Element"
      type="text"
      name="name"
      placeholder="Name"
      value={element.name}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Description"
      type="text"
      name="description"
      placeholder="description"
      value={element.description}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Acquisitions Per Period"
      name="startingValue"
      type="number"
      InputProps={{ inputProps: { min: 0, step: 1 } }}
      placeholder="Starting Value"
      value={element.startingValue}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Increase in Acquisitions per Period"
      type="number"
      InputProps={{ inputProps: { min: 0, step: 1 } }}
      name="incrementEachPeriod"
      placeholder="Increase Each Period"
      value={element.incrementEachPeriod}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Cost per Acquisition"
      type="number"
      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
      name="costPerAcquisition"
      placeholder="Cost Per Acquisition"
      value={element.costPerAcquisition}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Starting Period"
      type="number"
      InputProps={{ inputProps: { min: 0, step: 1, max: numberOfPeriods } }}
      name="startingPeriod"
      placeholder="Starting Period"
      value={element.startingPeriod}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <TextField
      label="Ending Period"
      type="number"
      InputProps={{ inputProps: { min: 0, step: 1, max: numberOfPeriods } }}
      name="endingPeriod"
      placeholder="Ending Period"
      value={element.endingPeriod}
      onChange={(event) => handleChangeInAcquisitionElements(element.id, event)}
    />
    <IconButton onClick={(event) => deleteElement(event, element.id)} ><DeleteIcon /></IconButton>
  </ListItem>)

  const handleChangeInAcquisitionElements = (id, event) => {
    event.preventDefault()
    let data = [...acquisitionElements]
    const targetElementIndex = data.findIndex(element => element.id === id)
    const value = (event.target.type === "number" && !event.target.value) ? 0 : event.target.value
    data[targetElementIndex][event.target.name] = value
    setAcquisitionElements(data)
  }

  function createNewAcquisitionElement() {
    return {
      id: acquisitionElements.length,
      name: "",
      description: "",
      startingValue: 0,
      incrementEachPeriod: 0,
      costPerAcquisition: 0,
      startingPeriod: 0,
      endingPeriod: numberOfPeriods
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
        for (var i = element.startingPeriod; i < Math.min(element.endingPeriod, numberOfPeriods); i++) {
          acquisitionsResult[i] += Math.max(parseInt(element.startingValue) + ((i - element.startingPeriod) * parseInt(element.incrementEachPeriod)), 0)
          acquisitionsCostsResult[i] += Math.max(acquisitionsResult[i] * element.costPerAcquisition, 0)
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

      <Button startIcon={<AddIcon />} variant="contained" onClick={addAcquisitionElement} sx={{ margin: 2 }}>Add Linear Acquisition Element</Button>
      <Button startIcon={<SaveIcon />} variant="contained" onClick={updateAcquisitionsData} sx={{ margin: 2 }}>Save and Update</Button>
    </>

  );

}