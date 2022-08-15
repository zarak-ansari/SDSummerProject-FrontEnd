import React from "react"
import axios from "axios"
import { List, ListItem, Slider, TextField } from "@mui/material"

function Retention(props) {
    const numberOfPeriods = props.numberOfPeriods
    const [maxRetentionPeriod, setMaxRetentionPeriod] = React.useState(() => (props.retentionCurve.length > 0 ? props.retentionCurve.length : 10))
    const [retentionCurve, setRetentionCurve] = React.useState(() => (props.retentionCurve.length > 0 ? props.retentionCurve : Array(maxRetentionPeriod).fill(0)))

    const decayCurveInputs = []

    for (var i = 0; i < maxRetentionPeriod; i++) {
        decayCurveInputs.push(
            <ListItem key={i}>
                <Slider
                    id={i}
                    name={i.toString()}
                    valueLabelDisplay="auto"
                    defaultValue={retentionCurve[i - 1] ? retentionCurve[i - 1] : 0.00}
                    min={0.00}
                    max={1.00}
                    step={0.01}
                    value={retentionCurve[i]}
                    onChange={(event) => handleChangeInDecayCurve(event)}
                />
            </ListItem>
        )
    }

    function handleChangeInDecayCurve(event) {
        let result = [...retentionCurve]
        const currentIndex = parseInt(event.target.name)
        const lastValue = parseInt(event.target.name) - 1
        if (!result[lastValue] || result[lastValue] <= event.target.value) {
            result[currentIndex] = event.target.value
            for (var i = currentIndex + 1; i < retentionCurve.length; i++) {
                result[i] = Math.max(retentionCurve[i], retentionCurve[currentIndex])
            }
        }
        setRetentionCurve(result)
    }

    function updateRetainedUsers() {
        axios.post(`/api/startup_project/${props.projectId}/retention_curve`, retentionCurve)
        let result = Array(numberOfPeriods).fill(0)
        for (var i = 0; i < props.activatedUsers.length; i++) {
            for (var j = 0; j < retentionCurve.length; j++) {
                if ((i + j) < props.numberOfPeriods)
                    result[i + j] += props.activatedUsers[i] * (1 - retentionCurve[j])
            }
        }
        props.setRetainedUsers(result)
    }
    React.useEffect(updateRetainedUsers, [props.activatedUsers])

    return (
        <>
            <p>{JSON.stringify(retentionCurve)}</p>
            <TextField type="number" name="maxRetentionPeriod" value={maxRetentionPeriod} onChange={(event) => setMaxRetentionPeriod(event.target.value)} />
            <List>{decayCurveInputs}</List>
            <button onClick={updateRetainedUsers}>Calculate Users After Retention</button>
        </>

    )
}

export default Retention