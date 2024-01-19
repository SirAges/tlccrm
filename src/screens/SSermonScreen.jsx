import { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateAgo } from "../lib/utils";

import { CommentList, CommentInput,Reactions,CardActions } from "../components";
const SSermonScreen = ({ route, navigation }) => {
    const { feed: f } = route.params;
    const [feed, setFeed] = useState(f);
    const [comment, setComment] = useState("");
    const [replyId, setReplyId] = useState("");
    const [comReply, setComReply] = useState("");
    const [popup, setPopup] = useState(false);
    const [cid, setCid] = useState("");
    const popupRef = useRef();

    const handlePressOutside = event => {
        // Use `popupRef.current` to check if the press is outside the component
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            // Code to execute when outside the component is clicked
            setCid(null);
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => handlePressOutside()}
            className="flex-1 bg-white"
        >
            <>
                <View className=" image w-full h-72">
                    <Image
                        className="h-full w-full"
                        style={{ resizeMode: "cover" }}
                        source={feed.image}
                    />
                </View>
                <View className="py-2">
                    <Reactions navigation={navigation} feed={feed} />
                </View>
                <View>
                    <CardActions navigation={navigation} feed={feed} />
                </View>
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <View className="head space-y-3 px-2">
                                <Text className="uppercase text-xl font-semibold text-title">
                                    {feed.title}
                                </Text>
                                <View className="flex-row space-x-2">
                                    <Text className="capitalize font-semibold">
                                        Text:
                                    </Text>
                                    <Text className="capitalize text-body">
                                        {feed.text}
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-primary font-medium capitalize">
                                        {feed.program} Message
                                    </Text>
                                    <Text className="text-white font-medium bg-primary rounded-tr-md rounded-bl-md px-2">
                                        {formatDateAgo(feed._createdAt)}
                                    </Text>
                                </View>
                            </View>
                            <View className="body px-2">
                                <View>
                                    <Text className="text-title text-lg font-semibold">
                                        Introduction:
                                    </Text>
                                    <Text className="text-body ">
                                        {feed.introduction}
                                    </Text>
                                </View>
                                <View className="px-2 py-2 space-y-3">
                                    <Text className="capitalize text-title font-semibold text-md">
                                        we shall consider the message under the
                                        following subheadings
                                    </Text>
                                    <View className="">
                                        {feed.body.map(b => (
                                            <View
                                                key={b._id}
                                                className="space-y-2"
                                            >
                                                <View className="flex-row items-center justify-start space-x-2">
                                                    <Text className="text-white bg-primary font-semibold rounded-md px-2 py-1">
                                                        Point {b.point}
                                                    </Text>
                                                    <Text className="text-title font-semibold text-lg capitalize">
                                                        {b.title}
                                                    </Text>
                                                </View>
                                                <Text className="capitalize text-body font-semibold ">
                                                    Text: {b.text}
                                                </Text>
                                                <Text className="text-body">
                                                    Point {b.body}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                    keyExtractor={c => c._id}
                    data={feed.comments}
                    renderItem={({ item: c }) => (
                        <CommentList
                            setReplyId={setReplyId}
                            replyId={replyId}
                            c={c}
                            feedId={feed._id}
                            comReply={comReply}
                            setComReply={setComReply}
                            popup={popup}
                            setPopup={setPopup}
                            cid={cid}
                            setCid={setCid}
                            navigation={navigation}
                            comment={comment}
                            setComment={setComment}
                            popupRef={popupRef}
                        />
                    )}
                />
                <CommentInput
                    setReplyId={setReplyId}
                    replyId={replyId}
                    comReply={comReply}
                    setComReply={setComReply}
                    popup={popup}
                    setPopup={setPopup}
                    cid={cid}
                    setCid={setCid}
                    comment={comment}
                    setComment={setComment}
                />
            </>
        </TouchableWithoutFeedback>
    );
};
export default SSermonScreen;
