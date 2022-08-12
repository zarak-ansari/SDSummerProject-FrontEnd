import React from "react"

function Referrals(props) {

    const usersBeforeReferrals = props.usersAfterRetention
    const activationPercentage = props.finalActivationPercentage
    const setUsersAfterCompoundingGrowth = props.setUsersAfterCompoundingGrowth

    const [percentageOfReferringUsers, setPercentageOfReferringUsers] = React.useState()
    const [referralsPerUser, setReferralsPerUser] = React.useState()
    const [costPerReferral, setCostPerReferral] = React.useState()


    function ReferralForm() {
        return (
            <>
                <label htmlFor="percentageOfReferringUsers">Percentage of Referring Users</label>
                <input
                    name="percentageOfReferringUsers"
                    id="percentageOfReferringUsers"
                    type="number"
                    placeholder="Percentage of Referring Users"
                    value={percentageOfReferringUsers}
                    onChange={(event) => setPercentageOfReferringUsers(event.target.value)}
                />
                <label htmlFor="referralsPerUser">Referrals Per User</label>
                <input
                    name="referralsPerUser"
                    id="referralsPerUser"
                    type="number"
                    placeholder="Referrals per User"
                    value={referralsPerUser}
                    onChange={(event) => setReferralsPerUser(event.target.value)}
                />
                <label htmlFor="costPerReferral">Referrals Per User</label>
                <input
                    name="costPerReferral"
                    id="costPerReferral"
                    type="number"
                    placeholder="Cost Per Referral"
                    value={costPerReferral}
                    onChange={(event) => setCostPerReferral(event.target.value)}
                />

                <button onClick={updateUsersAfterReferrals}>Update</button>
            </>
        )
    }

    function updateUsersAfterReferrals() {
        const userAcquisitionPerCurrentUsers = percentageOfReferringUsers * referralsPerUser * activationPercentage
        const result = Array(usersBeforeReferrals.length).fill(0)
        result[0] = usersBeforeReferrals[0]
        for (var i = 0; i < usersBeforeReferrals.length - 1; i++) {
            result[i + 1] = usersBeforeReferrals[i + 1] + (result[i] * userAcquisitionPerCurrentUsers)
        }
        setUsersAfterCompoundingGrowth(result)
    }
    React.useEffect(updateUsersAfterReferrals, [props.usersAfterRetention, props.finalActivationPercentage])

    return (
        <ReferralForm />
    )
}

export default Referrals