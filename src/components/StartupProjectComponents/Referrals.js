import React from "react"
import axios from "axios"
import { TextField, Button, Divider, Slider, Stack, Typography } from "@mui/material"

function Referrals(props) {

    const usersBeforeReferrals = props.usersAfterRetention
    const activationPercentage = props.finalActivationPercentage
    const setUsersAfterCompoundingGrowth = props.setUsersAfterCompoundingGrowth
    const setCostOfReferrals = props.setCostOfReferrals

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


    function updateUsersAfterReferralsAndCostOfReferrals() {

        axios.post(`/api/startup_project/${props.projectId}/referrals`, referrals)
        const userAcquisitionPerCurrentUsers = referrals.percentageOfReferringUsers * referrals.referralsPerUser * activationPercentage
        const resultUsers = Array(usersBeforeReferrals.length).fill(0)
        const resultCost = Array(usersBeforeReferrals.length).fill(0)

        resultUsers[0] = usersBeforeReferrals[0]
        for (var i = 0; i < usersBeforeReferrals.length - 1; i++) {
            resultUsers[i + 1] = usersBeforeReferrals[i + 1] + (resultUsers[i] * userAcquisitionPerCurrentUsers)
            resultCost[i + 1] = usersBeforeReferrals[i] * referrals.percentageOfReferringUsers * referrals.costPerReferral
        }
        setCostOfReferrals(resultCost)
        setUsersAfterCompoundingGrowth(resultUsers)
    }

    React.useEffect(updateUsersAfterReferralsAndCostOfReferrals, [props.usersAfterRetention, props.finalActivationPercentage])

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
                    InputProps={{ inputProps: { min: 0 } }}
                    value={referrals.referralsPerUser}
                    onChange={(event) => handleChange(event)}
                />
                <TextField
                    label="Cost Per Referral"
                    name="costPerReferral"
                    id="costPerReferral"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder="Cost Per Referral"
                    value={referrals.costPerReferral}
                    onChange={(event) => handleChange(event)}
                />

            </Stack>
            <Divider />
            <Button variant="contained" onClick={updateUsersAfterReferralsAndCostOfReferrals}>Update</Button>
        </>
    )
}

export default Referrals