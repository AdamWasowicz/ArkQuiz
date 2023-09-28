import { Fragment } from "react"
import { generateOperatorHeaderCompositeFile } from "@/src/resources/operator/lib/utils";
import { doHealthCheck as operatorHC } from "@/src/resources/operator/lib/healthcheck";
import { generateSkillHeaderCompositeFile } from "@/src/resources/skill/lib/utils";
import { doHealthCheck as skillHC } from "@/src/resources/skill/lib/healthcheck";

interface IDirectorProps {
    children: React.ReactNode
}
const Director: React.FC<IDirectorProps> = (props) => {
    // Operator Healthcheck
    if (process.env.NODE_ENV === 'development') {
        const hc = operatorHC();
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

    // Skill Healthchecks
    if (process.env.NODE_ENV === 'development') {
        const sh_result = skillHC();
        if (sh_result.errorsSkill.length > 0) {
            console.log('Skill data error ');
            console.log(sh_result.errorsSkill)
        }

        if (sh_result.errorSkillIcon.length > 0) {
            console.log('Skill icon error ');
            console.log(sh_result.errorSkillIcon);
        }
    }

    // Composite files
    generateOperatorHeaderCompositeFile();
    generateSkillHeaderCompositeFile();
    
    
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default Director;