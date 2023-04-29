import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Auth";
import { BizActions } from "../redux/BussinessUser";
import { AdminActions } from "../redux/AdminUser";
import jwt_decode from "jwt-decode";
const useLoggedIn = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            let isBizFlag = false;
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
            // console.log('data = ' + JSON.stringify(data));
            const isBizFromData = ((stringTxt.split('biz')[1]).split(',')[0]).split(':')[1];
            let isAdminFromData = stringTxt.split('isAdmin":');
            let isAdminFlag = isAdminFromData[1].substring(0, isAdminFromData[1].length - 1);

            // convert string to boolean
            isBizFlag = (String(isBizFromData).toLowerCase() === 'true');
            isAdminFlag = (String(isAdminFlag).toLowerCase() === 'true');

            // update redux about user isBiz flag 
            isBizFlag ? dispatch(BizActions.setToBussiness(isBizFlag)) : dispatch(BizActions.setToNotBussiness(isBizFlag));

            // update redux about user isAdmin flag 
            isAdminFlag ? dispatch(AdminActions.setToAdmin(isAdminFlag)) : dispatch(AdminActions.setToNotAdmin(isAdminFlag));

            return data;
        } catch (err) {
            //server error
            //invalid token
            console.log('error from useLoggedIn ' + err.message);
        }
    };
};

export default useLoggedIn;
