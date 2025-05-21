import { Outlet } from 'react-router-dom';
import { GAListener } from './GAListener';

const Layout = () => (
    <>
        <GAListener />
        <Outlet />
    </>
);

export default Layout;