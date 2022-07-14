import Navigation from 'components/Navigation';
import MainLayout from 'layouts/MainLayout';
import ExpandingCards from 'pages/ExpandingCards';
import Home from 'pages/Home';

export const routesDefinition = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Navigation />,
        children: [
          {
            path: 'expanding-cards',
            element: <ExpandingCards />,
          },
        ],
      },
    ],
  },
];
