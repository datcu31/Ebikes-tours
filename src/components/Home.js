import { NavLink } from 'react-router-dom';
import coverImg from '../Images/Group.jpg';

import classes from './Home.module.css'

const Home = () => {
    return (
        <div className={classes.main}>
            <div className={classes.background}>
                <img src={coverImg} alt='img cover' />
            </div>
            <div className={classes.txt}>
                <h1>Start your journey today!</h1>
                <NavLink to={"/events"}>Explore</NavLink>
            </div>
        </div>
    );
};

export default Home;