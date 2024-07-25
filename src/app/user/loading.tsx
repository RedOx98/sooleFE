import Skeleton from 'react-loading-skeleton'

const Loading = () => {
    return (
        <div className='max-w-xl text-black'>
            Loading fallback
            <div className="flex flex-col gap-x-3">

                {/* Issue heading */}
                <Skeleton width={"5rem"} />

                {/* Issue date */}
                <Skeleton width={"8rem"} style={{ color: "red", background: "yellow" }} />

                {/* Issue status */}
                <div className='w-max'>
                    <Skeleton width={"3rem"} />
                </div>

                {/* Issue description */}
                {/* <Card className='prose'>
                    <Skeleton width={"24rem"} count={3} />
                </Card> */}
            </div>
        </div>
    )
}

export default Loading