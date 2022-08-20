import React from "react"
import axios from "axios"
import { List, ListItem, Slider, Button, Typography, IconButton, Stack } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'

function Retention(props) {
    const numberOfPeriods = props.numberOfPeriods
    const retentionCurve = props.retentionCurve
    const setRetentionCurve = props.setRetentionCurve

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
            <Stack direction="row" spacing={3}>
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
                            name={index.toString()}
                            defaultValue={retentionCurve[index - 1] ? retentionCurve[index - 1] : 0.00}
                            min={0.00}
                            max={1.00}
                            step={0.01}
                            valueLabelDisplay="auto"
                            value={retentionCurve[index]}
                            onChange={(event) => handleChangeInDecayCurve(event)}

                        />
                    </ListItem>

                })}
            </List>
            <Button startIcon={<SaveIcon />} variant="contained" onClick={updateRetainedUsers}>Save and Update</Button>
        </>

    )
}

export default Retention