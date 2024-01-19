import { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { getUser } from "../lib/utils";
import { CusIcon } from "./";
import { currentUser } from "../lib/data";
const CommentInput = ({ setReplyId, replyId, comReply, setComReply,comment, setCommen }) => {
    

    const handleSubmit = () => {
        if (replyId.length) {
            const newComment = {
                senderId: currentUser._id,
                message: comment,
                replyId: replyId
            };
            Alert.alert(`${newComment.message}  reply: ${newComment.replyId}`);
        } else {
            const newComment = {
                senderId: currentUser._id,
                message: comment,
                replyId: ""
            };
            Alert.alert(`${newComment.message}  reply: ${newComment.replyId}`);
        }
    };

    return (
        <View className="py-2 px-3">
            {replyId.length ? (
                <View className="flex-row items-center">
                    <Text className="text-primary capitalize">
                        replying {getUser(replyId).username}...
                    </Text>
                    <CusIcon
                        action={() => setReplyId("")}
                        name="close"
                        size={12}
                        bg="bg-background
                       " hw="h-6 w-6"
                        color="red-500"
                    />
                </View>
            ) : null}
            <View className="flex-row py-2 ">
                <TextInput
                    className=" bg-background rounded-l-sm border-l border-y border-primary flex-1 items-center px-3 py-2"
                    value={comment}
                    onChangeText={text => setComment(text)}
                    placeholder="comment"
                />
                <View className="items-center justify-center rounded-r-sm bg-primary">
                    <CusIcon
                        color="white"
                        name="send"
                        action={() => handleSubmit()}
                    />
                </View>
            </View>
        </View>
    );
};
export default CommentInput;
