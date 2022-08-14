import React from "react"
import axios from "axios"

export default function Activation(props) {

    const [activationElements, setActivationElements] = React.useState(() => props.activationElements)

    const finalActivationPercentage = props.finalActivationPercentage
    const setFinalActivationPercentage = props.setFinalActivationPercentage

    const handleChange = (id, event) => {
        event.preventDefault()
        let data = [...activationElements]
        data[id][event.target.name] = event.target.value
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


    const activationInputs = activationElements.map(element => <li key={element.id}>
        <label>Stage of Activation</label>
        <input type="text" id="name" name="name" placeholder="name" value={element.name} onChange={(event) => handleChange(element.id, event)} />
        <label>Percentage of Users Activated to this Stage</label>
        <input type="number" id="percentage" name="percentage" placeholder="Percentage" value={element.percentage} onChange={(event) => handleChange(element.id, event)} />
        <button onClick={() => deleteElement(element.id)}>Delete</button>
    </li>)


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
            <form>
                <ul>{activationInputs}</ul>
            </form>

            <div>
                <button onClick={addActivationElement}>Add Activation Stage</button>
                <button onClick={updateUsersAfterActivation}>Update</button>
            </div>
        </>

    )
}