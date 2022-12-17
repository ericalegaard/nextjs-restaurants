import { useState } from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
    // (1) variable that holds the state, (2) variable that sets the state:
    const [isMenuVisible, setMenuVisible] = useState(false);
    return <header className={styles.header}>
        <Container>
            <Link href="/">
                <Image 
                    src="/images/syracuse-restaurants-logo.svg" 
                    alt="Syracuse Restaurants Logo" 
                    width={537} 
                    height={86} 
                    className={styles.logo} 
                />
            </Link>
        </Container>
    </header>
}
export default Header