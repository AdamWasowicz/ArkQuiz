import { ReactNode } from 'react';
import styles from './pageLayout.module.scss';

interface IPageLayout {
    children: JSX.Element | JSX.Element[] | ReactNode,
    className?: string
}

const PageLayout: React.FC<IPageLayout> = (props) => {
    return (
        <div className={styles.root + " " + props.className}>
            { props.children }
        </div>
    )
}

export default PageLayout;