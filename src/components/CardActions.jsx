import { useState, useEffect, useContext } from "react";
import { View, Text, Alert } from "react-native";
import { emojiReactions } from "../lib/data";
import { CusIcon, Reactions, Loader } from "../components";
import {
    useGetMinReactionsQuery,
    useDeleteMinReactionMutation,
    useAddNewMinReactionMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useGetSermonReactionsQuery,
    useDeleteSermonReactionMutation,
    useAddNewSermonReactionMutation
} from "../redux/sermon/sermonApiSlice";
import {
    useGetTestimonyReactionsQuery,
    useDeleteTestimonyReactionMutation,
    useAddNewTestimonyReactionMutation
} from "../redux/testimony/testimonyApiSlice";
import {
    useGetNewsReactionsQuery,
    useDeleteNewsReactionMutation,
    useAddNewNewsReactionMutation
} from "../redux/news/newsApiSlice";
import {
    useGetDeptReactionsQuery,
    useDeleteDeptReactionMutation,
    useAddNewDeptReactionMutation
} from "../redux/department/departmentApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const CardActions = ({ navigation, from, feed }) => {
    const feedId = feed._id;
    const { minId, currentUser } = useContext(GlobalContext);
    const currentUserId = currentUser._id;
    const [modal, setModal] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data } =
        from === "ministry"
            ? useGetMinReactionsQuery({ minId, feedId })
            : from === "news"
            ? useGetNewsReactionsQuery({ feedId })
            : from === "sermon"
            ? useGetSermonReactionsQuery({ feedId })
            : from === "testimony"
            ? useGetTestimonyReactionsQuery({ feedId })
            : useGetDeptReactionsQuery({ minId, feedId });
    const [addReaction] =
        from === "ministry"
            ? useAddNewMinReactionMutation()
            : from === "news"
            ? useAddNewNewsReactionMutation()
            : from === "sermon"
            ? useAddNewSermonReactionMutation()
            : from === "testimony"
            ? useAddNewTestimonyReactionMutation()
            : useAddNewDeptReactionMutation();

    const [deleteReaction] =
        from === "ministry"
            ? useDeleteMinReactionMutation()
            : from === "news"
            ? useDeleteNewsReactionMutation()
            : from === "sermon"
            ? useDeleteSermonReactionMutation()
            : from === "testimony"
            ? useDeleteTestimonyReactionMutation()
            : useDeleteDeptReactionMutation();
    useEffect(() => {
        try {
            setLoading(true);
            if (data && data !== undefined) {
                setReactions(data);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [data]);
    const foundOne = reactions?.find(fr => fr.senderId === currentUserId);
    const openCommentScreen = () => {
        if (from === "sermon") {
            navigation.navigate("SSermonScreen", { feed });
        } else if (from === "testimony") {
            navigation.navigate("STestimonyScreen", { feed });
        } else if (from === "department") {
            navigation.navigate("SDeptFeedScreen", { feed });
        } else if (from === "ministry") {
            navigation.navigate("SMinFeedScreen", { feed });
        } else if (from === "news") {
            navigation.navigate("SNewsScreen", { feed });
        }
    };

    const handleAddReaction = async reaction => {
        const reactionData = {
            senderId: currentUserId,
            reaction
        };

        try {
            setLoading(true);
            const res = await addReaction({ minId, feedId, reactionData });
            console.log("resreax", res);
        } catch (error) {
            console.log("error reaction", error);
        } finally {
            // await refetch()
            setLoading(false);
            setModal(prev => !prev);
        }
    };

    const handleDeleteReaction = async reaction => {
        try {
            setLoading(true);
            const res = await deleteReaction({
                minId,
                feedId,
                reactionId: foundOne._id
            });
        } catch (error) {
            console.log("error reaction", error);
        } finally {
            setLoading(false);
            // await refetch()
            return null;
        }
    };

    return (
        <View>
            <View className="relative flex-row justify-between items-center px-2">
                {modal && (
                    <View
                        className="absolute flex-row flex-wrap w-fit max-w-2xl
                    bg-white shadow-lg shadow-black rounded-lg h-fit max-h-24
                    bottom-10 left-4 px-2 py-3 z-20"
                    >
                        {emojiReactions.map(r => (
                            <Text
                                key={r}
                                className="text-2xl px-1"
                                onPress={() => handleAddReaction(r)}
                            >
                                {r}
                            </Text>
                        ))}
                    </View>
                )}
                <View
                    className="w-1/3 flex flex-row items-center space-x-2
                    justify-start
                "
                >
                    {loading ? (
                        <Loader />
                    ) : (
                        <CusIcon
                            name="thumbs-up-outline"
                            size={18}
                            action={
                                loading
                                    ? null
                                    : () =>
                                          foundOne
                                              ? handleDeleteReaction()
                                              : setModal(prev => !prev)
                            }
                        />
                    )}

                    <Reactions reactions={reactions} />
                </View>
                <View className="w-1/3 flex items-center">
                    <CusIcon
                        name="chatbox-outline"
                        action={() => openCommentScreen()}
                    />
                </View>
                <View className="w-1/3 flex items-end">
                    <CusIcon name="share-social-outline" />
                </View>
            </View>
        </View>
    );
};
export default CardActions;
