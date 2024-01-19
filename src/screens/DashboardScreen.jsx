import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { testimonies, devotionals, news, sermons } from "../lib/data";
import { formatDate, formatDateAgo, textTruncate } from "../lib/utils";
import { useState, useEffect } from "react";
import {
    Header,
    Testimony,
    Sermon,
    News,
    UpcomingEvents,
    AllFeeds,
    Reactions,
    CardActions
} from "../components";
const DashboardScreen = ({ navigation }) => {
    const [allFeed, setAllFeed] = useState([]);
    useEffect(() => {
        const getAllFeed = () => {
            setAllFeed([...testimonies, ...news, ...sermons]);
        };
        getAllFeed();
    }, []);
    return (
        <SafeAreaView className="flex-1 ">
            <Header navigation={navigation} />
            <View className="flex-1 bg-gray-500">
                <FlatList
                    ListHeaderComponent={
                        <View className="space-x-3">
                            <UpcomingEvents navigation={navigation} />
                            <Sermon
                                sermons={sermons}
                                title={"recent Live changing sermons"}
                                navigation={navigation}
                                horizontal={true}
                                size={"h-40 w-44"}
                            />
                            <Testimony
                               title={"recent testimonies"} testimonies={testimonies}
                                navigation={navigation}
                                horizontal={true}
                                size={"h-40 w-60"}
                            />
                            <News
                                news={news}
                                navigation={navigation}
                               title={"recent news"} horizontal={true}
                                size={"h-40 w-52"}
                            />
                        </View>
                    }
                    keyExtractor={a => a._id}
                    data={allFeed}
                    renderItem={({ item: a }) => (
                        <View className="mb-1 space-y-2 py-2  bg-white">
                            <View className="head bg-background/20 px-2 py-1 ">
                                <View className="flex-row items-center justify-between">
                                    <Text className="font-extrabold text-primary">
                                        {a.testifier
                                            ? "Testimony"
                                            : a.program
                                            ? "Sermon"
                                            : "News"}
                                    </Text>
                                    <Text className="text-white bg-primary rounded-br-md rounded-tl-md px-1 py-0.5 font-medium ">
                                        {!a.program
                                            ? formatDateAgo(a._createdAt)
                                            : a.program}
                                    </Text>
                                </View>
                                <Text className="text-title text-lg capitalize font-extrabold">
                                    {textTruncate(a.title, 35)}
                                </Text>
                            </View>
                            <View className=" w-full h-72 ">
                                <Image
                                    style={{ resizeMode: "cover" }}
                                    className="h-full w-full relative "
                                    source={a.image}
                                />
                            </View>
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
                                <CardActions navigation={navigation} feed={a} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default DashboardScreen;
