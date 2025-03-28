import { Suspense, lazy } from "react";
// import { CircularProgress } from "../../components";

const LazyLogin = lazy(() => import("./Login"));
const LazyRegister = lazy(() => import("./Register"));

export const Login = (props) => (
  <Suspense fallback={<>Loading ...</>}>
    <LazyLogin {...props} />
  </Suspense>
);

export const Register = (props) => (
  <Suspense fallback={<>Loading ...</>}>
    <LazyRegister {...props} />
  </Suspense>
);
