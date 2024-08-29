import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage.tsx';
import ResultPage from '../pages/ResultPage.tsx';
import DetailPage from '../pages/DetailPage.tsx';

const Router = createBrowserRouter([
    {
        path: '/',
        // eslint-disable-next-line react/react-in-jsx-scope
        element: <HomePage />,
    },
    {
        path: '/result',
        // eslint-disable-next-line react/react-in-jsx-scope
        element: <ResultPage />,
    },
    {
        path: '/detail',
        // eslint-disable-next-line react/react-in-jsx-scope
        element: <DetailPage />,
    }
]);

export default Router;