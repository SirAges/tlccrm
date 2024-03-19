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
import { doctrineForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";

import {
    useGetDoctrinesQuery,
    useDeleteDoctrineMutation
} from "../redux/doctrine/doctrineApiSlice";
const DoctrineScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);

    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [allDoctrines, setAllDoctrines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [idx, setIdx] = useState(null);

    const {
        data: doctrines,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetDoctrinesQuery("doctrineslist", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [
        deleteDoctrine,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteDoctrineMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (doctrines && doctrines !== undefined) {
                setAllDoctrines(doctrines);
                console.log("doctrines", allDoctrines);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [doctrines]);
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
                await deleteDoctrine(id);
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
            "Delete This Doctrine",
            "Are you sure you want to delete this doctrine",
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
        setFormArray(doctrineForm);
        setValue(item);
        navigation.navigate("DoctrineForm", {
            name: "doctrine",
            action: "edit",
            multiple: false
        });
    };
    const handleNavigation = () => {
        setFormArray(doctrineForm);
        setValue({
            title: "",
            text: "",
            body: ""
        });
        navigation.navigate("DoctrineForm", {
            name: "doctrine",
            action: "create",
            multiple: false
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
    let content;
    content = (
        <FlatList
            keyExtractor={d => d._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allDoctrines}
            renderItem={({ item: d }) => (
                <TouchableWithoutFeedback onPress={() => handleDropdown(d._id)}>
                    <View
                        className="
                        bg-white shadow-sm shadow-black rounded-md m-2"
                    >
                        <View className="flex-row items-center justify-between py-4">
                            <Text className="flex-1 capitalize font-semibold text-md px-2 py-2 text-justify">
                                {d.title}
                            </Text>

                            <CusIcon
                                action={() => handleEdit(d)}
                                size={20}
                                name="create"
                            />
                            {deleting && d._id === deletingItem && <Loader />}
                            <CusIcon
                                color="text-danger"
                                action={() => handleDelete(d._id)}
                                size={20}
                                name="trash"
                            />
                        </View>

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
                </TouchableWithoutFeedback>
            )}
        />
    );
    if ((!loading && !allDoctrines.length) || isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;

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
            <View className="bg-white flex-1">{content}</View>

            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};

export default DoctrineScreen;
