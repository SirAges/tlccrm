import { useState, useEffect, useContext } from "react";
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
import { CusIcon, SearchFilter, AddButton, Separator } from "../components";
import { doctrineForm } from "../lib/forms";
import { doctrines } from "../lib/data";
import { GlobalContext } from "../hooks/GlobalContext";
const DoctrineScreen = ({ navigation }) => {
    const { setValue } = useContext(GlobalContext);
    useEffect(() => {
        setValue({
            title: "",
            text: "",
            body: "",
    
        });
    }, []);
    const isEspired = date => {
        const currentDate = new Date();
        const endDate = new Date(date);
        return currentDate > endDate;
    };
    const [dropDown, setDropDown] = useState(false);
    const [allDoctrines, setAllDoctrines] = useState(doctrines);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [idx, setIdx] = useState(null);

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
            const clickedArr = allDoctrines.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllDoctrines(clickedArr);
            } else {
                setAllDoctrines(doctrines);
            }
        } else {
            setAllDoctrines(doctrines);
        }
    }, [filter, searchTerm]);
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Doctrines
            </Text>

            <SearchFilter
                data={doctrines}
                searchTerm={searchTerm}
                filterCond={["title", "body"]}
                sortCond={["title"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allDoctrines}
                setData={setAllDoctrines}
            />
            <View className="bg-white my-3 max-w-full flex-1">
                <FlatList
                    keyExtractor={d => d._id}
                    data={allDoctrines}
                    renderItem={({ item: d }) => (
                        <View
                            className="h-fit 
                        bg-white shadow-lg shadow-black mx-2 mb-4  rounded-md flex-row items-center"
                        >
                            <View className="bg-primary w-[2%] rounded-l-md h-full min-h-[70px]" />
                            <View className="flex-1">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(d._id)}
                                >
                                    <Text className="capitalize font-semibold text-md px-2 py-2 text-justify">
                                        {d.title}
                                    </Text>
                                </TouchableWithoutFeedback>

                                {dropDown && idx === d._id && (
                                    <View className="px-2 space-y-2 py-2">
                                        <Separator />
                                        <Text className="text-title text-lg capitalize">
                                            {d.text}
                                        </Text>
                                        <Separator />

                                        <Text className="text-justify text-lg text-body">
                                            {d.body}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>

            <AddButton
                action={() =>
                    navigation.navigate("FormScreen", {
                        name: "doctrine",
                        formArray: doctrineForm,
                        multiple: false
                    })
                }
            />
        </SafeAreaView>
    );
};

export default DoctrineScreen;
