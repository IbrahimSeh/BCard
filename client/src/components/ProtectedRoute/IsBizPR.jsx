import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const IsBizPR = ({ element, isBiz, isAdmin }) => {
  const nav = useNavigate();
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const isBussiness = useSelector(
    (bigPieBigState) => bigPieBigState.BussinessSlice.isBussiness
  );
  //* html section

  if (isLoggedIn && isBussiness) {
    console.log("in IsBizPR u r login && biz");
    return element;
  } else {
    console.log("in proRoute u r NOt login");
    toast.warning("you must login as bussiness user first");
    return nav(-1);
  }
};
export default IsBizPR;
