import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './EventItem.module.css';

const EventItem = ({ event }) => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <article className={classes.event}>
            <div>
                <h1>- {event.responseData.title} -</h1>
                <img src={event.responseData.img} alt="img" />
            </div>
            <div className={classes.container}>
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
        </article>
    );
};

export default EventItem;