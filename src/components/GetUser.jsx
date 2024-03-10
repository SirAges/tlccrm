import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../hooks/GlobalContext";

const GetUser = ({ id, key }) => {
    const { getUser } = useContext(GlobalContext);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUser(id);
                if (res && res !== undefined) {
                    setResult(res[key]);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData();

        // Clean up useEffect
        return () => setResult(null);
    }, [id, key, getUser]);

    if (Array.isArray(result)) {
        return result[0];
    }
    return result;
};

export default GetUser;