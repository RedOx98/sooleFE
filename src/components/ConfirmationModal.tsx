import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

type ConfirmationModalType = {
    title: string,
    desc: string
    next: () => void
    cancel?: () => void
    nextButtonText: string
    reverse?: boolean
    svg: string | StaticImport
}

const ConfirmationModal: React.FC<ConfirmationModalType> = ({ title, desc, next, cancel, nextButtonText, reverse, svg }) => {

    return (
        <>
            <div className="flex items-center justify-center p-9">
                <div className="flex flex-col items-center justify-center gap-y-5 ">
                    <div>
                        <h1 className="font-Gilroy-Medium text-xl capitalize">{title}</h1>
                    </div>

                    {/* SVG */}
                    <div>
                        <Image src={svg} height={245} width={245} alt="Image" />
                    </div>

                    {/* Description */}
                    <div className="text-gray-500 font-Inter-Regular">{desc}</div>

                    {/* CTA */}
                    <div className="flex items-center w-[75vw] max-w-[320px] mx-auto justify-between">
                        <button onClick={next} className={`"bg-white border ${reverse ? "border-red-500 text-red-500" : "border-ecobankBlue text-ecobankBlue"}  hover:px-12 hover:py-2 font-bold px-8 py-2 rounded`}>
                            {nextButtonText}
                        </button>
                        <button onClick={cancel} className="bg-ecobankBlue hover:px-12 hover:py-2 text-white font-bold px-8 py-2 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal