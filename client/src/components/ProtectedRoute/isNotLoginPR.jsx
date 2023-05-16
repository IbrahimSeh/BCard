import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { useEffect } from "react";

const IsNotLoginPR = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  //* html section
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return element;
    } else {
      toast.warning("Sorry! ,you allready logged in");
      navigate(-1);
    }
  }, [element, navigate, token]);
};
export default IsNotLoginPR;
