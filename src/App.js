import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import DetailPage, { loader as eventDetailLoader } from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import EventsPage from './pages/EventsPage';
import RootLayout from './pages/Root';
import TestimonialsPage from './pages/TestimonialsPage';
import { loader as eventsLoader } from './pages/EventsPage';
import FormPage, { loader as formLoader } from './pages/FormPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/Ebikes-tours',
    element: <Navigate to={'/'} />,
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'events',
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: ':eventId',
        element: <DetailPage />,
        loader: eventDetailLoader
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'testimonials',
        element: <TestimonialsPage />
      },
      {
        path: 'form/:eventId',
        element: <FormPage />,
        loader: formLoader
      },
      {
        path: 'authentication',
        element: <AuthPage />
      }
    ]
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
