import React from "react"
import axios from "axios"
import { TextField, Button, Divider, Slider, Stack, Typography } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'

function Referrals(props) {

    const acquisitionsBeforeReferrals = props.acquisitionsBeforeReferrals
    const activationPercentage = props.finalActivationPercentage
    const setUserAcquisitionAfterReferrals = props.setUserAcquisitionAfterReferrals
    const setUsersRetainedAfterReferrals = props.setUsersRetainedAfterReferrals
    const setCostOfReferrals = props.setCostOfReferrals
    const retentionCurve = props.retentionCurve

    const [referrals, setReferrals] = React.useState(() => props.referrals ? props.referrals : createDefaultReferrals())
    function createDefaultReferrals() {
        return ({
            percentageOfReferringUsers: 0.0,
            referralsPerUser: 0,
            costPerReferral: 0
        })
    }

    function handleChange(event) {
        setReferrals(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }



    function updateCostAndAcquisitions() {

        const userAcquisitionPerCurrentUsers = referrals.percentageOfReferringUsers * referrals.referralsPerUser
        const resultUserAcquisitions = Array(acquisitionsBeforeReferrals.length).fill(0)
        const resultUsersRetained = Array(acquisitionsBeforeReferrals.length).fill(0)
        const resultCost = Array(acquisitionsBeforeReferrals.length).fill(0)

        resultUserAcquisitions[0] = acquisitionsBeforeReferrals[0]

        for (var i = 0; i < acquisitionsBeforeReferrals.length - 1; i++) {
            for (var j = 0; j < retentionCurve.length; j++) {
                if ((i + j) < acquisitionsBeforeReferrals.length)
                    resultUsersRetained[i + j] += resultUserAcquisitions[i] * activationPercentage * (1 - retentionCurve[j])
            }
            resultUserAcquisitions[i + 1] = acquisitionsBeforeReferrals[i + 1] + (resultUsersRetained[i] * userAcquisitionPerCurrentUsers)
            resultCost[i + 1] = (resultUserAcquisitions[i + 1] - acquisitionsBeforeReferrals[i + 1]) * referrals.costPerReferral
        }
        var i2 = acquisitionsBeforeReferrals.length - 1
        for (var j2 = 0; j2 < retentionCurve.length; j2++) {
            if ((i2 + j2) < acquisitionsBeforeReferrals.length)
                resultUsersRetained[i2 + j2] += resultUserAcquisitions[i2] * activationPercentage * (1 - retentionCurve[j2])
        }
        setCostOfReferrals(resultCost)
        setUserAcquisitionAfterReferrals(resultUserAcquisitions)
        setUsersRetainedAfterReferrals(resultUsersRetained)
    }

    function updateData() {
        axios.post(`/api/startup_project/${props.projectId}/referrals`, referrals)
        updateCostAndAcquisitions()
    }

    React.useEffect(updateData, [props.usersAfterRetention, props.finalActivationPercentage])

    return (
        <>
            <Stack direction="row" spacing={5} mb={2}>
                <Typography variant="body1">Percentage of Referring Users:</Typography>
                <Slider
                    name="percentageOfReferringUsers"
                    id="percentageOfReferringUsers"
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    valueLabelDisplay="auto"
                    value={referrals.percentageOfReferringUsers}
                    onChange={(event) => handleChange(event)}
                    sx={{ width: 200 }}
                />
                <TextField
                    required
                    label="Referrals Per User"
                    name="referralsPerUser"
                    id="referralsPerUser"
                    type="number"
                    placeholder="Referrals per User"
                    InputProps={{ inputProps: { min: 0, step: 1 } }}
                    value={referrals.referralsPerUser}
                    onChange={(event) => handleChange(event)}
                />
                <TextField
                    label="Cost Per Referral"
                    name="costPerReferral"
                    id="costPerReferral"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    placeholder="Cost Per Referral"
                    value={referrals.costPerReferral}
                    onChange={(event) => handleChange(event)}
                />

            </Stack>
            <Divider />
            <Button startIcon={<SaveIcon />} variant="contained" onClick={updateData}>Save and Update</Button>
        </>
    )
}

export default Referrals