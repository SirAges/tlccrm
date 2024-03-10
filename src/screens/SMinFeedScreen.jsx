import { useState, useRef, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateAgo } from "../lib/utils";
import { feedForm } from "../lib/forms";
import {
    useGetMinFeedsQuery,
    useDeleteMinFeedMutation,
    useGetMinCommentsQuery,
    useDeleteMinCommentMutation
} from "../redux/ministry/ministryApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    CommentList,
    CommentInput,
    Reactions,
    CardActions,
    CusIcon,
    Loader,
    ScreenLoader
} from "../components";
const SMinFeedScreen = ({ route, navigation }) => {
    const { feed: f } = route.params;
    console.log("comments", f.comments, f);

    const { setValue, setFormArray, minId, currentUser, getUser } =
        useContext(GlobalContext);
    const [comment, setComment] = useState("");
    const [replyId, setReplyId] = useState("");
    const [comReply, setComReply] = useState("");
    const [popup, setPopup] = useState(false);
    const [cid, setCid] = useState(null);
    const [clickedComment, setClickedComment] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deletingComment, setDeletingComment] = useState(false);
    const [editting, setEditting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [deleteComment] = useDeleteMinCommentMutation();

    const [
        deleteFeed,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteMinFeedMutation();
    const { data: comments } = useGetMinCommentsQuery({ minId, feedId: f._id });
    const handleNavigation = () => {
        setFormArray(feedForm);
        setValue({
            title: "",
            image: "",
            body: ""
        });
        navigation.navigate("FormScreen", {
            name: "feed",
            action: "create",
            multiple: false
        });
    };
    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteFeed({ minId, feedId: f._id });
            } catch (error) {
                console.log("del", deleteError);
            } finally {
                console.log("deleted", deleted);
                setDeleting(false);
                setDeletingItem(null);
                navigation.goBack();
            }
        };
        Alert.alert(
            "Delete This Feed",
            "Are you sure you want to delete this ministry",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };
    const handleEdit = item => {
        setFormArray(feedForm);
        setValue(item);
        navigation.navigate("FeedForm", {
            name: "feed",
            action: "edit",
            multiple: false,
            minId
        });
    };
    const handleReply = (com, sen) => {
        if (com && sen) {
            setComReply(com);
            setReplyId(sen);
        }
    };
    const handleCommentMenu = c => {
        setClickedComment(c);
        if (cid === c._id) {
            setPopup(prev => !prev);
        } else {
            setCid(c._id);
            setPopup(true);
        }
    };

    const handleEditComment = async () => {
        setEditting(true);
        setComment(clickedComment.message);
        setPopup(prev => !prev);
    };
    const handleDeleteComment = () => {
        const removeComment = async () => {
            setDeletingComment(true);
            try {
                const res = await deleteComment({
                    minId,
                    feedId: f._id,
                    commentId: cid
                });
            } catch (error) {
                console.log("comerror", error);
            } finally {
                setDeletingComment(false);
                setPopup(false);
            }
        };
        Alert.alert(
            "Delete This comment",
            "Are you sure you want to delete this comment",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => removeComment() }
            ]
        );
    };
    return (
        <View className="bg-background flex-1">
            <View className=" image w-full h-72">
                <Image
                    className="h-full w-full"
                    style={{ resizeMode: "cover" }}
                    source={{ uri: f?.image[0] }}
                />

                <View
                    className="absolute top-10 right-5 rounded-md flex-row
                bg-white space-x-2 items-center"
                >
                    <CusIcon
                        action={() => handleEdit(f)}
                        size={20}
                        name="create"
                    />
                    {deleting && f._id === deletingItem && <Loader />}
                    <CusIcon
                        color="text-danger"
                        action={() => handleDelete(f._id)}
                        size={20}
                        name="trash"
                    />
                </View>
            </View>

            <View>
                <CardActions
                    navigation={navigation}
                    currentUserId={currentUser}
                    from="ministry"
                    minId={minId}
                    feed={f}
                />
            </View>
            <View className="flex-1">
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <View className="head space-y-3 px-2">
                                <View className="flex-row justify-between items-center">
                                    <Text className="capitalize text-xl font-semibold text-title ">
                                        {f.title}
                                    </Text>
                                </View>
                                <Text className="text-body">{f.body}</Text>
                            </View>
                        </>
                    )}
                    keyExtractor={c => c._id}
                    data={comments}
                    renderItem={({ item: c }) => (
                        <TouchableWithoutFeedback
                            onPress={() => handlePressOutside()}
                            className="flex-1 bg-white"
                        >
                            <CommentList
                                from="ministry"
                                setReplyId={setReplyId}
                                replyId={replyId}
                                c={c}
                                feedId={f._id}
                                comReply={comReply}
                                setComReply={setComReply}
                                navigation={navigation}
                                comment={comment}
                                handleReply={handleReply}
                                handleCommentMenu={handleCommentMenu}
                                setComment={setComment}
                            />
                        </TouchableWithoutFeedback>
                    )}
                />
            </View>
            <CommentInput
                from="ministry"
                setReplyId={setReplyId}
                replyId={replyId}
                comReply={comReply}
                setComReply={setComReply}
                popup={popup}
                setPopup={setPopup}
                clickedComment={clickedComment}
                setClickedComment={setClickedComment}
                editting={editting}
                setEditting={setEditting}
                comment={comment}
                minId={minId}
                feedId={f._id}
                setComment={setComment}
                currentUserId={currentUser?._id}
            />

            {popup && cid && (
                <TouchableWithoutFeedback onPress={() => setPopup(false)}>
                    <View className="absolute h-full  w-full flex-1">
                        <View
                            className="w-full rounded-t-3xl absolute bottom-0
                items-start px-5 py-5 shadow-lg shadow-black
                bg-white max-h-56"
                        >
                            <Text className="capitalize w-full mb-3 font-bold text-xl text-center">
                                Comment Options
                            </Text>
                            <ScrollView className="flex-1 w-full">
                                <View className="space-y-4 px-2 flex-1">
                                    <Text
                                        onPress={() => handleEditComment()}
                                        className="w-full capitalize font-medium"
                                    >
                                        Edit comment
                                    </Text>
                                    <Text
                                        className="w-full capitalize font-medium"
                                        onPress={() =>
                                            deletingComment
                                                ? null
                                                : handleDeleteComment()
                                        }
                                    >
                                        delete comment
                                        {deletingComment && <Loader />}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};
export default SMinFeedScreen;
