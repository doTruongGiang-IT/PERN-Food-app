import React from 'react';
import {Pie, PieChart, Tooltip, ResponsiveContainer} from 'recharts';

const PieChartStaff = ({data}) => {
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="orangered" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name}:${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={550}>
            <PieChart>
                <Pie dataKey="value" isAnimationActive={false} data={data} cx={780} cy={250} outerRadius={180} fill="orangered" label={renderCustomizedLabel} />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartStaff;
