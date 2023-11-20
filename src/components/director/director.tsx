import { Fragment } from "react"
import { generateOperatorHeaderCompositeFile } from "@/src/modules/operator/lib/utils";
import { doHealthCheck as operatorHC } from "@/src/modules/operator/lib/healthcheck";
import { generateSkillHeaderCompositeFile } from "@/src/modules/skill/lib/utils";
import { doHealthCheck as skillHC } from "@/src/modules/skill/lib/healthcheck";

interface IDirectorProps {
    children: React.ReactNode
}
const Director: React.FC<IDirectorProps> = (props) => {
    // Operator Healthcheck
    if (process.env.NODE_ENV === 'development') {
        const hc = operatorHC();
        if (hc.ErrorsIcon.length > 0 ) {
            console.log('There is problem with Operator - Icon');
            console.log(hc.ErrorsIcon);
        }
        if (hc.ErrorsRace.length > 0 ) {
            console.log('There is problem with Operator - Race');
            console.log(hc.ErrorsRace);
        }
        if (hc.ErrorsOperators.length > 0 ) {
            console.log('There is problem with Operator - Data');
            console.log(hc.ErrorsOperators);
        }
    }

    // Skill Healthchecks
    if (process.env.NODE_ENV === 'development') {
        const sh_result = skillHC();
        if (sh_result.ErrorsSkill.length > 0) {
            console.log('Skill data error ');
            console.log(sh_result.ErrorsSkill)
        }

        if (sh_result.ErrorsIcon.length > 0) {
            console.log('Skill icon error ');
            console.log(sh_result.ErrorsIcon);
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