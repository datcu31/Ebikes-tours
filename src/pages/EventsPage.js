import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

const EventsPage = () => {
    const events = useLoaderData();

    return(
        <EventsList events={events}/>
    );
};

export default EventsPage;

export const loader = async () => {
    const response = await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/events.json');

    if (!response.ok) {
        throw new Error('Something went wrong!');
    } else {
        const responseData = await response.json();
        const loadedEvents = [];

        for (const key in responseData) {
            loadedEvents.push({
                id: key,
                description: responseData[key].description,
                img: responseData[key].img,
                title: responseData[key].title
            })
        }

        return loadedEvents;
    };
};

