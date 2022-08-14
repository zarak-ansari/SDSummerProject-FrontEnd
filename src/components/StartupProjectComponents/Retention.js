import React from "react"
import axios from "axios"

function Retention(props) {
    const numberOfPeriods = props.numberOfPeriods
    const [maxRetentionPeriod, setMaxRetentionPeriod] = React.useState(() => (props.retentionCurve.length > 0 ? props.retentionCurve.length : 10))
    const [retentionCurve, setRetentionCurve] = React.useState(() => (props.retentionCurve.length > 0 ? props.retentionCurve : Array(maxRetentionPeriod).fill(0)))

    const decayCurveInputs = []

    for (var i = 0; i < maxRetentionPeriod; i++) {
        decayCurveInputs.push(
            <li key={i}><input name="decayPercentage" value={retentionCurve[i]} id={i} onChange={(event) => handleChangeInDecayCurve(event)} /></li>
        )
    }

    function handleChangeInDecayCurve(event) {
        let result = [...retentionCurve]
        result[event.target.id] = event.target.value
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
            <input type="number" name="maxRetentionPeriod" value={maxRetentionPeriod} onChange={(event) => setMaxRetentionPeriod(event.target.value)} />
            <ul>{decayCurveInputs}</ul>
            <button onClick={updateRetainedUsers}>Calculate Users After Retention</button>
        </>

    )
}

export default Retention