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
import { testimonyForm } from "../lib/forms";
import {
    useDeleteTestimonyMutation,
    useGetTestimonyCommentsQuery,
    useDeleteTestimonyCommentMutation
} from "../redux/testimony/testimonyApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    CommentList,
    CommentInput,
    Reactions,
    CardActions,
    CusIcon,
    Loader,
    ScreenLoader,
    ButtomMenu
} from "../components";
const STestimonyScreen = ({ route, navigation }) => {
    const { feed: f } = route.params;
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
    const [deleteComment] = useDeleteTestimonyCommentMutation();

    const [
        deleteTestimony,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteTestimonyMutation();
    const { data: comments } = useGetTestimonyCommentsQuery({
        minId,
        feedId: f._id
    });
    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                const res = await deleteTestimony({ feedId: f._id });
                console.log("resdelserm", res);
            } catch (error) {
                console.log("del", error);
            } finally {
                if (!deleteError) {
                    setDeleting(false);
                    setDeletingItem(null);
                    navigation.goBack();
                }
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
        setFormArray(testimonyForm);
        setValue(item);
        navigation.navigate("TestimonyForm", {
            name: "testimony",
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
        <View className="flex-1">
            <View className=" image w-full h-72">
                <Image
                    className="h-full w-full"
                    style={{ resizeMode: "cover" }}
                    source={{ uri: f.image[0] }}
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
            <View className="py-2">
                <Reactions navigation={navigation} feed={f} />
            </View>
            <View>
                <CardActions
                    navigation={navigation}
                    currentUserId={currentUser}
                    from="testimony"
                    minId={minId}
                    feed={f}
                />
            </View>
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View className="head space-y-3 px-2">
                            <Text className="uppercase text-xl font-semibold text-title">
                                {f.title}
                            </Text>
                            <View className="flex-row space-x-2">
                                <Text className="capitalize font-semibold">
                                    Text:
                                </Text>
                                <Text className="capitalize text-body">
                                    {f.text}
                                </Text>
                            </View>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-primary font-medium capitalize">
                                    {f.program} Message
                                </Text>
                                <Text
                                    className="font-medium text-primary px-2
                                text-xs"
                                >
                                    {formatDateAgo(f.createdAt)}
                                </Text>
                            </View>
                        </View>
                        <View className="body px-2">
                            <View>
                                <Text className="text-title  font-semibold">
                                    Introduction:
                                </Text>
                                <Text className="text-body ">{f.body}</Text>
                            </View>
                            <View className="px-2 py-2 space-y-2">
                                <Text className="capitalize text-title font-semibold">
                                    we shall consider the message under the
                                    following subheadings
                                </Text>
                                <View className="">
                                   <Text>{f.body}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
                keyExtractor={c => c._id}
                data={comments}
                renderItem={({ item: c }) => (
                    <CommentList
                        from="testimony"
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
                )}
            />
            <CommentInput
                from="testimony"
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
                <ButtomMenu
                    deletingComment={deletingComment}
                    setPopup={setPopup}
                    handleEditComment={handleEditComment}
                    handleDeleteComment={handleDeleteComment}
                />
            )}
        </View>
    );
};
export default STestimonyScreen;
