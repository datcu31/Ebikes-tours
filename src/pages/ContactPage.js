import { useState } from "react";
import ContactInfo from "../components/ContactInfo";
import PageContent from "../components/PageContent";
import ContactForm from "../Forms/ContactForm";

const ContactPage = () => {
    const [messageActive, setMessageActive] = useState(false);

    const messageActiveHandler = () => {
        setMessageActive(true);
    };

    const messageDisableHandler = () => { 
        setMessageActive(false);
    };

    return (
        <PageContent >
            <ContactInfo />
            {!messageActive && <button onClick={messageActiveHandler}>Send us a message</button>}
            {messageActive && <ContactForm onCancel={messageDisableHandler}/>}
        </PageContent>
    );
};

export default ContactPage;