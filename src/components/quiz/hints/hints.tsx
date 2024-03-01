import { useState } from 'react';
import styles from './hints.module.scss';
import Button from '../../ui/button/button';


interface IHints {
    requiredNumberForHints: number,
    currentNumberForHints: number,
    hints: {
        buttonLabel: string,
        hintText: string
    }[] | undefined,
    isLoading: boolean,
    onLoadData: () => void,
}

const Hints: React.FC<IHints> = (props) => {
    const [text, setText] = useState<string>('');
    const [showHints, setShowHints] = useState<boolean>(false);
    const [currentHintId, setCurrentHintId] = useState<number>(-1);

    // Toggle visibility or change current hint text
    const onHintClick = (id: number) => {
        if (props.hints === undefined) {
            return;
        }

        setCurrentHintId(id !== currentHintId ? id : -1);

        if (text === '') {
            setText(props.hints[id].hintText);
        }
        else {
            const newText = props.hints[id].hintText;
            text === newText
                ? setText('')
                : setText(newText);
        }
    }

    // Load hints
    const onButtonClick = () => {
        if (props.hints === undefined) {
            props.onLoadData();
        }
        setShowHints(true);
    }

    return (
        <div className={styles.root}>
            {
                props.currentNumberForHints < props.requiredNumberForHints && 
                showHints == false &&
                <h3 className={styles.information}>
                    After {props.requiredNumberForHints - props.currentNumberForHints} guesses you will be able to see hints
                </h3>
            }

            {
                props.currentNumberForHints >= props.requiredNumberForHints && 
                showHints == false &&
                <Button className={styles.button} onClick={onButtonClick}>
                    Show hints
                </Button>
            }

            {
                props.isLoading === false &&
                props.currentNumberForHints >= props.requiredNumberForHints &&
                showHints === true &&
                <div className={styles.hintsContainer}>
                    {
                        props.hints!.map((hint, key) => 
                            <button 
                                className={currentHintId === key ?styles.current : ''} 
                                key={key} 
                                onClick={() => onHintClick(key)}
                            >
                                {hint.buttonLabel}
                            </button>
                        )
                    }
                </div>
            }

            {
                props.isLoading === true &&
                props.currentNumberForHints >= props.requiredNumberForHints &&
                showHints === true &&
                <h3 className={styles.loading}>Loading hints...</h3>
            }

            {
                text != "" &&
                <div className={styles.hintText}>{text}</div>
            }
        </div>
    )
}

export default Hints;