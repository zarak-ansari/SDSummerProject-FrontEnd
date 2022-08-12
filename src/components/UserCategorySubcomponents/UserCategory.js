import React from "react"
import Accordion from 'react-bootstrap/Accordion';
import AcquisitionElements from "./AcquisitionElements"
import Activation from "./Activation"
import Chart from "./Chart"
import Retention from "./Retention"
import Referrals from "./Referrals"
import Monetization from "./Monetization";

export default function UserCategory(props) {
    const numberOfPeriods = props.numberOfPeriods
    const [acquisitions, setAcquisitions] = React.useState(Array(numberOfPeriods).fill(0))
    const [acquisitionsCost, setAcquisitionsCost] = React.useState(Array(numberOfPeriods).fill(0))
    const [finalActivationPercentage, setFinalActivationPercentage] = React.useState(1.0)
    const [usersAfterActivation, setUsersAfterActivation] = React.useState(Array(numberOfPeriods).fill(0))
    const [totalUsersRetained, setTotalUsersRetained] = React.useState(Array(numberOfPeriods).fill(0))
    const [usersAfterCompoundingGrowth, setUsersAfterCompoundingGrowth] = React.useState(Array(numberOfPeriods).fill(0))
    const [totalRevenue, setTotalRevenue] = React.useState(Array(numberOfPeriods).fill(0))

    return (
        <>
            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Acquisition</Accordion.Header>
                <Accordion.Body>
                    <AcquisitionElements
                        numberOfPeriods={numberOfPeriods}
                        setAcquisitionsData={setAcquisitions}
                        setAcquisitionsCost={setAcquisitionsCost}
                    />
                    <Chart data={acquisitions} />
                    <Chart data={acquisitionsCost} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Activation</Accordion.Header>
                <Accordion.Body>
                    <Activation
                        acquisitions={acquisitions}
                        setUsersAfterActivation={setUsersAfterActivation}
                        finalActivationPercentage={finalActivationPercentage}
                        setFinalActivationPercentage={setFinalActivationPercentage}
                    />
                    <Chart data={usersAfterActivation} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Retention</Accordion.Header>
                <Accordion.Body>
                    <Retention numberOfPeriods={numberOfPeriods} activatedUsers={usersAfterActivation} setRetainedUsers={setTotalUsersRetained} />
                    <Chart data={totalUsersRetained} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Referrals</Accordion.Header>
                <Accordion.Body>
                    <Referrals
                        usersAfterRetention={totalUsersRetained}
                        finalActivationPercentage={finalActivationPercentage}
                        setUsersAfterCompoundingGrowth={setUsersAfterCompoundingGrowth}
                    />
                    <Chart data={usersAfterCompoundingGrowth} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Monetization</Accordion.Header>
                <Accordion.Body>
                    <Monetization setTotalRevenue={setTotalRevenue} usersAfterCompoundingGrowth={usersAfterCompoundingGrowth} />
                    <Chart data={totalRevenue} />
                    <Chart data={acquisitionsCost} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

        </>
    )
}