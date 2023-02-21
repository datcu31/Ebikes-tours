import { useLoaderData } from "react-router-dom";
import BookForm from "../Forms/BookForm";

const FormPage = () => {
    const id = useLoaderData();
    return (
        <BookForm id={id} />
    );
};

export default FormPage;

export const loader = ({ params }) => {
    const id = params.eventId;
    return id;
};
