import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { testimonies, devotionals, news, sermons } from "../lib/data";
import { formatDate } from "../lib/utils";
const AllFeeds = () => {
    const [allFeed, setAllFeed] = useState([]);
    useEffect(() => {
        const getAllFeed = () => {
            setAllFeed([...testimonies, ...news, ...sermons]);
        };
        getAllFeed();
    }, []);
    return (
        <View className="">
            <FlatList
                keyExtractor={a => a._id}
                initialNumToRender={2}
                data={allFeed}
                renderItem={({ item: a }) => (
                    <View className="flex-1 ">
                        <View className="head bg-white shadow-lg shadow-black">
                            <View className="flex-row items-center justify-between">
                                <Text>
                                    {a.testifier
                                        ? "Testimony"
                                        : a.program
                                        ? "Sermon"
                                        : "News"}
                                </Text>
                                <Text>
                                    {!a.program
                                        ? formatDate(a._createdAt)
                                        : a.program}
                                </Text>
                            </View>
                            <Text>{a.title}</Text>
                        </View>
                        <View className=" w-full h-72">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full"
                                source={a.image}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};
export default AllFeeds;
