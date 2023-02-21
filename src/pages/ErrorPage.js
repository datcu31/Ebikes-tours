import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent"

const ErrorPage = () => {
    let message = 'Something went wrong!';
    
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