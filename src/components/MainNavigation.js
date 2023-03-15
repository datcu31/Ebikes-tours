import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const [activeBar, setActiveBar] = useState(false);
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
        setActiveBar(false);
    };

    const barExpansionHandler = () => {
        setActiveBar(!activeBar);
    };

    return (
        <header className={classes.header}>
            {!activeBar && (<button className={classes.button_nav} onClick={barExpansionHandler}>+</button>)}
            {activeBar && (
                <nav className={classes.navbar_mobile} onClick={barExpansionHandler}>
                    <ul className={classes.list}>
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} onClick={barExpansionHandler}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='events' className={({ isActive }) => isActive ? classes.active : undefined} onClick={barExpansionHandler}>
                                Events
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='testimonials' className={({ isActive }) => isActive ? classes.active : undefined} onClick={barExpansionHandler}>
                                Testimonials
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='contact' className={({ isActive }) => isActive ? classes.active : undefined} onClick={barExpansionHandler}>
                                Contact Us
                            </NavLink>
                        </li>
                        {!isLoggedIn && (
                            <li>
                                <NavLink to='authentication' className={({ isActive }) => isActive ? classes.active : undefined} onClick={barExpansionHandler}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <NavLink to='/' onClick={logoutHandler} >
                                Logout
                            </NavLink>
                        )}
                    </ul>
                </nav>
            )}
            <nav className={classes.navbar_web}>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='events' className={({ isActive }) => isActive ? classes.active : undefined} >
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='testimonials' className={({ isActive }) => isActive ? classes.active : undefined} >
                            Testimonials
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='contact' className={({ isActive }) => isActive ? classes.active : undefined} >
                            Contact Us
                        </NavLink>
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <NavLink to='authentication' className={({ isActive }) => isActive ? classes.active : undefined} >
                                Login
                            </NavLink>
                        </li>
                    )}
                    {isLoggedIn && (
                        <NavLink to='/' onClick={logoutHandler} >
                            Logout
                        </NavLink>
                    )}
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;