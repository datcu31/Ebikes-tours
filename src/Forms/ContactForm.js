import { Form, useNavigate } from "react-router-dom";
import useInput from "../Hooks/use-input";

import classes from "./ContactForm.module.css";

const ContactForm = (props) => {
    const navigate = useNavigate();

    const cancelHandler = () => {
        props.onCancel();
    };

    const isNotEmpty = (value) => value.trim() !== "";

    const {
        value: entredFirstName,
        isValide: firstNameIsValide,
        hasError: firstNameHasError,
        valueInputChangeHandler: firstNameChangeHandler,
        valueInputBlurHandler: firstNameBlurHandler,
        submit: submitFirstName,
    } = useInput(isNotEmpty);

    const {
        value: entredSecondName,
        isValide: secondNameIsValide,
        hasError: secondNameHasError,
        valueInputChangeHandler: secondNameChangeHandler,
        valueInputBlurHandler: secondNameBlurHandler,
        submit: submitSecondName,
    } = useInput(isNotEmpty);

    const {
        value: entredPhone,
        isValide: phoneIsValide,
        hasError: phoneHasError,
        valueInputChangeHandler: phoneChangeHandler,
        valueInputBlurHandler: phoneBlurHandler,
        submit: submitPhone,
    } = useInput(value => value.trim().length === 10);

    const {
        value: entredMessage,
        isValide: messageIsValide,
        hasError: messageHasError,
        valueInputChangeHandler: messageChangeHandler,
        valueInputBlurHandler: messageBlurHandler,
        submit: submitMessage,
    } = useInput(isNotEmpty);


    let formIsValide = false;

    if (firstNameIsValide && secondNameIsValide && phoneIsValide && messageIsValide) {
        formIsValide = true;
    }

    const confirmHandler = async (event) => {
        event.preventDefault();

        submitFirstName();
        submitSecondName();
        submitPhone();
        submitMessage();

        if (!formIsValide) {
            console.log('Form is not valide')
            return;
        }

        await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/messages.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    firstName: entredFirstName,
                    secondName: entredSecondName,
                    phone: entredPhone,
                    message: entredMessage,
                })
            });

        navigate('/');

    };

    const firstNameClasses = `${classes.form} ${firstNameHasError ? classes.invalid : ''}`
    const secondNameClasses = `${classes.form} ${secondNameHasError ? classes.invalid : ''}`
    const phoneClasses = `${classes.form} ${phoneHasError ? classes.invalid : ''}`
    const messageClasses = `${classes.form} ${messageHasError ? classes.invalid : ''}`

    return (
        <Form className={classes.form} onSubmit={confirmHandler}>
            <div className={firstNameClasses}>
                <p>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        id='first-name'
                        type='text'
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={entredFirstName} />
                </p>
                {firstNameHasError && <p>Please enter a first name.</p>}
            </div>
            <div className={secondNameClasses}>
                <p>
                    <label htmlFor="second-name">Second Name</label>
                    <input
                        id='second-name'
                        type='text'
                        onChange={secondNameChangeHandler}
                        onBlur={secondNameBlurHandler}
                        value={entredSecondName} />
                </p>
                {secondNameHasError && <p>Please enter a second name.</p>}
            </div>
            <div className={phoneClasses}>
                <p>
                    <label htmlFor="phone">Phone number</label>
                    <input
                        id='phone'
                        type='number'
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        value={entredPhone} />
                </p>
                {phoneHasError && <p>Please enter a number of ten charachters.</p>}
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
                <button >Send</button>
            </div>
        </Form>
    );
};

export default ContactForm;