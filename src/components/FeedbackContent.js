import { useEffect, useState } from "react";
import classes from './FeedbackContent.module.css'

const FeedbackContent = () => {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/testimonials.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            } else {
                const responseData = await response.json();

                const loadedContent = [];

                for (const key in responseData) {
                    loadedContent.push({
                        id: key,
                        name: responseData[key].name,
                        message: responseData[key].message,
                    })
                };
                setContent(loadedContent.reverse());
                setIsLoading(false);
            };
        };

        fetchContent();
    }, []);

    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>Loading...</p>
            </section>
        );
    };

    return (
        <div className={classes.feedbacks}>
            <h1>- Testimonials -</h1>
            <ul className={classes.list}>
                {content.map((feedback) => (
                    <li key={feedback.id} className={classes.person}>
                        <div >
                            <h2>{feedback.name}</h2>
                            <p className={classes.message}>{feedback.message}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackContent;