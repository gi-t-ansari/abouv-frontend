import { Navigate } from "react-router";

import { useLocation } from "react-router-dom";

const requireAuth = (Component, roles = []) => {
  function AuthHoc(props) {
    const { isAuthenticated } = useSelector(userSelector);
    const location = useLocation();

    console.log(roles);

    // console.log(isAuthenticated);
    // const isAuth = true;
    return isAuthenticated ? (
      <Layout Sidebar={Sidebar}>
        <Component {...props} />
      </Layout>
    ) : (
      <Navigate
        to={`${URLS.LOGIN}${
          location.pathname !== "/logout" ? `?url=${location.pathname}` : ""
        }`}
      />
    );
  }

  return <AuthHoc />;
};
export default requireAuth;
