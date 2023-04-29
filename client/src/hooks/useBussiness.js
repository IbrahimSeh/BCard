import axios from "axios";
import { useDispatch } from "react-redux";
import { BizActions } from "../redux/BussinessUser";
const useBussiness = () => {
    const dispatch = useDispatch();
    return async () => {
        try {
            let isBizFlag = false;
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const { data } = await axios.get("/users/userInfo");


            //convert object Json to string
            let stringTxt = "";
            for (let index = 0; index < JSON.stringify(data).length; index++) {
                stringTxt += JSON.stringify(data)[index];
            }
            // console.log('data = ' + JSON.stringify(data));
            const isBizFromData = ((stringTxt.split('biz')[1]).split(',')[0]).split(':')[1];


            // convert string to boolean
            isBizFlag = (String(isBizFromData).toLowerCase() === 'true');

            // update redux about user isBiz flag 
            isBizFlag ? dispatch(BizActions.setToBussiness(isBizFlag)) : dispatch(BizActions.setToNotBussiness(isBizFlag));

            return isBizFlag;
        } catch (err) {
            //server error
            //invalid token
            console.log('error from useBussiness ' + err.message);
        }
    };
};

export default useBussiness;
