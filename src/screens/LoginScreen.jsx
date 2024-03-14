import { View, Text, Image, TextInput } from "react-native";
import { useState, useContext, useEffect } from "react";
import { loginForm } from "../lib/forms";
import { setLocalStorage } from "../lib/utils";
import { CusIcon } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import { useLoginMutation } from "../redux/auth/authApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const LoginScreen = ({ navigation, route }) => {
    const { persist, setPersist } = useContext(GlobalContext);
    const data = route.params;
    const [value, setValue] = useState({
        username: "Phestplus",
        password: "123456"
    });
    useEffect(() => {
        if (data) {
            setValue(prev => ({ ...prev, username: data.username }));
        }
    }, [data]);

    const [focused, setFocused] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const handleInputChange = (text, id) => {
        setValue(prev => ({ ...prev, [id]: text }));
    };
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const handleLogin = async () => {
        if (!value.username) return setErrMsg("Please input your username");

        if (!value.password) return setErrMsg("Please input your password");

        if (value.password && value.username) {
            try {
                const { data, error } = await login(value);

                if (error) return setErrMsg(error.data);

                setValue({ username: "", password: "" });
                setErrMsg("");
                setFocused(false);
            } catch (err) {
                if (!err.status) {
                    setErrMsg("No Server Response");
                } else if (err.status === 400) {
                    setErrMsg("Missing Username or Password");
                } else if (err.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg(err.data?.message);
                }
            }
        }
    };

    return (
        <View className="flex-1 justify-center items-center  bg-white ">
            <Image
                className=" h-full opacity-70"
                style={{ resizeMode: "cover" }}
                source={require("../../assets/images/p.jpg")}
            />
            <View
                className="absolute w-full mx-3 px-2
            "
            >
                <SafeAreaView className="flex-1">
                    <View
                        className="space-y-4 pt-5 pb-10 rounded-md shadow-sm
                shadow-black bg-white"
                    >
                        <Text
                            className="capitalize text-2xl font-extrabold
                    text-center"
                        >
                            login form
                        </Text>

                        <Text
                            className="text-center text-danger font-medium
                        capitalize"
                        >
                            {errMsg}
                        </Text>
                        {loginForm.map(l => (
                            <View
                            key={l.id}
                            className="space-y-2 px-3">
                                <Text className="font-medium text-md capitalize">
                                    {l.label}
                                </Text>

                                <View
                                    className="px-2 py-2  align-text-top
                                    flex-row items-center
                            bg-background border border-primary/10 rounded-lg"
                                >
                                    <TextInput
                                        className="flex-1"
                                        secureTextEntry={
                                            l.id === "password" ||
                                            l.id === "cpassword"
                                                ? showPassword
                                                : false
                                        }
                                        style={{
                                            textAlignVertical: l.multiline
                                                ? "top"
                                                : null
                                        }}
                                        value={value[l.id]}
                                        placeholder={l.placeholder}
                                        onChangeText={text =>
                                            handleInputChange(
                                                text,
                                                l.id,
                                                l.name
                                            )
                                        }
                                        inputMode={l.type}
                                        multiline={l.multiline}
                                        onBlur={() => {
                                            setFocused(prev => !prev);
                                            value[l.id]?.length
                                                ? (l.focused = true)
                                                : null;
                                        }}
                                        numberOfLines={l.multiline ? 5 : null}
                                    />
                                    {(l.id === "password" ||
                                        l.id === "cpassword") && (
                                        <CusIcon
                                            className="absolute"
                                            hw="h-fit"
                                            action={() =>
                                                setShowPassword(prev => !prev)
                                            }
                                            size={16}
                                            name={
                                                showPassword ? "eye-off" : "eye"
                                            }
                                        />
                                    )}
                                </View>

                                {value[l.id]?.length &&
                                l.focused &&
                                !l.pattern.test(value[l.id]) ? (
                                    <Text className="text-danger">
                                        {l.error}
                                    </Text>
                                ) : null}
                            </View>
                        ))}

                        <View
                            className="flex-row items-center justify-end
                        space-x-2 px-6"
                        >
                            <CusIcon
                                size={16}
                                name={persist ? "shield" : "shield-outline"}
                                hw="."
                                p="."
                            />

                            <Text
                                onPress={() => setPersist(prev => !prev)}
                                className="capitalize font-medium text-xs"
                            >
                                i trust this device {persist}
                            </Text>
                        </View>

                        <Text
                            onPress={isLoading ? null : handleLogin}
                            className="capitalize text-2xl font-extrabold
                    bg-primary text-white mx-5 rounded-lg px-2 py-2 text-center"
                        >
                            {isLoading ? "Loading" : "Login"}
                        </Text>
                        <View
                            className="flex-row items-center justify-center
                    space-x-3"
                        >
                            <Text className="capitalize text-title font-medium">
                                no account?
                            </Text>
                            <Text
                                onPress={() =>
                                    navigation.navigate("RegisterScreen")
                                }
                                className="text-primary capitalize font-bold"
                            >
                                Register
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
};
export default LoginScreen;
