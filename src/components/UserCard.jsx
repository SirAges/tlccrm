import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Modal,
    BackHandler
} from "react-native";
import { processText, formatDateTime, roundNumber } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions
} from "../components";

const UserCard = ({ minId, userId, handleOptions }) => {
    const { getUser } = useContext(GlobalContext);
    let content;

    content = (
        <>
            <View className="flex-row items-center">
                <View
                    className="flex-1 flex-row items-center space-x-2
                justify-between
                                    px-2 py-3 bg-white
                          "
                >
                    <View
                        className="w-12 h-12 rounded-full p-0.5 border
                    border-primary"
                    >
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="w-full h-full rounded-full"
                            source={{
                                uri: getUser(userId, "image")
                            }}
                        />
                    </View>
                    <Text className="capitalize font-medium text-primary">
                        {getUser(userId, "username")}
                    </Text>
                    <View className="flex-1 items-end relative">
                        <CusIcon
                            name="ellipsis-vertical"
                            action={() => handleOptions(userId)}
                        />
                    </View>
                </View>
            </View>
            <Separator />
        </>
    );
    return content;
};
export default UserCard;
