import { useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import { getUser } from "../lib/utils";
import { CusIcon } from "./";
const CommentList = ({
    c,
    feedId,
    replyId,
    setReplyId,
    comReply,
    setComReply,
    popup,
    setPopup,
    cid,
    setCid,
    navigation,
    comment,
    setComment,
    popupRef
}) => {
    const handleCommentMenu = id => {
        setCid(cid === id ? "" : id);
    };
    const handleReply = (com, sen) => {
        if (com && sen) {
            setComReply(com);
            setReplyId(sen);
        }
    };
    const handleEdit = () => {
        setComment(c.message);
        setCid("");
    };
    const handleDelete = () => {};
    return (
        <View className="flex-row py-2 px-3  flex-1 space-x-2 items-center">
            <TouchableWithoutFeedback
                onPress={() =>
                    navigation.navigate("ProfileScreen", { userId: c.senderId })
                }
            >
                <View className="h-8 w-8">
                    <Image
                        className="w-full h-full rounded-full"
                        style={{ resizeMode: "cover" }}
                        source={getUser(c.senderId).image}
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
                onLongPress={() => handleReply(c._id, c.senderId)}
                className="flex-1  space-y-0.5"
            >
                <Text className="text-title font-semibold">
                    {getUser(c.senderId).username}
                </Text>
                {c.reply.length && (
                    <Text className="px-1 text-primary font-semibold">
                        @{getUser(c.reply).username}
                    </Text>
                )}

                <Text className="px-2">{c.message}</Text>
            </TouchableOpacity>
            <View>
                {comReply === c._id && replyId === c.senderId ? (
                    <Text className="text-body text-[10px]">
                        replying... {getUser(replyId).username}
                    </Text>
                ) : null}
            </View>
            <View className="relative">
                {c._id === cid && (
                    <TouchableOpacity ref={popupRef} className="absolute w-24 px-2 py-1 right-7 bg-white shadow-md shadow-black rounded-lg space-y-2">
                        <Text
                            onPress={() => handleEdit()}
                            className="font-semibold"
                        >
                            Edit
                        </Text>
                        <Text
                            onPress={() => handleDelete()}
                            className="font-semibold"
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    className="px-2 py-1"
                    onPress={() => handleCommentMenu(c._id)}
                >
                    <CusIcon m="" name="ellipsis-vertical" size={15} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CommentList;
