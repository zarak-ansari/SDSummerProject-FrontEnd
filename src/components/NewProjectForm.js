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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} ></input>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} ></input>
            <input type="number" id="numberOfPeriods" name="numberOfPeriods" value={formData.numberOfPeriods} onChange={handleChange} ></input>
            <button>Submit</button>
        </form>
    )
}

export default NewProjectForm