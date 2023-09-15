import styles from './navigation.module.scss';
import Link from 'next/link';

const Navigation: React.FC = () => {
    
    return (
        <nav className={styles.navigation}>
            <div className={styles.content}>
                <Link className={styles.logo} href='/'><h1>Arkquiz</h1></Link>

                <div className={styles.links}>
                    <Link className={styles.link} href='/operator'>Operator</Link>
                    <Link className={styles.link} href='/skill'>Skill</Link>
                </div>
            </div>  
        </nav>
    )
}

export default Navigation;