import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './EventItem.module.css';

const EventItem = ({ event }) => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <div className={classes.event}>
            <div className={classes.container_top}>
                <h1 className={classes.title}>{event.responseData.title}</h1>
                <img className={classes.pic} src={event.responseData.img} alt="img" />
            </div>
            <div className={classes.container_bottom}>
                {isLoggedIn && (
                <NavLink to={`/form/${event.id}`}>Book Now!</NavLink>
                )}
                {!isLoggedIn && (
                    <>
                    <h3>You have to be logged in to book an event!</h3>
                    <NavLink to='/authentication'>Login</NavLink>
                    </>
                )}
                <p>{event.responseData.description}</p>
            </div>
        </div>
    );
};

export default EventItem;