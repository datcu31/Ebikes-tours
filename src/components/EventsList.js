import { Link } from 'react-router-dom';
import classes from './EventsList.module.css';

// const DUMMY_EVENTS = [
//     {
//         id: "1",
//         img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//         title: 'Prague Meetup',
//         description: 'Some text',
//     },
//     {
//         id: "2",
//         img: 'https://images.unsplash.com/photo-1606126210582-3a17753188b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//         title: 'Berlin Meetup',
//         description: 'Some text',
//     }
// ];

const EventsList = ({events}) => {
    return (
        <div className={classes.events}>
            <h1>- Our Events -</h1>
            <ul className={classes.list}>
                {events.map((event) => (
                    <li key={event.id} className={classes.item}>
                        <Link to={`/${event.id}`}>
                            <div className={classes.pic}><img src={event.img} alt="img" /></div>
                            <div className={classes.content}>
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;

