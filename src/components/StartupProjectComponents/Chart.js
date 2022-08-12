import React from "react"
import { LineChart, Line, CartesianGrid, YAxis } from "recharts"

export default function Chart(props) {
    const data = props.data

    return (
        <LineChart width={1000} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey={(x) => x} />
            <Line type="monotone" stroke="#8884d8" dataKey={x => x} />
        </LineChart>
    )
}