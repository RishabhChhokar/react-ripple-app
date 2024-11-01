/* eslint-disable react/prop-types */
import MainNavigation from "./MainNavigation";

const Layout = ({children}) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
