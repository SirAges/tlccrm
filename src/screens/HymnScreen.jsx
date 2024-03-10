import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { processText, formatDateTime } from "../lib/utils";
import {
    CusIcon,
    SearchFilter,
    AddButton,
    Separator,
    ScreenLoader,
    Loader
} from "../components";
import { hymnForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";

import {
    useGetHymnsQuery,
    useDeleteHymnMutation
} from "../redux/hymn/hymnApiSlice";
const HymnScreen = ({ navigation }) => {
    const { setValue, setObj, setFormArray } = useContext(GlobalContext);
    const [idx, setIdx] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [allHymns, setAllHymns] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const {
        data: hymns,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetHymnsQuery("hymnslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [
        deleteHymn,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteHymnMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (hymns && hymns !== undefined) {
                setAllHymns(hymns);
                console.log("hymns", allHymns);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [hymns]);
    const refresh = async () => {
        setIsRefreshing(true);
        setLoading(true);

        try {
            await refetch();
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteHymn(id);
            } catch (error) {
                console.log("del", deleteError);
                throw new Error(error.message);
            } finally {
                if (deleted || deleteIsError) {
                    setDeleting(false);
                    setDeletingItem(null);
                }
            }
        };
        Alert.alert(
            "Delete This Hymn",
            "Are you sure you want to delete this hymn",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };

    const handleEdit = item => {
        setFormArray(hymnForm);
        setValue(item);
        navigation.navigate("HymnForm", {
            name: "hymn",
            action: "edit",
            multiple: false
        });
    };
    const handleNavigation = () => {
        setFormArray(hymnForm);
        setValue({
            title: "",
            index: "",
            audio: "",
            body: [],
            chorus: "",
            history: "",
            author: ""
        });
        setObj({
            verse: "",
            chorus: ""
        });
        navigation.navigate("HymnForm", {
            name: "hymn",
            action: "create",
            multiple: false
        });
    };

    const isEspired = date => {
        const currentDate = new Date();
        const endDate = new Date(date);
        return currentDate > endDate;
    };

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

    let content;
    content = (
        <FlatList
            keyExtractor={h => h._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allHymns}
            renderItem={({ item: h }) => (
                <TouchableWithoutFeedback onPress={() => handleDropdown(h._id)}>
                    <View className="bg-white shadow-sm shadow-black m-2 rounded-md">
                        <View className=" flex-row items-center justify-between py-2 ">
                            <Text className="flex-1 capitalize font-semibold text-lg text-justify px-2">
                                {h.title}
                            </Text>
                            <CusIcon
                                action={() => handleEdit(h)}
                                size={20}
                                name="create"
                            />
                            {deleting && h._id === deletingItem && <Loader />}
                            <CusIcon
                                color="text-danger"
                                action={() => handleDelete(h._id)}
                                size={20}
                                name="trash"
                            />
                            <View className="bg-primary items-center justify-center rounded-l-md px-2 py-2">
                                <Text className="text-white font-extrabold text-lg">
                                    {h.index}
                                </Text>
                            </View>
                        </View>

                        {dropDown && idx === h._id && (
                            <View className="px-2 space-y-2 py-2">
                                <Separator />
                                <Text className="text-2xl text-body">
                                    {processText(
                                        h.chorus ? h.chorus : h?.body[0]?.verse
                                    )}
                                </Text>
                                <Text
                                    onPress={() =>
                                        navigation.navigate("SHymnScreen", {
                                            hymn: h
                                        })
                                    }
                                    className="bg-primary text-lg font-extrabold text-white px-2 py-2 capitalize text-center rounded-md tracking-widest "
                                >
                                    Full hymn
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );
    if (isError || error?.data) {
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    }
    if (loading || isLoading) {
        content = <ScreenLoader text="loading data..." />;
    }
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Hymns
            </Text>

            <SearchFilter
                data={hymns}
                searchTerm={searchTerm}
                filterCond={["title","chorus"]}
                sortCond={["index", "title"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allHymns}
                setData={setAllHymns}
                handleDropdown={handleDropdown}
            />
            <View className="bg-white flex-1">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};

export default HymnScreen;
