import React from "react"
import axios from "axios"

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


    function ReferralForm() {
        return (
            <>
                <label htmlFor="percentageOfReferringUsers">Percentage of Referring Users</label>
                <input
                    name="percentageOfReferringUsers"
                    id="percentageOfReferringUsers"
                    type="number"
                    placeholder="Percentage of Referring Users"
                    value={referrals.percentageOfReferringUsers}
                    onChange={(event) => handleChange(event)}
                />
                <label htmlFor="referralsPerUser">Referrals Per User</label>
                <input
                    name="referralsPerUser"
                    id="referralsPerUser"
                    type="number"
                    placeholder="Referrals per User"
                    value={referrals.referralsPerUser}
                    onChange={(event) => handleChange(event)}
                />
                <label htmlFor="costPerReferral">Referrals Per User</label>
                <input
                    name="costPerReferral"
                    id="costPerReferral"
                    type="number"
                    placeholder="Cost Per Referral"
                    value={referrals.costPerReferral}
                    onChange={(event) => handleChange(event)}
                />

                <button onClick={updateUsersAfterReferralsAndCostOfReferrals}>Update</button>
            </>
        )
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
        <ReferralForm />
    )
}

export default Referrals