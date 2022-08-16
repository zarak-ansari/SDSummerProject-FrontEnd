import { Paper, Typography } from "@mui/material"
import React from "react"
import { LineChart, Line, CartesianGrid, YAxis } from "recharts"

export default function Chart(props) {
    const data = props.data

    return (
        <Paper sx={{ margin: 2 }}>
            <Typography variant="h4">{props.heading}</Typography>
            <LineChart width={1000} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey={(x) => x} />
                <Line type="monotone" stroke="#8884d8" dataKey={x => x} />
            </LineChart>
        </Paper>
    )
}