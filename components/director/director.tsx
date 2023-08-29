import { Fragment } from "react"

interface IDirectorProps {
    children: React.ReactNode
}
const Director: React.FC<IDirectorProps> = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default Director;