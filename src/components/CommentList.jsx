import { useState, useRef, useContext } from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import { CusIcon } from "./";
import { GlobalContext } from "../hooks/GlobalContext";
const CommentList = ({
    c,
    feedId,
    replyId,
    setReplyId,
    comReply,
    setComReply,
    handleCommentMenu,
    navigation,
    comment,
    setComment,handleReply
}) => {
    const { getUser } = useContext(GlobalContext);
   

    return (
        <View className="flex-row py-2 px-3 space-x-2 items-start">
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate("ProfileScreen", { userId: c.senderId })
                }
            >
                <View
                    className="p-[1px] h-8 w-8 mx-1 rounded-full border
                border-primary"
                >
                    <Image
                        className="w-full h-full rounded-full"
                        style={{ resizeMode: "cover" }}
                        source={{
                            uri: getUser(c.senderId, "image")
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onLongPress={() => handleReply(c._id, c.senderId)}
            >
                <View className="flex-1  space-y-0.5">
                    <Text
                        className="text-title
                font-semibold"
                    >
                        {getUser(c.senderId, "username")}
                    </Text>
                    {c.replyId && (
                        <Text
                            className="px-1 text-primary
                    font-semibold"
                        >
                            @{getUser(c.replyId, "username")}
                        </Text>
                    )}

                    <Text className="px-2">{c.message}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View>
                {comReply === c._id && replyId === c.senderId ? (
                    <Text className="text-body text-[10px]">replying...</Text>
                ) : null}
            </View>

            <CusIcon
                action={() => handleCommentMenu( c)}
                m=""
                name="ellipsis-vertical"
                size={15}
            />
        </View>
    );
};
export default CommentList;
