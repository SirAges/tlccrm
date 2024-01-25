import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { testimonies } from "../lib/data";
import { textTruncate } from "../lib/utils";
import {
    SearchFilter,
    Reactions,
    CardActions,
    Testimony
} from "../components/";
const TestimonyScreen = ({ navigation }) => {
    const [allTestimonies, setAllTestimonies] = useState(testimonies);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const popularTestimonies = [...testimonies]
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
            const clickedArr = allTestimonies.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllTestimonies(clickedArr);
            } else {
                setAllTestimonies(testimonies);
            }
        } else {
            setAllTestimonies(testimonies);
        }
    }, [filter, searchTerm]);

    return (
        <SafeAreaView className=" flex-1 bg-white">
            <View className="h-fit bg-gray-500">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <SearchFilter
                                data={testimonies}
                                searchTerm={searchTerm}
                                filterCond={["title","program"]}
                                sortCond={["title","newest","popular"]}  setSearchTerm={setSearchTerm}
                                filter={filter}
                                setFilter={setFilter}
                                searchedData={allTestimonies}
                                setData={setAllTestimonies}
                            />
                            <Testimony
                                horizontal={true}
                                testimonies={popularTestimonies}
                                navigation={navigation}
                                title={"popular testimonies"}
                                size={"h-40 w-44"}
                            />
                        </>
                    }
                    keyExtractor={t => t._id}
                    horizontal={false}
                    initialNumToRender={2}
                    data={allTestimonies}
                    renderItem={({ item: t }) => (
                        <View className="space-y-1 mb-1 py-2 bg-white">
                            <View className="flex-row justify-between items-center px-2">
                                <Text
                                    onPress={() =>
                                        navigation.navigate(
                                            "STestimonyScreen",
                                            {
                                                feed: t
                                            }
                                        )
                                    }
                                    className="text-title text-md font-semibold capitalize"
                                >
                                    {textTruncate(t.title, 30)}
                                </Text>
                                <Text
                                    onPress={() =>
                                        onProgramClicked(t.program, "program")
                                    }
                                    className="bg-primary text-white text-[8px] px-2 py-1 font-semibold rounded-br-md rounded-tl-md"
                                >
                                    {t.program}
                                </Text>
                            </View>
                            <View className="w-full h-52">
                                <Image
                                    className="w-full h-full"
                                    style={{ resizeMode: "cover" }}
                                    source={t.image}
                                />
                            </View>
                            <Text className="text-body px-2">
                                {textTruncate(t.body, 100)}
                            </Text>
                            <View className="py-0.5">
                                <Reactions navigation={navigation} feed={t} />
                            </View>

                            <View>
                                <CardActions navigation={navigation} feed={t} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default TestimonyScreen;
