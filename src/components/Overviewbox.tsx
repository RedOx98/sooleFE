type OverviewBoxType = {
    title: string
    value: string
    background: string
}


const OverviewBox: React.FC<OverviewBoxType> = ({ title, value, background }) => {
    return (
        <>
            {/* BOX */}
            <div className="px-[22px] py-[24px] h-[125px] shrink-0 w-[220px] sm:w-[250px] flex justify-between rounded-[18px] bg-white border-[1px]">

                {/* Box info */}
                <div className="flex flex-col gap-y-2">
                    <p className="font-Manrope-Medium text-sm text-[#808191] leading-[1.2]">
                        {title}
                    </p>
                    <p className="font-Manrope-Bold text-[24px] leading-none">{value}</p>
                </div>

                {/* Chart */}
                <div>
                    <div
                        style={{
                            background
                        }}
                        className="relative w-[60px] h-[60px] rounded-[50%] flex items-center justify-center"
                    >
                        <div className="w-[30px] h-[30px] absolute rounded-[50%] bg-[#ffffff]"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OverviewBox