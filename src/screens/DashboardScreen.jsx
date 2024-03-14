import { View, Text, ScrollView, Image, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate, formatDateAgo, textTruncate } from "../lib/utils";

import { useState, useEffect, useContext } from "react";
import {
    Header,
    Testimony,
    Sermon,
    News,
    UpcomingEvents,
    AllFeeds,
    Reactions,
    CardActions,
    ScreenLoader,
    ImageGrid
} from "../components";
import {
    useGetNewsQuery,
    useDeleteNewsMutation
} from "../redux/news/newsApiSlice";
import {
    useGetSermonsQuery,
    useDeleteSermonMutation
} from "../redux/sermon/sermonApiSlice";
import {
    useGetTestimoniesQuery,
    useDeleteTestimonyMutation
} from "../redux/testimony/testimonyApiSlice";
const DashboardScreen = ({ navigation }) => {
    const { data: news } = useGetNewsQuery("newslist");
    const { data: sermons } = useGetSermonsQuery("sermonlist");
    const { data: testimonies } = useGetTestimoniesQuery("testimonylist");
    const [allFeed, setAllFeed] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {}, []);
    useEffect(() => {
        const getAllFeed = () => {
            setLoading(true);
            try {
                const mergedFeeds = news &&
                    sermons &&
                    testimonies &&
                    news !== undefined &&
                    sermons !== undefined &&
                    testimonies !== undefined && [
                        ...testimonies,
                        ...news,
                        ...sermons
                    ];

                const sortedFeed =
                    mergedFeeds?.length &&
                    [...mergedFeeds].sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    });
                setAllFeed(sortedFeed);
            } catch (error) {
                throw new Error(error);
            } finally {
                setLoading(false);
            }
        };

        getAllFeed();
    }, [news, sermons, testimonies]);

    let content;
    content = (
        <FlatList
            ListHeaderComponent={
                <View className="space-x-3">
                    <UpcomingEvents navigation={navigation} />
                    {sermons?.length && (
                        <Sermon
                            sermons={sermons.slice(0, 10)}
                            title={"recent Live changing sermons"}
                            navigation={navigation}
                            horizontal={true}
                            size={"h-40 w-44"}
                        />
                    )}
                    {testimonies?.length && (
                        <Testimony
                            title={"recent testimonies"}
                            testimonies={testimonies.slice(0, 10)}
                            navigation={navigation}
                            horizontal={true}
                            size={"h-40 w-60"}
                        />
                    )}
                    {news?.length && (
                        <News
                            news={news.slice(0, 10)}
                            navigation={navigation}
                            title={"recent news"}
                            horizontal={true}
                            size={"h-40 w-52"}
                        />
                    )}
                </View>
            }
            keyExtractor={a => a._id}
            data={allFeed}
            renderItem={({ item: a }) => (
                <View className="mb-1 space-y-2 py-2  bg-white w-full">
                    <View className="head bg-background/20 px-2 py-1 ">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-extrabold text-primary">
                                {a.testifier
                                    ? "Testimony"
                                    : a.program
                                    ? "Sermon"
                                    : "News"}
                            </Text>
                            <Text className=" text-primary px-1 py-0.5 font-medium ">
                                {!a.program
                                    ? formatDateAgo(a.createdAt)
                                    : a.program}
                            </Text>
                        </View>
                        <Text className="text-title text-lg capitalize font-extrabold">
                            {textTruncate(a.title, 35)}
                        </Text>
                    </View>
                    <ImageGrid images={a.image} />
                    <View className="px-2">
                        <Text className="text-body">
                            {a.text
                                ? textTruncate(a.introduction, 100)
                                : textTruncate(a.body, 100)}
                        </Text>
                    </View>
                    <View>
                        <Reactions navigation={navigation} feed={a} />
                    </View>
                    <View>
                        <CardActions
                            from={
                                a.text
                                    ? "sermon"
                                    : a.testifier
                                    ? "testimony"
                                    : "news"
                            }
                            navigation={navigation}
                            feed={a}
                        />
                    </View>
                </View>
            )}
        />
    );

    if (!allFeed) content = <ScreenLoader text="no content try again..." />;
    if (loading) content = <ScreenLoader text="loading data..." />;

    const func1 = clicked => {
        Alert.alert(clicked);
    };
    const func2 = clicked => {
        Alert.alert(clicked);
    };
    const func3 = clicked => {
        Alert.alert(clicked);
    };

    return (
        <SafeAreaView className="flex-1 ">
            <Header navigation={navigation} />

            <View className="flex-1 bg-gray-500">{content}</View>
        </SafeAreaView>
    );
};
export default DashboardScreen;
