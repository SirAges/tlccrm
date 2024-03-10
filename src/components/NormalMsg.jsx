import { View, Text } from "react-native";
const NormalMsg = ({ message, CusIcon }) => {
    return (
        <View className="">
            <Text className="text-body">{message}</Text>
        </View>
    );
};
export default NormalMsg;
