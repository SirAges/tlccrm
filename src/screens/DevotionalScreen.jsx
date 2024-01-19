import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { devotionals } from "../lib/data";
import { textTruncate ""} from "../lib/utils";
import { SearchFilter, Reactions, CardActions, Devotional } from "../components/";
const DevotionalScreen = ({ navigation }) => {
    const [allDevotionals, setAllDevotionals] = useState(devotionals);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const popularDevotionals = [...devotionals]
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
            const clickedArr = allDevotionals.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllDevotionals(clickedArr);
            } else {
                setAllDevotionals(devotionals);
            }
        } else {
            setAllDevotionals(devotionals);
        }
    }, [filter, searchTerm]);

    return (
        <SafeAreaView className=" flex-1 bg-white">
            <View className="h-fit bg-gray-500">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <SearchFilter
                                data={devotionals}
                                filterCond={"program"}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                filter={filter}
                                setFilter={setFilter}
                                searchedData={allDevotionals}
                                setData={setAllDevotionals}
                            />
                        </>
                    }
                    keyExtractor={d => d._id}
                    horizontal={false}
                    initialNumToRender={2}
                    data={allDevotionals}
                    renderItem={({ item: t }) => (
                       <View>
                       <Text>devotion</Text>
                       </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default DevotionalScreen;
