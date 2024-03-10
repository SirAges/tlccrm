import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { CusIcon, Loader } from "./";
import {
    useAddNewMinCommentMutation,
    useUpdateMinCommentMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useAddNewDeptCommentMutation,
    useUpdateDeptCommentMutation
} from "../redux/department/departmentApiSlice";
import {
    useAddNewNewsCommentMutation,
    useUpdateNewsCommentMutation
} from "../redux/news/newsApiSlice";
import {
    useAddNewSermonCommentMutation,
    useUpdateSermonCommentMutation
} from "../redux/sermon/sermonApiSlice";
import {
    useAddNewTestimonyCommentMutation,
    useUpdateTestimonyCommentMutation
} from "../redux/testimony/testimonyApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const CommentInput = ({
    from,
    setReplyId,
    replyId,
    comReply,
    setComReply,
    editting,
    setEditting,
    comment,
    setComment,
    clickedComment,
    setClickedComment,
    minId,
    feedId,
    currentUserId
}) => {
    const { getUser } = useContext(GlobalContext);
    const [addNewComment] =
        from === "ministry"
            ? useAddNewMinCommentMutation()
            : from === "news"
            ? useAddNewNewsCommentMutation()
            : from === "sermon"
            ? useAddNewSermonCommentMutation()
            : from === "testimony"
            ? useAddNewTestimonyCommentMutation()
            : useAddNewDeptCommentMutation();
    const [updateComment] =
        from === "ministry"
            ? useUpdateMinCommentMutation()
            : from === "news"
            ? useUpdateNewsCommentMutation()
            : from === "sermon"
            ? useUpdateSermonCommentMutation()
            : from === "testimony"
            ? useUpdateTestimonyCommentMutation()
            : useUpdateDeptCommentMutation();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!comment) {
            Alert.alert(
                "comment is empty",
                "please ensure you have written your comment before sending"
            );
            return;
        }
        if (comment) {
            try {
                setLoading(true);
                const newComment = {
                    senderId: currentUserId,
                    message: comment,
                    replyId: clickedComment?.length
                        ? clickedComment.replyId
                        : replyId
                };
                if (editting) {
                    const res = await updateComment({
                        minId,
                        feedId,
                        commentId: clickedComment._id,
                        newComment
                    });
                } else {
                    const res = await addNewComment({
                        minId,
                        feedId,
                        newComment
                    });
                    console.log("rescomm", res);
                }
            } catch (error) {
                Alert.alert("error occured:" + error.message);
            } finally {
                setLoading(false);
                setEditting(false);
                setComment(null);
                setReplyId(null);
                setClickedComment(null);
            }
        }
    };

    return (
        <View className="py-2 px-3">
            {replyId && (
                <View className="flex-row items-center">
                    <Text
                        className="text-primary
                    capitalize"
                    >
                        replying... {getUser(replyId, "username")}
                    </Text>
                    <CusIcon
                        action={() => setReplyId("")}
                        name="close"
                        size={12}
                        bg="bg-background
                       "
                        hw="h-6 w-6"
                        color="red-500"
                    />
                </View>
            )}
            {editting && (
                <View className="flex-row items-center">
                    <Text
                        className="text-primary
                    capitalize"
                    >
                        editting...
                    </Text>
                    <CusIcon
                        action={() => setEditting(false)}
                        name="close"
                        size={12}
                        bg="bg-background
                       "
                        hw="h-6 w-6"
                        color="red-500"
                    />
                </View>
            )}
            <View className="flex-row py-2 ">
                <TextInput
                    className=" bg-background rounded-l-sm border-l border-y border-primary flex-1 items-center px-3 py-2"
                    value={comment}
                    onChangeText={text => setComment(text)}
                    placeholder="comment"
                />
                <View
                    className="items-center justify-center rounded-r-sm px-3
                bg-primary"
                >
                    {loading ? (
                        <Loader color="text-white" />
                    ) : (
                        <CusIcon
                            color="text-white"
                            name="send"
                            action={loading ? null : handleSubmit}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};
export default CommentInput;
