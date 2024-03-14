import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalStorage, setLocalStorage } from "../lib/utils";
import useAuth from "../hooks/useAuth";
import { useGetUsersQuery } from "../redux/user/userApiSlice";
export const GlobalContext = createContext({});
export const DataProvider = ({ children }) => {
    const { id } = useAuth();

    const [formArray, setFormArray] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        isVerified: false,
        dateJoined: "",
        username: "",
        password: "",
        about: "",
        department: [],
        ministry: "",
        image: [],
        friends: [],
        hiddens: [],
        requests: [],
        cImage: [],
        roles: [],
        geolocation: {
            lat: "",
            lng: ""
        },
        personal: {
            fullname: "",
            email: "",
            phone: "",
            about: "",
            country: "",
            state: "",
            city: "",
            address: "",
            postalCode: "",
            residentCountry: "",
            residentState: "",
            residentCity: "",
            residentAddress: "",
            residentPostalCode: ""
        }
    });
    const [cUid, setCUid] = useState(null);
    const [minId, setMinId] = useState(null);
    const [findUser, setFindUser] = useState({});
    const [value, setValue] = useState({});
    const [file, setFile] = useState([]);
    const [obj, setObj] = useState({});
    const [persist, setPersist] = useState(false);
    const [formsImageViewModal, setFormsImageViewModal] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const { data: users } = useGetUsersQuery("userlist", {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const getUser = (uId, key) => {
        if (users && users !== undefined) {
            const res = users.find(u => u._id === uId);
            const result = res?.[key];
            return Array.isArray(result) ? result[0] : key ? result : res;
        }
    };

    useEffect(() => {
        const getCUser = async () => {
            try {
                if (id) {
                    const res = await users.find(u => u._id === id);

                    if (res) {
                        setCurrentUser(res);
                    }
                    if (id) {
                        setCUid(id);
                    }
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        getCUser();
        return () => false;
    }, [id, users]);
    useEffect(() => {
        const fetchData = async () => {
            const persistedValue = await getLocalStorage("persist");
            if (persistedValue !== null) {
                setPersist(JSON.parse(persistedValue));
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLocalStorage("persist", persist);
    }, [persist]);

    const handleInputChange = (text, id, propertyName) => {
        setValue(prev => {
            if (Array.isArray(prev[id])) {
                return { ...prev, [id]: [...prev[id], text] };
            } else if (typeof prev[id] === "object" && prev[id] !== null) {
                return { ...prev, [id]: { ...prev[id], [propertyName]: text } };
            } else {
                return { ...prev, [id]: text };
            }
        });
        return true;
    };

    const getReceiver = async chatId => {
        const ids = chatId.split("-");
        const hisId = ids[0] === currentUser._id ? ids[1] : ids[0];
        const receiver = await getUser(hisId);
        return receiver;
    };

    return (
        <GlobalContext.Provider
            value={{
                handleInputChange,
                value,
                setValue,
                obj,
                setObj,
                formArray,
                setFormArray,
                currentUser,
                cUid,
                getReceiver,
                persist,
                setPersist,
                file,
                setFile,
                formsImageViewModal,
                setFormsImageViewModal,
                imageIndex,
                setImageIndex,
                minId,
                setMinId,
                getUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
