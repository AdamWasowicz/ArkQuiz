import styles from './button.module.scss';

interface IButton {
    children: JSX.Element | JSX.Element[] | string,
    className?: string,
    onClick: () => void
}

const Button: React.FC<IButton> = (props) => {
    return (
        <button 
            onClick={props.onClick}
            className={styles.root + " " + props.className}
        >
            { props.children }
        </button>
    )
}

export default Button;