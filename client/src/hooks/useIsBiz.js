import axios from "axios";

const IsBussiness = () => {
    return async () => {
        try {
            const response = await axios.get("/users/userInfo");
            return response.data.biz;
        } catch (err) {
            console.log('error from Isbussiness');
        }
    };
};

export default IsBussiness;
