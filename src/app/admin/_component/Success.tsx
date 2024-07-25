
type SuccessProp = {
    message: string
}

const Success: React.FC<SuccessProp> = ({message}) => {
  return (
    <div>{message}</div>
  )
}

export default Success