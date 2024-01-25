import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { processText, formatDateTime } from "../lib/utils";
import { CusIcon, SearchFilter, Separator } from "../components";
import { hymns } from "../lib/data";

const HymnScreen = ({ navigation }) => {
    const isEspired = date => {
        const currentDate = new Date();
        const endDate = new Date(date);
        return currentDate > endDate;
    };
    const [idx, setIdx] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [allHymns, setAllHymns] = useState(hymns);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const handleDropdown = clicked => {
        if (clicked === idx) {
            setDropDown(prev => !prev);
        } else {
            setIdx(clicked);
            setDropDown(true);
        }
    };
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allHymns.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllHymns(clickedArr);
            } else {
                setAllHymns(hymns);
            }
        } else {
            setAllHymns(hymns);
        }
    }, [filter, searchTerm]);
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Hymns
            </Text>

            <SearchFilter
                data={hymns}
                searchTerm={searchTerm}
                filterCond={[]}
                sortCond={["index", "title"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allHymns}
                setData={setAllHymns}
                handleDropdown={handleDropdown}
            />
            <View className="bg-white my-3  max-w-full flex-1">
                <FlatList
                    keyExtractor={h => h._id}
                    data={allHymns}
                    renderItem={({ item: h }) => (
                        <View
                            className="h-fit 
                        bg-white shadow-lg shadow-black mx-2 my-2  rounded-md flex-row items-center"
                        >
                            <View className="bg-primary w-[2%] rounded-l-md h-full min-h-[70px]" />
                            <View className="flex-1">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(h._id)}
                                >
                                    <View className="flex-1 flex-row items-center justify-between py-2 ">
                                        <Text className="capitalize font-semibold text-lg max-w-[85%] text-justify px-2">
                                            {h.title}
                                        </Text>

                                        <View className="bg-primary items-center justify-center rounded-l-md px-2 py-2">
                                            <Text className="text-white font-extrabold text-lg">
                                                {h.index}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                {dropDown && idx === h._id && (
                                    <View className="px-2 space-y-2 py-2">
                                        <Separator />
                                        <Text className="text-2xl text-body">
                                            {processText(
                                                h.chorus
                                                    ? h.chorus
                                                    : h.body[0].verse
                                            )}
                                        </Text>
                                        <Text
                                            onPress={() =>
                                                navigation.navigate(
                                                    "SHymnScreen",
                                                    { hymn: h }
                                                )
                                            }
                                            className="bg-primary text-lg font-extrabold text-white px-2 py-2 capitalize text-center rounded-md tracking-widest "
                                        >
                                            Full hymn
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
            <View className="absolute bottom-5 right-5 items-center justify-center">
                <CusIcon
                    name="add"
                    bg="bg-primary"
                    hw="w-14 h-14"
                    p="py-2.5 px-2.5"
                    size={35}
                    color="text-white"
                />
            </View>
        </SafeAreaView>
    );
};

export default HymnScreen;
