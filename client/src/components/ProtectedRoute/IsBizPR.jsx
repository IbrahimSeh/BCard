import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { useEffect } from "react";
import useBussiness from "../../hooks/useBussiness";

const IsBizPR = ({ element, isBiz }) => {
  //* logic section
  const Bussiness = useBussiness();
  let isBussiness;

  useEffect(() => {
    (async () => {
      isBussiness = await Bussiness();
    })();
  });

  console.log("isBussiness = " + isBussiness);
  //* html section
  const token = localStorage.getItem("token");
  if (token && isBussiness) {
    console.log("in IsBizPR u r login && biz");
    return element;
  } else {
    console.log("in proRoute u r NOt login");
    toast.warning("you must login as Biz first");
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default IsBizPR;
