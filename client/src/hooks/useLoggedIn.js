import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Auth";
import { BizActions } from "../redux/BussinessUser";
import jwt_decode from "jwt-decode";
const useLoggedIn = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            let flagIsBiz = false;
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const { data } = await axios.get("/users/userInfo");
            const payload = jwt_decode(token);

            // update redux about user isLogin flag
            dispatch(authActions.login(payload));


            //convert object Json to string
            let stringTxt = "";
            for (let index = 0; index < JSON.stringify(data).length; index++) {
                stringTxt += JSON.stringify(data)[index];
            }
            let isBizFromData = ((stringTxt.split('biz')[1]).split(',')[0]).split(':')[1];

            // convert string to boolean
            flagIsBiz = (String(isBizFromData).toLowerCase() === 'true');
            console.log('flagIsBiz = ' + flagIsBiz);

            // console.log('biz = ' + ((stringTxt.split('biz')[1]).split(',')[0]).split(':')[1]);
            // console.log('data from axios.get => ' + JSON.stringify(data));

            // update redux about user isBiz flag
            dispatch(BizActions.setToBussiness(flagIsBiz));
            return data;
        } catch (err) {
            //server error
            //invalid token
            console.log('error from useLoggedIn ' + err.message);
        }
    };
};

export default useLoggedIn;
