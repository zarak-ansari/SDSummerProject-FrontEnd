import React from "react"
import UserCategory from './UserCategorySubcomponents/UserCategory';

function StartupProject() {
    const [numberOfPeriods, setNumberOfPeriods] = React.useState(12)
    const [nameOfStartup, setNameOfStartup] = React.useState("")

    return (
        <>
            <form>
                <input type="text" name="nameOfStartup" placeholder="Name of Startup" value={nameOfStartup} onChange={(event) => setNameOfStartup(event.target.value)}></input>
                <input type="number" name="numberOfPeriods" placeholder="Number Of Periods" value={numberOfPeriods} onChange={(event) => setNumberOfPeriods(event.target.value)}></input>
            </form>
            <UserCategory numberOfPeriods={numberOfPeriods} />
        </>
    )




}

export default StartupProject