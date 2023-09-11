import { Fragment } from "react"
import { doHealthCheck } from "@/src/resources/operator/lib/utils"

interface IDirectorProps {
    children: React.ReactNode
}
const Director: React.FC<IDirectorProps> = (props) => {
    // Operator Healthcheck
    if (process.env.NODE_ENV === 'development') {
        const hc = doHealthCheck();
        if (hc.errorsOperatorIcon.length > 0 ) {
            console.log('There is problem with Operator - Icon');
            console.log(hc.errorsOperatorIcon);
        }
        if (hc.errorsOperatorRace.length > 0 ) {
            console.log('There is problem with Operator - Race');
            console.log(hc.errorsOperatorRace);
        }
        if (hc.errorsOperators.length > 0 ) {
            console.log('There is problem with Operator - Data');
            console.log(hc.errorsOperators);
        }
    }
    
    
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default Director;