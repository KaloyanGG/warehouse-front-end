import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

export function Logout() {

    const { userLogout } = useContext(UserContext);
    // userLogout();

    return (
        <div>hui</div>
    );

}