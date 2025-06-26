import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { useState, useEffect } from 'react';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded-md shadow-lg">
                <p className="font-medium text-xs">{`${label}`}</p>
                <p className="text-xs text-gray-600">{`Credits Used: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const UsageHistory = () => {
    const [interval, setInterval] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setInterval(6);
            } else if (window.innerWidth < 1024) {
                setInterval(3);
            } else {
                setInterval(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const data = daysInMonth.map((day: Date) => ({
        name: format(day, 'MMM d'),
        credits: 0
    }));

    const jun23Index = data.findIndex((d: {name: string}) => d.name === 'Jun 23');
    if(jun23Index !== -1) {
        data[jun23Index].credits = 1;
    }


    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false}
                    interval={interval}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 0 }} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="credits" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={60} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default UsageHistory; 