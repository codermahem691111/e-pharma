import { createBrowserRouter } from 'react-router-dom';
import Main from '../MainLayout/Main';
import Inv from '../dashboard/Inv';
import Home from '../home/home';
import Sells from '../dashboard/Sells';
import Medicine from '../dashboard/Medicine';
import Customer from '../dashboard/Customer';
import Stock from '../dashboard/Stock';
import Commerce from '../dashboard/Commerce';
import Transac from '../dashboard/Transac';
import ElderCare from '../dashboard/ElderCare';
import MomBabyCare from '../dashboard/MomBabyCare';
import RareMed from '../dashboard/RareMed';
import Stock2 from '../dashboard/Stock2';
import Stock3 from '../dashboard/Stock3';
import Stock4 from '../dashboard/Stock4';
import Reminder from '../dashboard/Reminder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'inventory',
        element: <Inv />
      },
      {
        path: 'sells',
        element: <Sells />

      },
       {
         path:'medicine',
         element: <Medicine />


         },
         {
          path:'customer',
          element: <Customer />
         },
         {
          path:'stock',
          element: <Stock />
         },
         {
          path: 'commerce',
          element: <Commerce />
        },
        {
          path: 'transaction',
          element: <Transac />
        },
        {
          path: 'eldercare',
          element: <ElderCare />
        },
        {
          path: 'mombabycare',
          element: <MomBabyCare />
        },
        {
          path: 'raremed',
          element: <RareMed />
        },
        {
          path: 'stock2',
          element: <Stock2 />
        },
        {
          path: 'stock3',
          element: <Stock3 />
        },
        {
          path: 'stock4',
          element: <Stock4 />
        },
        {
          path: 'reminder',
          element: <Reminder />
        }

    ]
  }
]);
