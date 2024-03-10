import { View, Text, Image } from "react-native";
const ImageMsg = ({ message, documents,CusIcon }) => {
    return (<View className="flex-1">
        <View className="w-full py-1 h-44">
            <Image
                style={{
                    resizeMode: "cover"
                }}
                className="w-full h-full rounded-md"
                source={require("../../assets/images/ch1.jpg")}
            />
        </View>  
        <View className="bg-primary px-2 py-3 rounded-md">
                <Text className="text-white">{message}</Text>
            </View>
        </View>
    );
};
export default ImageMsg;
