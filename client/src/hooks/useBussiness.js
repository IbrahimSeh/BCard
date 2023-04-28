import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const IsBussiness = () => {

    const isLoggedIn = useSelector(
        (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {

            axios
                .get("/users/userInfo")
                .then(({ data }) => {
                    console.log('data.biz = ' + data.biz);
                    // return data.biz;
                })
                .catch((err) => {
                    console.log("err from get user info navbar", err.message);

                });
        }
    });

};

export default IsBussiness;
