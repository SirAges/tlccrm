import { useEffect, useState, useRef, useContext } from "react";
import { Text, View } from "react-native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import LoginNavigator from "./src/navigators/LoginNavigator";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./src/redux/auth/authSlice";
import { useRefreshMutation } from "./src/redux/auth/authApiSlice";
import { GlobalContext } from "./src/hooks/GlobalContext";
import { getUser, getLocalStorage, setLocalStorage } from "./src/lib/utils";

const Home = () => {
    const { persist } = useContext(GlobalContext);
    const token = useSelector(selectCurrentToken);
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [effectFinished, setEffectFinished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
        useRefreshMutation();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log("verifying refresh token");
            try {
                setLoading(true);
                await refresh();
                setTrueSuccess(true);
                setEffectFinished(true);
            } catch (err) {
                console.error(err);
                setEffectFinished(true);
            }
        };

        if (!effectFinished) {
            if (persist) {
                if (!token) {
                    verifyRefreshToken();
                } else {
                    content = <DrawerNavigator />;
                }
            } else {
                setEffectFinished(true);
            }
        }
        return () => false;
    }, []);

    let content = null;
    if (effectFinished) {
        if (!token && !persist) {
            content = <LoginNavigator />;
        } else if (token && persist) {
            content = <DrawerNavigator />;
        } else if (token && !persist) {
            content = <DrawerNavigator />;
        } else if (!token && persist) {
            content = <LoginNavigator />;
        } else if (isError) {
            content = <LoginNavigator />;
        } else if ((isSuccess && trueSuccess) || (token && isUninitialized)) {
            content = <DrawerNavigator />;
        } else if (loading) {
            content = (
                <View className="flex-1 items-center justify-center bg-gray-400 w-full h-full">
                    <Text className="h-fit text-center text-white">
                        loading...
                    </Text>
                </View>
            );
        } else {
            content = (
                <View
                    className="flex-1 items-center justify-center bg-gray-400
                w-screen h-screen"
                >
                    <Text className="h-fit text-center text-white">
                        please wait...
                    </Text>
                </View>
            );
        }
    }
    return content;
};

export default Home;
