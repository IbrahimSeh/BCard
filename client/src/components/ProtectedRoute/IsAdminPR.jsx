import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import jwt_decode from "jwt-decode";

const IsAdminPR = ({ element }) => {
  //* logic section
  //It's not good to check through redux because as soon as the page changes the redux is clean
  // Therefore we will accept that the user is not logged in
  // const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  //* html section
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const isAdmin =
    String(
      JSON.stringify(decodeToken).split(":")[3].split(",")[0]
    ).toLowerCase() === "true";

  if (isAdmin) {
    return element;
  } else {
    toast.warning("you must login as admin user first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsAdminPR;
