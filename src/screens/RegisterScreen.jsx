import { View, Text, Image, TextInput } from "react-native";
import { useState, useContext } from "react";
import { registerForm } from "../lib/forms";
import { CusIcon } from "../components";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../redux/auth/authApiSlice";
import { SafeAreaView } from "react-native-safe-area-context";
const RegisterScreen = ({ navigation }) => {
    const [errMsg, setErrMsg] = useState("");

    const [value, setValue] = useState({
        isVerified: false,
        dateJoined: "",
        username: "",
        password: "",
        about: "",
        departments: [],
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
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const [register, { isLoading }] = useRegisterMutation();
    const handleRegister = async () => {
        if (!value.username) return setErrMsg("Please input your username");

        if (!value.password) return setErrMsg("Please input your password");

        if (value.password !== value.cpassword)
            return setErrMsg("Passwords don't match");

        if (
            value.password &&
            value.username &&
            value.password === value.cpassword
        ) {
            try {
                const { data, error } = await register(value);
                console.log("reg" + JSON.stringify(data));
                if (error) return setErrMsg(error.data);

                setValue({ username: "", password: "", className: "" });
                setFocused(false);
                setErrMsg("");
                navigation.navigate("LoginScreen", { username: data });
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

    const handleInputChange = (text, id) => {
        setValue(prev => ({ ...prev, [id]: text }));
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
                            register form
                        </Text>

                        <Text
                            className="text-center text-danger font-medium
                        capitalize"
                        >
                            {errMsg}
                        </Text>
                        {registerForm.map(l => (
                            <View key={l.id} className="space-y-2 px-3">
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
                        <Text
                            onPress={isLoading ? null : handleRegister}
                            className="capitalize text-2xl font-extrabold
                    bg-primary text-white mx-5 rounded-lg px-2 py-2 text-center"
                        >
                            {isLoading ? "Loading..." : "Register"}
                        </Text>
                        <View
                            className="flex-row items-center justify-center
                    space-x-3"
                        >
                            <Text className="capitalize text-title font-medium">
                                already registered?
                            </Text>
                            <Text
                                onPress={() =>
                                    navigation.navigate("LoginScreen")
                                }
                                className="text-primary capitalize font-bold"
                            >
                                Login
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
};
export default RegisterScreen;
