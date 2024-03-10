import { View, Text } from "react-native";
const AudioMsg = ({ message, documents, CusIcon }) => {
    return (
        <View className="flex-1">
            <View className="flex-row items-center justify-between">
                <CusIcon action={() => null} name="mic" />
                <Text>Record</Text>
                <CusIcon action={() => null} name="play" />
            </View>
            <View className="bg-primary px-2 py-3 rounded-md">
                <Text className="text-white">{message}</Text>
            </View>
        </View>
    );
};
export default AudioMsg;
