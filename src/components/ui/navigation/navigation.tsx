import Title from '../title/title';
import styles from './navigation.module.scss';
import Link from 'next/link';

const Navigation: React.FC = () => {
    
    return (
        <nav className={styles.navigation}>
            <div className={styles.content}>
                <Link className={styles.logo} href='/'>
                    <Title className={styles.logoHover}>
                        Arkquiz
                    </Title>
                </Link>

                <div className={styles.links}>
                    <Link className={styles.link} href='/operator'>Operator</Link>
                    <Link className={styles.link} href='/skill'>Skill</Link>
                    <Link className={styles.link} href='/talent'>Talent</Link>
                </div>
            </div>  
        </nav>
    )
}

export default Navigation;