import { View, Text } from "react-native";
const NormalMsg = ({ message, CusIcon }) => {
    return (
        <View className="flex-1 flex-row items-center min-h-[40px]">
            <Text className="text-title">{message}</Text>
        </View>
    );
};
export default NormalMsg;
