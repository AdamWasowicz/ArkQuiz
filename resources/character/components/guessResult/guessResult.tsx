import GuessResultRow from "./guessResultRow";
import { CharacterComparisonResult } from "../../lib/types";

interface IGuessResultProps {
    guesses: CharacterComparisonResult[]
}

const GuessResult: React.FC<IGuessResultProps> = (props) => {
    const { guesses } = props;

    return (
        <table>
            <tbody>
                <tr>
                    <th>Operator</th>
                    <th>Rarity</th>
                    <th>Class</th>
                    <th>Attack Range</th>
                    <th>Position</th>
                    <th>Gender</th>
                    <th>Race</th>
                    <th>Faction</th>
                </tr>

                {
                    guesses.length > 0 &&
                    guesses.map((item, key) => {
                        return <GuessResultRow
                            characterData={item.character}
                            diffrenceArray={item.differences}
                            key={key}
                        />
                    })
                }
            </tbody>
        </table>
    )
}

export default GuessResult;