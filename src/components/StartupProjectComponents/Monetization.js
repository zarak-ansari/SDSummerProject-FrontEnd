import React from "react"
import axios from "axios"
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
            <label htmlFor="revenuePerUserPerPeriod">Revenue Per Paying User Per Period</label>
            <input
                type="number"
                id="revenuePerUserPerPeriod"
                name="revenuePerUserPerPeriod"
                value={revenuePerUserPerPeriod}
                placeholder="Revenue Per User Per Period"
                onChange={(event) => setRevenuePerUserPerPeriod(event.target.value)}
            />
            <label htmlFor="percentageOfPaidUsers">Percentage of Paid Users</label>
            <input
                type="number"
                id="percentageOfPaidUsers"
                name="percentageOfPaidUsers"
                value={percentageOfPaidUsers}
                placeholder="Percentage of Paid Users"
                onChange={(event) => setPercentageOfPaidUsers(event.target.value)}
            />
            <button onClick={calculateRevenue}>Update Data</button>
        </>
    )


}

export default Monetization