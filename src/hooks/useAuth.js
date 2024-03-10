import "core-js/stable/atob";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    let isAdmin = false;
    let isLeader = false;
    let isPastor = false;
    let isWorker = false;
    let isMember = false;
    let isUser = false;
    let status = "";
    try {
        if (token) {
            const decoded = jwtDecode(token);

            const { id, roles } = decoded;
            isAdmin = roles.includes("admin");
            isLeader = roles.includes("leader");
            isPastor = roles.includes("pastor");
            isWorker = roles.includes("worker");
            isMember = roles.includes("member");
            isUser = roles.includes("user");

            if (isAdmin) status = "Admin";
            if (isPastor) status = "Pastor";
            if (isLeader) status = "Leader";
            if (isWorker) status = "Worker";
            if (isMember) status = "Member";
            if (isUser) status = "User";
            if (id && id !== undefined) {
                return {
                    id,
                    roles,
                    isAdmin,
                    isPastor,
                    isLeader,
                    isWorker,
                    isMember,
                    isUser,
                    status
                };
            }
        }
    } catch (error) {
        console.log("error", error);
    }
    return {
        id: null,
        role:[],
        isAdmin: false,
        isLeader: false,
        isPastor: false,
        isWorker: false,
        isMember: false,
        isUser: false,
        status: ""
    };
};
export default useAuth;
