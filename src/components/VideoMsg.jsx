import { View, Text } from "react-native";
const VideoMsg = ({ message,documents, CusIcon }) => {
    return (
        <View className="flex-1">
            <View
                className="items-center
                         justify-center                        w-full  h-44"
            >
                <CusIcon hw="w-24 h-24 opacity-50" size={80} name="play" />
            </View>
            <View className="bg-primary px-2 py-3 rounded-md">
                <Text className="text-white">{message}</Text>
            </View>
        </View>
    );
};
export default VideoMsg;
