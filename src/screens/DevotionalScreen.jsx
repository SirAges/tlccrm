import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { devotionals } from "../lib/data";
import { processText, getDay, getMonth } from "../lib/utils";
import {
    SearchFilter,
    Reactions,
    DevotionFilter,
    CusIcon
} from "../components/";
const DevotionalScreen = ({ navigation }) => {
    const [allDevotionals, setAllDevotionals] = useState(devotionals);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({
        year: "Select Year",
        month: "Select Month",
        day: "Select Day"
    });
    const [toggleList, setToggleList] = useState(false);
    const handleOutsideClick = clicked => {
        if (toggleList) {
            setToggleList(false);
        } else {
            navigation.navigate("SDevotionalScreen", { devotion: clicked });
        }
    };
    return (
        <SafeAreaView className=" flex-1 bg-white">
            <FlatList
                ListHeaderComponent={
                    <>
                        <DevotionFilter
                            filter={filter}
                            setFilter={setFilter}
                            toggleList={toggleList}
                            setToggleList={setToggleList}
                            data={devotionals}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            searchedData={allDevotionals}
                            setData={setAllDevotionals}
                        />
                    </>
                }
                keyExtractor={d => d._id}
                horizontal={false}
                initialNumToRender={2}
                data={allDevotionals}
                renderItem={({ item: d }) => (
                    <TouchableWithoutFeedback
                        onPress={() => handleOutsideClick(d)}
                    >
                        <View className="bg-white mx-2 mb-5 shadow-md shadow-black/50 h-fit rounded-lg ">
                            <View className="flex-row w-full">
                                <View className="items-center justify-center bg-primary rounded-tl-lg px-0.5">
                                    <Text className="uppercase font-extrabold text-xs text-white">
                                        day {getDay(d._createdAt)}
                                    </Text>
                                    <Text className="uppercase text-md tracking-[5px] leading-[15px] font-extrabold text-white">
                                        {getMonth(d._createdAt)}
                                    </Text>
                                </View>
                                <View className="px-2 py-1">
                                    <Text className="text-md font-extrabold uppercase">
                                        theme: {processText(d.title, 27)}
                                    </Text>
                                    <Text className="capitalize text-sm text-title">
                                        Text: {processText(d.text, 20)}
                                    </Text>
                                </View>
                            </View>
                            <View className="px-2 pb-2 space-y-1">
                                <Text className="capitalize font-semibold">
                                    Memory Verse of the day
                                </Text>

                                <Text className="capitalize text-primary font-semibold text-xs">
                                    {processText(d.memoryVerse.text)}
                                </Text>
                                <Text className="text-md text-body">
                                    {processText(d.memoryVerse.body)}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
             <View className="absolute bottom-24 right-5 items-center justify-center">
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
export default DevotionalScreen;
