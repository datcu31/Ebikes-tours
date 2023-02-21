import { useContext, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);

        let url;

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkhur5kSpdDhsA7RtAjpWa67brZhpOkzQ';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkhur5kSpdDhsA7RtAjpWa67brZhpOkzQ';
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnedSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setIsLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    let errorMessage = "Authentication has failed!";
                    throw new Error(errorMessage);
                });
            }
        }).then(data => {
            const expirationTime = new Date(new Date().getTime() + (3600 * 1000));
            console.log(expirationTime)
            authCtx.login(data.idToken, expirationTime.toISOString());
            navigate('/events');
        }).catch(err => {
            alert(err.message);
        });


    };



    return (
        <section className={classes.form}>
            <h1>{isLogin ? 'Login' : 'Sing Up'}</h1>
            <Form onSubmit={submitHandler}>
                <div>
                    <label>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with an existig account'}
                    </button>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending request...</p>}
                </div>
            </Form>
        </section>
    );
};

export default AuthForm;