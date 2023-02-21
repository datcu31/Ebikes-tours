import { useState } from "react";
import FeedbackContent from "../components/FeedbackContent";
import PageContent from "../components/PageContent";
import FeedbackFrom from "../Forms/FeedbackForm";

const TestimonialsPage = () => {
    const [feedbackActive, setFeedbackActive] = useState(false);

    const feedbackActiveHandler = () => {
        setFeedbackActive(true);
    }

    const feedbackHideHandler = () => { 
        setFeedbackActive(false);
    };

    return (
        <PageContent>
            {!feedbackActive && <button onClick={feedbackActiveHandler}>Share your experience</button>}
            {feedbackActive && <FeedbackFrom onCancel={feedbackHideHandler} />}
            <FeedbackContent />
        </PageContent>
    );
};

export default TestimonialsPage;