import styles from './navigation.module.scss';
import Link from 'next/link';

const Navigation: React.FC = () => {
    
    return (
        <nav className={styles.navigation}>
            <Link className={styles.logo} href='/'><h1>Arkquiz</h1></Link>
        </nav>
    )
}

export default Navigation;