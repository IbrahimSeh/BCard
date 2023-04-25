import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Auth";
import jwt_decode from "jwt-decode";

import ErrorSnackBar from "../services/ErrorSnackBar";

const useLoggedIn = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            await axios.get("/users/userInfo");
            const payload = jwt_decode(token);
            console.log('payload in useLoggedIn = ' + JSON.stringify(payload));
            dispatch(authActions.login(payload));
        } catch (err) {
            <ErrorSnackBar />
        }
    };
};

export default useLoggedIn;
