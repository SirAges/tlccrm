import { View, Text } from "react-native";
const ReplyMsg = ({ message, username, CusIcon, sender, currentUser }) => {
    return (
        <View
            className={`${
                sender === currentUser ? "rounded-tr-md " : "rounded-tl-md "
            }  bg-gray-500/10 flex-row `}
        >
            {sender !== currentUser && (
                <View className=" w-3 rounded-tl-md bg-primary" />
            )}
            <View className="flex-1 py-2 px-2 ">
                <Text
                    className="font-semibold text-primary text-md capitalize
                "
                >
                    @{username}
                </Text>
                <Text className="text-body/50 font-semibold">{message}</Text>
            </View>
            {sender === currentUser && (
                <View className=" w-3 rounded-tr-md bg-primary" />
            )}
        </View>
    );
};
export default ReplyMsg;
