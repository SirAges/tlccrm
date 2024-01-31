import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

export const DataProvider = ({ children }) => {
    const [value, setValue] = useState({});
    const [obj, setObj] = useState({});
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

        console.log(value);
    };

    return (
        <GlobalContext.Provider value={{ handleInputChange, value,
        setValue,obj,setObj }}>
            {children}
        </GlobalContext.Provider>
    );
};
