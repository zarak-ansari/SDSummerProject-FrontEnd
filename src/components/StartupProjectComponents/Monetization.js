import React from "react"
import axios from "axios"
import { TextField, Button, Divider, Slider, Typography, Stack } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'


function Monetization(props) {
    // average revenue per user per period * percentage of paid users
    const [revenuePerUserPerPeriod, setRevenuePerUserPerPeriod] = React.useState(props.monetization ? props.monetization.revenuePerUserPerPeriod : 0)
    const [percentageOfPaidUsers, setPercentageOfPaidUsers] = React.useState(props.monetization ? props.monetization.revenuePerUserPerPeriod : 0.0)

    function calculateRevenue() {
        const payload = {
            revenuePerUserPerPeriod: revenuePerUserPerPeriod,
            percentageOfPaidUsers: percentageOfPaidUsers
        }
        axios.post(`/api/startup_project/${props.projectId}/monetization`, payload)
        props.setTotalRevenue(props.usersAfterCompoundingGrowth.map(users => users * revenuePerUserPerPeriod * percentageOfPaidUsers))
    }

    React.useEffect(calculateRevenue, [props.usersAfterCompoundingGrowth])
    return (
        <>
            <Stack direction="row" spacing={5}>
                <Typography variant="body1">Percentage of Paid Users</Typography>
                <Slider
                    type="number"
                    id="percentageOfPaidUsers"
                    name="percentageOfPaidUsers"
                    min={0}
                    max={1}
                    step={0.01}
                    valueLabelDisplay="auto"
                    value={percentageOfPaidUsers}
                    placeholder="Percentage of Paid Users"
                    onChange={(event) => setPercentageOfPaidUsers(event.target.value)}
                    sx={{ width: 200 }}
                />
                <TextField
                    label="Revenue Per Paying User Per Period"
                    type="number"
                    id="revenuePerUserPerPeriod"
                    name="revenuePerUserPerPeriod"
                    value={revenuePerUserPerPeriod}
                    placeholder="Revenue Per User Per Period"
                    onChange={(event) => setRevenuePerUserPerPeriod(event.target.value)}
                />
                <Divider />
                <Button startIcon={<SaveIcon />} variant="contained" onClick={calculateRevenue}>Save and Update</Button>
            </Stack>

        </>
    )


}

export default Monetization