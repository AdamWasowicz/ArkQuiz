import styles from './header.module.scss';

interface IHeader {
    children: JSX.Element | JSX.Element[] | string,
    className?: string
}

const Header: React.FC<IHeader> = (props) => {
    return (
        <h2 className={styles.root + " " + props.className}>
            { props.children }
        </h2>
    )
}

export default Header;