import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { sermons } from "../lib/data";
import { textTruncate } from "../lib/utils";
import { SearchFilter, Reactions, CardActions, Sermon } from "../components/";
const SermonScreen = ({ navigation }) => {
    const [allSermons, setAllSermons] = useState(sermons);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const popularSermons = [...sermons]
        .sort(
            (a, b) =>
                b.comments.length +
                b.reactions.length -
                (a.comments.length + a.reactions.length)
        )
        .slice(0, 10);

    const onProgramClicked = (clicked, fil) => {
        setFilter(fil);
        setSearchTerm(clicked);
    };
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allSermons.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllSermons(clickedArr);
            } else {
                setAllSermons(sermons);
            }
        } else {
            setAllSermons(sermons);
        }
    }, [filter, searchTerm]);

    return (
        <SafeAreaView className=" flex-1 bg-white">
            <View className="h-fit bg-gray-500">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <SearchFilter
                                data={sermons}
                               filterCond={["title","program"]}
                                 sortCond={["title","newest","popular"]}
                               searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                filter={filter}
                                setFilter={setFilter}
                                searchedData={allSermons}
                                setData={setAllSermons}
                            />
                            <Sermon
                                horizontal={true}
                                sermons={popularSermons}
                                navigation={navigation}
                                title={"popular sermons"}
                                size={"h-40 w-44"}
                            />
                        </>
                    }
                    keyExtractor={s => s._id}
                    horizontal={false}
                    initialNumToRender={2}
                    data={allSermons}
                    renderItem={({ item: s }) => (
                        <View className="space-y-1 mb-1 py-2 bg-white">
                            <View className="flex-row justify-between items-center px-2">
                                <Text
                                    onPress={() =>
                                        navigation.navigate("SSermonScreen", {
                                            feed: s
                                        })
                                    }
                                    className="text-title text-lg font-semibold capitalize"
                                >
                                    {textTruncate(s.title, 30)}
                                </Text>
                                <Text
                                    onPress={() =>
                                        onProgramClicked(s.program, "program")
                                    }
                                    className="bg-primary text-white  px-2 py-1 font-semibold rounded-br-md rounded-tl-md"
                                >
                                    {s.program}
                                </Text>
                            </View>
                            <View className="w-full h-52">
                                <Image
                                    className="w-full h-full"
                                    style={{ resizeMode: "cover" }}
                                    source={s.image}
                                />
                            </View>
                            <Text className="text-body px-2">
                                {textTruncate(s.introduction, 100)}
                            </Text>
                            <View className="py-0.5">
                                <Reactions navigation={navigation} feed={s} />
                            </View>

                            <View>
                                <CardActions navigation={navigation} feed={s} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default SermonScreen;
