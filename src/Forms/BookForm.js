import { Form, useNavigate } from "react-router-dom";
import useInput from "../Hooks/use-input";

import classes from './BookForm.module.css';

const BookForm = ({ id }) => {
    const navigate = useNavigate();
    const eventId = id;

    const cancelHandler = () => {
        navigate(`/${eventId}`);
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
        value: entredDate,
        isValide: dateIsValide,
        hasError: dateHasError,
        valueInputChangeHandler: dateChangeHandler,
        valueInputBlurHandler: dateBlurHandler,
        submit: submitDate,
    } = useInput(isNotEmpty);


    let formIsValide = false;

    if (firstNameIsValide && secondNameIsValide && phoneIsValide && dateIsValide) {
        formIsValide = true;
    }

    const confirmHandler = async (event) => {
        event.preventDefault();

        submitFirstName();
        submitSecondName();
        submitPhone();
        submitDate();

        if (!formIsValide) {
            console.log('Form is not valide')
            return;
        }

        await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/books.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    id: eventId,
                    firstName: entredFirstName,
                    secondName: entredSecondName,
                    phone: entredPhone,
                    date: entredDate,
                })
            });

        navigate('/events');

    };

    const firstNameClasses = `${classes.form} ${firstNameHasError ? classes.invalid : ''}`
    const secondNameClasses = `${classes.form} ${secondNameHasError ? classes.invalid : ''}`
    const phoneClasses = `${classes.form} ${phoneHasError ? classes.invalid : ''}`
    const dateClasses = `${classes.form} ${dateHasError ? classes.invalid : ''}`

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
            <div className={dateClasses}>
                <p>
                    <label htmlFor="date">Date</label>
                    <input
                        id='date'
                        type='date'
                        onChange={dateChangeHandler}
                        onBlur={dateBlurHandler}
                        value={entredDate} />
                </p>
                {dateHasError && <p>Please select a date.</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button>Book</button>
            </div>
        </Form>
    );
};

export default BookForm;

export const action = () => {

};