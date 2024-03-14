import React, { useState, useEffect, useContext } from "react";
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
import { formatDateTime } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    ScreenLoader,
    Loader
} from "../components";

import {
    useGetQuotesQuery,
    useDeleteQuoteMutation
} from "../redux/quote/quoteApiSlice";

import { quoteForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";

const QuoteScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);

    const {
        data: quotes,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetQuotesQuery("quoteslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [
        deleteQuote,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteQuoteMutation();
    const [allQuotes, setAllQuotes] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const [idx, setIdx] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    useEffect(() => {
        try {
            setLoading(true);
            if (quotes && quotes !== undefined) {
                setAllQuotes(quotes);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [quotes]);
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allQuotes.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllQuotes(clickedArr);
            } else {
                setAllQuotes(quotes);
            }
        } else {
            setAllQuotes(quotes);
        }
    }, [filter, searchTerm]);

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
    const handleNavigation = () => {
        setFormArray(quoteForm);
        setValue({
            text: "",
            image: [],
            author: "",
            body: ""
        });
        navigation.navigate("QuoteForm", {
            name: "Quote",
            action: "create",
            multiple: true
        });
    };

    const handleDropdown = clicked => {
        if (clicked === idx) {
            setDropDown(prev => !prev);
        } else {
            setIdx(clicked);
            setDropDown(true);
        }
    };

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteQuote(id);
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
            "Delete This Quote",
            "Are you sure you want to delete this quote",
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
        setFormArray(quoteForm);
        setValue(item);
        navigation.navigate("QuoteForm", {
            name: "Quote",
            action: "edit",
            multiple: true
        });
    };
    let content;
    content = (
        <FlatList
            keyExtractor={a => a._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            maxToRenderPerBatch={5}
            data={allQuotes}
            renderItem={({ item: a }) => (
                <TouchableWithoutFeedback onPress={() => handleDropdown(a._id)}>
                    <View
                        className="h-fit bg-white shadow-sm shadow-black
                        mx-2 mb-4 mt-2 rounded-md flex-row items-center"
                    >
                        <View className=" bg-primary w-[2%] rounded-l-md h-full min-h-[70px]" />
                        <View className="flex-1">
                            <View className="flex-row items-center
                            justify-between px-2">
                                <View className="flex-row items-center space-x-2">
                                    <Text className="capitalize text-primary  font-semibold">
                                        Author
                                    </Text>
                                    <Text className="font-semibold capitalize">
                                        {a.author}
                                    </Text>
                                </View>
                                <View className="flex flex-row space-x-2
                                items-center">
                                    <CusIcon
                                        action={() => handleEdit(a)}
                                        size={20}
                                        name="create"
                                    />
                                    {deleting && a._id === deletingItem && (
                                        <Loader />
                                    )}
                                    <CusIcon
                                        color="text-danger"
                                        action={() => handleDelete(a._id)}
                                        size={20}
                                        name="trash"
                                    />
                                </View>
                            </View>

                            {dropDown && idx === a._id && (
                                <View className="px-2 space-y-2 py-2">
                                    <Separator />

                                    <Text
                                        className="flex-1  capitalize font-semibold
                                        text-md px-2 py-1 text-justify"
                                    >
                                        {a.text}
                                    </Text>

                                    <Separator />

                                    {a?.image?.length && (
                                        <View className="w-full h-36 ">
                                            {a.image.map(url => (
                                                <Image
                                                    source={{
                                                        uri: url
                                                    }}
                                                    style={{
                                                        resizeMode: "cover"
                                                    }}
                                                    className="w-full h-full"
                                                />
                                            ))}
                                        </View>
                                    )}

                                    <Text className="text-justify text-lg text-body">
                                        {a.body}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );
    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Quotes
            </Text>
            <SearchFilter
                data={quotes}
                searchTerm={searchTerm}
                filterCond={["title", "body"]}
                sortCond={["title", "newest", "drange"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allQuotes}
                setData={setAllQuotes}
            />
            <View className="bg-white max-w-full flex-1">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};

export default QuoteScreen;
