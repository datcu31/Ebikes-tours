import { useEffect, useState } from 'react';
import classes from './ContactInfo.module.css';

const ContactInfo = () => {
    const [crew, setCrew] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await fetch('https://ebikes-tours-default-rtdb.firebaseio.com/ContactInfo.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            } else {
                const responseData = await response.json();

                const loadedInfo = [];

                for (const key in responseData) {
                    loadedInfo.push({
                        id: key,
                        name: responseData[key].name,
                        phone: responseData[key].phone,
                        email: responseData[key].email,
                    })
                }
                setCrew(loadedInfo);
                setIsLoading(false);
            }
        };

        fetchInfo();

    }, []);

    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>Loading...</p>
            </section>
        );
    };

    return (
        <div className={classes.members}>
            <h1>- Crew -</h1>
            <ul className={classes.list}>
                {crew.map((member) => (
                    <li key={member.id} className={classes.person}>
                        <div className={classes.content}>
                            <h2>{member.name}</h2>
                            <p>{member.phone}</p>
                            <p>{member.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default ContactInfo;