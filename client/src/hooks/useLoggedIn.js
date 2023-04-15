import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";
import jwt_decode from "jwt-decode";


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
            console.log('payload = ' + JSON.stringify(payload));
            dispatch(authActions.login(payload));
        } catch (err) {
            //server error
            //invalid token
        }
    };
};

export default useLoggedIn;