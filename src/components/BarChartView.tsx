'use client'
import { BusStats } from "@/lib/definitions";

type BarChartTypeProp = {
    busStats: BusStats
}

const BarChart: React.FC<BarChartTypeProp> = ({ busStats }) => {
    const { totalBuses, activeBuses, inactiveBuses } = busStats;

    return (
        <>
            <div className="w-[90vw] sm:w-full max-w-[500px] p-4 shadow-md rounded-md border border-ecobankBlue">
                <h3 className="font-medium">Bus Analytics</h3>

                <div className="grid grid-cols-[1fr,_35px] gap-y-4 gap-x-2 mt-4">
                    <span>Operational Status</span>
                    <span className="text-center">Total</span>


                    {/* Active buses */}
                    <Bar total={totalBuses} value={activeBuses} title="Active" color="#34b233" />
                    <span className="text-center">{activeBuses}</span>

                    {/* Inactive buses */}
                    <Bar total={totalBuses} value={inactiveBuses} title="Inactive" color="#e36e6ef0" />
                    <span className="text-center">{inactiveBuses}</span>
                </div>
            </div>
        </>
    )
}

type BarType = {
    total: number,
    value: number,
    title: string,
    color: string
}
const Bar: React.FC<BarType> = ({ total, value, title, color }) => {
    const width = ((value / total) * 100) + 1;

    return (
        <div className="relative h-[40px] w-full overflow-hidden">
            <div className="absolute inset-y-0 rounded-r-lg" style={{ background: color, width: `${width}%` }}></div>
            <p className="absolute inset-0 z-[10] flex items-center px-5 text-[#374151]">{title}</p>
        </div>
    )
}

export default BarChart