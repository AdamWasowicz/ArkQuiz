import styles from './subHeader.module.scss';

interface ISubHeader {
    children: JSX.Element | JSX.Element[] | string,
    className?: string
}

const SubHeader: React.FC<ISubHeader> = (props) => {
    return (
        <h3 className={styles.root + " " + props.className}>
            { props.children }
        </h3>
    )
}

export default SubHeader;