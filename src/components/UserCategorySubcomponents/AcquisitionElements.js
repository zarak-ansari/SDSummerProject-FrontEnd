import React from "react"

export default function AcquisitionElements(props) {

  const numberOfPeriods = props.numberOfPeriods

  const [linearAcquisitionElements, setLinearAcquisitionElements] = React.useState([])

  const acquisitionsInputs = linearAcquisitionElements.map(element => <li key={element.id}>
    <label htmlFor="name">Name of the Element</label>
    <input type="text" id="name" name="name" placeholder="name" value={element.name} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <label htmlFor="description">Description</label>
    <input type="text" id="description" name="description" placeholder="description" value={element.description} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <label htmlFor="startingValue">Increase in Users Each Period</label>
    <input type="number" id="startingValue" name="startingValue" placeholder="Starting Value" value={element.startingValue} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <label htmlFor="incrementEachPeriod">Increase in Acquisitions Per Period</label>
    <input type="number" id="incrementEachPeriod" name="incrementEachPeriod" placeholder="Increase Each Period" value={element.incrementEachPeriod} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <label htmlFor="costPerAcquisition">Cost Per Acquisition</label>
    <input type="number" id="costPerAcquisition" name="costPerAcquisition" placeholder="Cost Per Acquisition" value={element.costPerAcquisition} onChange={(event) => handleChangeInAcquisitionElements(element.id, event)} />
    <button onClick={(event) => deleteElement(event, element.id)}>Delete</button>
  </li>)

  const handleChangeInAcquisitionElements = (id, event) => {
    event.preventDefault()
    let data = [...linearAcquisitionElements]
    data[id][event.target.name] = event.target.value
    setLinearAcquisitionElements(data)
  }

  function createNewAcquisitionElement() {
    return {
      id: linearAcquisitionElements.length,
      name: "",
      description: "",
      startingValue: 0,
      incrementEachPeriod: 0,
      costPerAcquisition: 0
    }
  }

  React.useEffect(updateAcquisitionsData, [props.numberOfPeriods])

  function updateAcquisitionsData() {
    const acquisitionsResult = []
    const acquisitionsCostsResult = []

    for (var i = 0; i < numberOfPeriods; i++) {
      acquisitionsResult.push(0)
      acquisitionsCostsResult.push(0)
    }

    linearAcquisitionElements.forEach(
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
    setLinearAcquisitionElements(prevElements => [...prevElements, newElement])
  }

  function deleteElement(event, id) {
    setLinearAcquisitionElements(prev => prev.filter(element => element.id !== id))
  }


  return (
    <>
      <form>
        <ul>{acquisitionsInputs}</ul>
      </form>

      <div>
        <button onClick={addAcquisitionElement}>Add Linear Acquisition Element</button>
        <button onClick={updateAcquisitionsData}>Update Chart</button>
      </div>
    </>

  );

}