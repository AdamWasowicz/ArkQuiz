import styles from './paragraph.module.scss';

interface IParagraph {
    children: JSX.Element | JSX.Element[] | string,
    className?: string
}

const Paragraph: React.FC<IParagraph> = (props) => {
    return (
        <p className={styles.root + " " + props.className}>
            { props.children }
        </p>
    )
}

export default Paragraph;