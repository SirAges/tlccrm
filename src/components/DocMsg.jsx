import { View, Text } from "react-native";
const DocMsg = ({ message, processText, CusIcon ,documents}) => {
    return (
        <View className="flex-1">
            <View
                className="
                            justify-start                     w-full flex-row
                            items-center"
            >
                <CusIcon name="document" />
                <Text>{processText(documents, 15)}</Text>
            </View>
            <View className="bg-primary px-2 py-3 rounded-md">
                <Text className="text-white">{message}</Text>
            </View>
        </View>
    );
};
export default DocMsg;
