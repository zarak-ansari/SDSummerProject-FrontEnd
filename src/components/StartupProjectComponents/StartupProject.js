import React from "react"
import Accordion from 'react-bootstrap/Accordion';
import AcquisitionElements from "./AcquisitionElements"
import Activation from "./Activation"
import Chart from "./Chart"
import Retention from "./Retention"
import Referrals from "./Referrals"
import Monetization from "./Monetization";
import { Typography } from "@mui/material";

export default function StartupProject(props) {
    //const numberOfPeriods = props.numberOfPeriods
    const numberOfPeriods = props.project.numberOfPeriods
    const [acquisitions, setAcquisitions] = React.useState(Array(numberOfPeriods).fill(0))
    const [acquisitionsCost, setAcquisitionsCost] = React.useState(Array(numberOfPeriods).fill(0))
    const [finalActivationPercentage, setFinalActivationPercentage] = React.useState(1.0)
    const [usersAfterActivation, setUsersAfterActivation] = React.useState(Array(numberOfPeriods).fill(0))
    const [retentionCurve, setRetentionCurve] = React.useState(props.project.retentionCurve || Array(numberOfPeriods).fill(0))
    const [totalUsersRetained, setTotalUsersRetained] = React.useState(Array(numberOfPeriods).fill(0))
    const [userAcquisitionAfterReferrals, setUserAcquisitionAfterReferrals] = React.useState(Array(numberOfPeriods).fill(0))
    const [usersRetainedAfterReferrals, setUsersRetainedAfterReferrals] = React.useState(Array(numberOfPeriods).fill(0))
    const [costOfReferrals, setCostOfReferrals] = React.useState(Array(numberOfPeriods).fill(0))
    const [totalRevenue, setTotalRevenue] = React.useState(Array(numberOfPeriods).fill(0))

    function calculateCumulativeData(inputArray) {
        var runningTotal = 0
        let result = []
        for (var i = 0; i < inputArray.length; i++) {
            runningTotal += inputArray[i]
            result.push(runningTotal)
        }
        return result
    }


    return (
        <>
            <Typography variant="h3">{props.project.name}</Typography>
            <Typography variant="body1">{props.project.description}</Typography>
            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Acquisition</Accordion.Header>
                <Accordion.Body>
                    <AcquisitionElements
                        numberOfPeriods={numberOfPeriods}
                        projectId={props.project.id}
                        acquisitionElements={props.project.acquisitionElements}
                        setAcquisitionsData={setAcquisitions}
                        setAcquisitionsCost={setAcquisitionsCost}
                    />
                    <Chart heading="Acquisitions" data={acquisitions} />
                    <Chart heading="Acquisitions Cost" data={acquisitionsCost} />
                    <Chart heading="Cumulative Acquisitions" data={calculateCumulativeData(acquisitions)} />
                    {/* <p>{JSON.stringify(calculateCumulativeData(acquisitions))}</p> */}
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Activation</Accordion.Header>
                <Accordion.Body>
                    <Activation
                        acquisitions={acquisitions}
                        projectId={props.project.id}
                        activationElements={props.project.activationElements}
                        setUsersAfterActivation={setUsersAfterActivation}
                        finalActivationPercentage={finalActivationPercentage}
                        setFinalActivationPercentage={setFinalActivationPercentage}
                    />
                    <Chart heading="Users Activated" data={usersAfterActivation} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Retention</Accordion.Header>
                <Accordion.Body>
                    <Retention
                        projectId={props.project.id}
                        retentionCurve={retentionCurve}
                        numberOfPeriods={numberOfPeriods}
                        setRetentionCurve={setRetentionCurve}
                        activatedUsers={usersAfterActivation}
                        setRetainedUsers={setTotalUsersRetained}
                    />
                    <Chart heading="Cumulative Users Retained" data={totalUsersRetained} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Referrals</Accordion.Header>
                <Accordion.Body>
                    <Referrals
                        projectId={props.project.id}
                        referrals={props.project.referrals}
                        acquisitionsBeforeReferrals={acquisitions}
                        retentionCurve={retentionCurve}
                        finalActivationPercentage={finalActivationPercentage}
                        userAcquisitionAfterReferrals={userAcquisitionAfterReferrals}
                        setUserAcquisitionAfterReferrals={setUserAcquisitionAfterReferrals}
                        setUsersRetainedAfterReferrals={setUsersRetainedAfterReferrals}
                        setCostOfReferrals={setCostOfReferrals}
                    />
                    <Chart heading="Users Acquisition After Referrals" data={userAcquisitionAfterReferrals} />
                    <Chart heading="Cumulative Users Retained After Referrals" data={usersRetainedAfterReferrals} />

                </Accordion.Body>
            </Accordion.Item></Accordion>

            <Accordion><Accordion.Item eventKey="0">
                <Accordion.Header>Monetization</Accordion.Header>
                <Accordion.Body>
                    <Monetization
                        projectId={props.project.id}
                        monetization={props.project.monetization}
                        setTotalRevenue={setTotalRevenue}
                        usersAfterCompoundingGrowth={usersRetainedAfterReferrals}
                    />
                    <Chart heading="Revenue" data={totalRevenue} />
                    <Chart heading="Customer Acquisition Costs" data={acquisitionsCost.map((cost, index) => cost + costOfReferrals[index])} />
                </Accordion.Body>
            </Accordion.Item></Accordion>

        </>
    )
}