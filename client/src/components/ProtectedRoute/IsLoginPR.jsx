import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const IsLoginPR = ({ element }) => {
  //* logic section
  //It's not good to check through redux because as soon as the page changes the redux is clean
  // Therefore we will accept that the user is not logged in
  // const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  //* html section
  const token = localStorage.getItem("token");
  if (token) {
    return element;
  } else {
    toast.warning("you must login first");
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default IsLoginPR;
