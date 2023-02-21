import { Form, useNavigate } from "react-router-dom";

import classes from './FeedbackForm.module.css';
import useInput from "../Hooks/use-input";

const FeedbackFrom = (props) => {
    const navigate = useNavigate();

    const cancelHandler = () => {
        props.onCancel();
    };

    const isNotEmpty = (value) => value.trim() !== "";

    const {
        value: entredName,
        isValide: nameIsValide,
        hasError: nameHasError,
        valueInputChangeHandler: nameChangeHandler,
        valueInputBlurHandler: nameBlurHandler,
        submit: submitName,
    } = useInput(isNotEmpty);

    const {
        value: entredMessage,
        isValide: messageIsValide,
        hasError: messageHasError,
        valueInputChangeHandler: messageChangeHandler,
        valueInputBlurHandler: messageBlurHandler,
        submit: submitMessage,
    } = useInput(isNotEmpty);

    let formIsValide = false;

    if (nameIsValide && messageIsValide) {
        formIsValide = true;
    }

    const confirmHandler = async (event) => {
        event.preventDefault();

        submitName();
        submitMessage();

        if (!formIsValide) {
            console.log('Form is not valide')
            return;
        }

        await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/testimonials.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    name: entredName,
                    message: entredMessage,
                })
            });

        navigate('/');

    };

    const nameClasses = `${classes.form} ${nameHasError ? classes.invalid : ''}`
    const messageClasses = `${classes.form} ${messageHasError ? classes.invalid : ''}`

    return (
        <Form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <p>
                    <label htmlFor="name">Name</label>
                    <input
                        id='name'
                        type='text'
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        value={entredName} />
                </p>
                {nameHasError && <p>Please enter a name.</p>}
            </div>
            <div className={messageClasses}>
                <p>
                    <label htmlFor="date">Message</label>
                    <textarea
                        id='message'
                        type='text'
                        rows="5"
                        onChange={messageChangeHandler}
                        onBlur={messageBlurHandler}
                        value={entredMessage} />
                </p>
                {messageHasError && <p>Please write a message.</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button >Submit</button>
            </div>
        </Form>

    );
};

export default FeedbackFrom;