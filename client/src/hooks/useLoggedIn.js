import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Auth";
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
            console.log('payload in useLoggedIn = ' + JSON.stringify(payload));
            dispatch(authActions.login(payload));
        } catch (err) {
            console.log('error from useloggedIn');
        }
    };
};

export default useLoggedIn;
