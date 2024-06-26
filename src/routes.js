import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';

import SuperAdminList from './erp/SuperAdminList';
import CustomerList from './erp/CustomerList';
import ManufacturerList from './erp/ManufacturerList';
import CommodityList from './erp/CommodityList';
import EverydaySet from './erp/EverydaySet'
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/superadmins" />, index: true },
        { path: 'superadmins', element: <SuperAdminList /> },
        { path: 'customers', element: <CustomerList /> },
        { path: 'manufacturers', element: <ManufacturerList /> },
        { path: 'commodities', element: <CommodityList /> },
        { path: 'everyday', element: <EverydaySet /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
