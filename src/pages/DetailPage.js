import { useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const DetailPage = () => {
    const data = useLoaderData();

    return (
        <EventItem event={data} />
    );
};

export default DetailPage;

export const loader = async ({ params }) => {
    const id = params.eventId;

    const response = await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/events/' + id + '.json');

    if (!response.ok) {
        throw new Error('Something went wrong!')
    } else {
        const responseData = await response.json();
        return {
            responseData,
            id
        };
    }
};
