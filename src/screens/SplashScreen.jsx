import { View, Text,Image } from "react-native";
const SplashScreen = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <View className="items-center space-y-2">
                <View className="image w-24 h-24 p-1 rounded-full border
                border-primary">
                    <Image
                        className="w-full h-full rounded-full"
                        style={{ resizeMode: "contain" }}
                        source={require("../../assets/images/icon.png")}
                    />
                </View>
                <Text className="uppercase font-extrabold text-primary text-xl">
                    The Lord's chosen (crm)
                </Text>
            </View>
        </View>
    );
};
export default SplashScreen;
