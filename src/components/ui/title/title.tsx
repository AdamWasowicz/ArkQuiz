import styles from './title.module.scss';

interface ITitle {
    children: string | JSX.Element | JSX.Element[],
    className?: string
}

const Title: React.FC<ITitle> = (props) => {
    return (
        <h1 className={styles.root + " " + props.className}>{ props.children }</h1>
    )
}

export default Title;