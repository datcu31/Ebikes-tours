import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent"

const ErrorPage = () => {
    let message = 'Something went wrong! Press Home to go back on the Home Page.';
    
    return (
        <>
            <MainNavigation />
            <PageContent>
                <p>{message}</p>
            </PageContent>
        </>
    );
};

export default ErrorPage;