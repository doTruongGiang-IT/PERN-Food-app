import React from 'react';
import {AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';

const AreaChartComponent = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <ResponsiveContainer width="100%" height={450}>
                <AreaChart data={props.dataIncome}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="orangered" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="orangered" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sales - USD" stroke="orangered" fillOpacity={1} fill="url(#colorUv)" activeDot={{ r: 8 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
})

export default AreaChartComponent;
