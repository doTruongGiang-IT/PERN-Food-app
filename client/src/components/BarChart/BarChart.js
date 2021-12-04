import React from 'react';
import {BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';

const BarChartComponent = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <ResponsiveContainer width="100%" height={450}>
                <BarChart data={props.dataIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales - USD" fill="#8884d8" />
                    <Bar dataKey="profits - USD" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
})

export default BarChartComponent;
