import React from "react"
import axios from "axios"
import { List, ListItem, Slider, TextField, Button, Typography, IconButton, Stack } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

function Retention(props) {
    const numberOfPeriods = props.numberOfPeriods
    const [retentionCurve, setRetentionCurve] = React.useState(() => (props.retentionCurve.length > 0 ? props.retentionCurve : Array(10).fill(0)))


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
    function incrementRetentionPeriod() {
        setRetentionCurve(prev => prev.push(1))
    }
    return (
        <>
            <Stack direction="row">
                <IconButton color="primary" size="small" onClick={() => setRetentionCurve(prev => prev.filter((element, index) => index !== prev.length - 1))}><RemoveIcon /></IconButton>
                <Typography variant="h5">Retention Period: {retentionCurve.length}</Typography>
                <IconButton color="primary" size="small" onClick={() => setRetentionCurve(prev => [...prev, 1.0])} ><AddIcon /></IconButton>
            </Stack>
            <List>
                {retentionCurve.map((element, index) => {
                    return <ListItem key={index} sx={{ margin: 0, height: 30 }}>
                        <Typography margin={2}>{index.toString()}</Typography>
                        <Slider
                            id={index}
                            name={index}
                            valueLabelDisplay="auto"
                            defaultValue={retentionCurve[index - 1] ? retentionCurve[index - 1] : 0.00}
                            min={0.00}
                            max={1.00}
                            step={0.01}
                            value={retentionCurve[index]}
                            onChange={(event) => handleChangeInDecayCurve(event)}

                        />
                    </ListItem>

                })}
            </List>
            <Button variant="contained" onClick={updateRetainedUsers}>Calculate Users After Retention</Button>
        </>

    )
}

export default Retention