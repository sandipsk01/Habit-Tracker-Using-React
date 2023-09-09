import styles from "./Navbar.module.css";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <h2>TRACK-IT</h2>
            </div>

            <div className={styles.right}>
                {location.pathname === '/weekly' ? (
                    <Link to="/">
                        <button>Go to Dashboard</button>
                    </Link>
                ) : (
                    <Link to="/weekly">
                        <button>Go to Weekly View</button>
                    </Link>
                )}
            </div>
        </div>
    )
}