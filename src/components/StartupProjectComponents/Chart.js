import { Paper, Typography } from "@mui/material"
import React from "react"
import { LineChart, Line, CartesianGrid, YAxis, ResponsiveContainer, XAxis, Tooltip } from "recharts"

export default function Chart(props) {
    const chartData = []
    props.data.map((element, index) => chartData.push({ period: index, [props.heading]: element }))

    return (
        <Paper sx={{ margin: 2, padding: 5 }}>
            <Typography variant="h5" >{props.heading}</Typography>
            <ResponsiveContainer width="90%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <XAxis dataKey="period" />
                    <Line type="monotone" stroke="#8884d8" dataKey={props.heading} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    )
}