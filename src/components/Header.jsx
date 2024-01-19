import { View, Text, Image } from "react-native";
import { CusIcon } from "./";
const Header = ({ navigation }) => {
    return (
        <View
            className="flex-row items-center px-3 py-2 w-full
        bg-white  shadow-lg shadow-black"
        >
            <View className="logo flex-row items-center space-x-2 ">
                <View className="h-12 w-12">
                    <Image
                        className="w-full h-full"
                        style={{ resizeMode: "contain" }}
                        source={require("../../assets/images/icon.png")}
                    />
                </View>
                <Text className="text-2xl text-primary font-extrabold uppercase">
                    Tlccrm
                </Text>
            </View>
            <View className="icons flex-row  items-center justify-end flex-1">
                <CusIcon
                    name="search"
                    bg="bg-gray-100"
                    color="primary"
                    m={10}
                    action={null}
                />
                <CusIcon
                    outline="tv-outline"
                    bg="bg-gray-100"
                    color="primary"
                    m={5}
                    action={() => navigation.navigate("LiveScreen")}
                />
                <CusIcon
                    name="menu"
                    bg="bg-gray-100"
                    color="primary"
                    m={10}
                    action={() => navigation.toggleDrawer()}
                />
            </View>
        </View>
    );
};
export default Header;
