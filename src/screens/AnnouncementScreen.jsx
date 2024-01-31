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
import { AddButton, CusIcon, SearchFilter, Separator } from "../components";
import { announcements } from "../lib/data";
import { announcementForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const AnnouncementScreen = ({ navigation }) => {
    const { setValue } = useContext(GlobalContext);
    useEffect(() => {
        setValue({
            title: "",
            image: "",
            start: "",
            end: "",
            link: "",
            body: ""
        });
    }, []);

    const isEspired = date => {
        const currentDate = new Date();
        const endDate = new Date(date);
        return currentDate > endDate;
    };
    const [dropDown, setDropDown] = useState(false);
    const [allAnnouncements, setAllAnnouncements] = useState(announcements);
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
            const clickedArr = allAnnouncements.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllAnnouncements(clickedArr);
            } else {
                setAllAnnouncements(announcements);
            }
        } else {
            setAllAnnouncements(announcements);
        }
    }, [filter, searchTerm]);
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Announcements
            </Text>

            <SearchFilter
                data={announcements}
                searchTerm={searchTerm}
                filterCond={["title", "body"]}
                sortCond={["title", "newest", "drange"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allAnnouncements}
                setData={setAllAnnouncements}
            />
            <View className="bg-white py-3 max-w-full flex-1">
                <FlatList
                    keyExtractor={a => a._id}
                    data={allAnnouncements}
                    renderItem={({ item: a }) => (
                        <View
                            className="h-fit 
                        bg-white shadow-lg shadow-black mx-2 mb-4  rounded-md flex-row items-center"
                        >
                            <View
                                className={`${
                                    isEspired(a.end)
                                        ? "bg-danger"
                                        : "bg-primary"
                                } w-[2%] rounded-l-md h-full min-h-[70px]`}
                            />
                            <View className="flex-1">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(a._id)}
                                >
                                    <Text className="capitalize font-semibold text-md px-2 py-1 text-justify">
                                        {a.title}
                                    </Text>
                                </TouchableWithoutFeedback>

                                {dropDown && idx === a._id && (
                                    <View className="px-2 space-y-2 py-2">
                                        <Separator />
                                        <View className="flex-row items-center space-x-2">
                                            <Text className="capitalize text-primary  font-semibold">
                                                Start
                                            </Text>
                                            <Text className="font-semibold capitalize">
                                                {formatDateTime(a.start)}
                                            </Text>
                                        </View>
                                        <View className="flex-row items-center space-x-2">
                                            <Text className="capitalize text-danger  font-semibold">
                                                End
                                            </Text>
                                            <Text className="font-semibold capitalize">
                                                {formatDateTime(a.end)}
                                            </Text>
                                        </View>
                                        <Separator />
                                        {a.image && (
                                            <View className="w-full h-36 ">
                                                <Image
                                                    source={a.image}
                                                    style={{
                                                        resizeMode: "cover"
                                                    }}
                                                    className="w-full h-full"
                                                />
                                            </View>
                                        )}

                                        <Text className="text-justify text-lg text-body">
                                            {a.body}
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
                        name: "announcement",
                        formArray: announcementForm,multiple:false
                    })
                }
            />
        </SafeAreaView>
    );
};
export default AnnouncementScreen;
