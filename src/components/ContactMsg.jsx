import { View, Text } from "react-native";
const ContactMsg = ({
    message,documents,
    CusIcon,
    processText,
    handleContact,
    handleDialPress
}) => {
    return (
        <View className="flex-1">
            <View
                className="
                            justify-start                     w-full flex-row
                            items-center"
            >
                <CusIcon name="person" />
                <View>
                    <Text
                        className="font-semibold
                                                        text-primary capitalize"
                    >
                        {handleContact(message)[0]}
                    </Text>
                    <Text
                        onPress={() =>
                            handleDialPress(handleContact(message)[1])
                        }
                    >
                        {handleContact(documents)[1]}
                    </Text>
                </View>
            </View>
            <View className="bg-primary px-2 py-3 rounded-md">
                <Text className="text-white">{message}</Text>
            </View>
        </View>
    );
};
export default ContactMsg;
