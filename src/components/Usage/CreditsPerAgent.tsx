import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [{ name: 'shorcut keys.txt', value: 3 }];
const COLORS = ['#9F7EF1'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-1 rounded-xl shadow-lg border flex items-center justify-center gap-2">
                <p className="text-xs font-medium truncate">{payload[0].name}</p>
                <p className="text-xs">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const CreditsPerAgentChart = () => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={160}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

const CreditsPerAgent = () => {
    return (
         <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Credits used per agent</h2>
            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-around md:h-[350px]">
                <div className="w-full md:w-1/2 h-[350px] md:h-full">
                    <CreditsPerAgentChart />
                </div>
                <div className="w-full md:w-1/3 px-4 pt-4 md:p-0 md:pl-8">
                     <ul className="list-none p-0 m-0">
                        {data.map((entry, index) => (
                            <li key={`item-${index}`} className="flex items-center justify-between text-sm mb-2">
                                <div className="flex items-center">
                                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></span>
                                    <span className="truncate">{entry.name}</span>
                                </div>
                                <span className="font-semibold">{entry.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CreditsPerAgent; 