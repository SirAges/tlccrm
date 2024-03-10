import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Modal,
    BackHandler
} from "react-native";
import { processText, formatDateTime, roundNumber } from "../lib/utils";
import {} from "../lib/data";
import { cocForm } from "../lib/forms";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions,
    ScreenLoader,
    Loader
} from "./";

import {
    useGetMinCocsQuery,
    useDeleteMinCocMutation
} from "../redux/ministry/ministryApiSlice";
import {
    useGetDeptCocsQuery,
    useDeleteDeptCocMutation
} from "../redux/department/departmentApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const CocsList = ({ from, minId, navigation, cocsModal, setCocsModal }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [dropDown, setDropDown] = useState(false);
    const [idx, setIdx] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [allCocs, setAllCocs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const {
        data: cocs,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = from === "ministry"
        ? useGetMinCocsQuery(minId)
        : useGetDeptCocsQuery(minId);
    const [
        deleteCoc,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] =
        from === "ministry"
            ? useDeleteMinCocMutation()
            : useDeleteDeptCocMutation();
    useEffect(() => {
        setLoading(true);
        try {
            if (cocs && cocs !== undefined) {
                const sorted = [...cocs].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setAllCocs(cocs);
            }
        } catch (error) {
            console.log("cocserror", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [cocs]);
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
        setFormArray(cocForm);
        setValue({
            title: "",
            text: "",
            body: ""
        });
        setCocsModal(false);
        navigation.navigate(from === "ministry" ? "FeedForm" : "DFeedForm", {
            name: "coc",
            action: "create",
            minId: minId,
            multiple: false
        });
    };

    const isExpired = date => {
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
            const clickedArr = allCocs.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllCocs(clickedArr);
            } else {
                setAllCocs(cocs);
            }
        } else {
            setAllCocs(cocs);
        }
    }, [filter, searchTerm]);

    useEffect(() => {
        const backAction = () => {
            if (cocsModal) {
                setCocsModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [cocsModal]);
    const handleDelete = cocId => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(cocId);
                const res = await deleteCoc({ minId, cocId });
            } catch (error) {
                console.log("del", deleteError);
                throw new Error(error.message);
            } finally {
                setDeleting(false);
                setDeletingItem(null);
            }
        };
        Alert.alert(
            "Delete This Coc",
            "Are you sure you want to delete this coc",
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
        setFormArray(cocForm);
        setValue(item);
        setCocsModal(false);
        navigation.navigate("FeedForm", {
            name: "coc",
            action: "edit",
            minId: minId,
            multiple: false
        });
    };
    let content;
    content = (
        <FlatList
            keyExtractor={d => d._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allCocs}
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
    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={cocsModal}
            onRequestClose={() => setCocsModal(false)}
        >
            <View className="flex-1 ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <Text className="font-semibold capitalize text-title">
                        Cocs
                    </Text>
                </View>
                <SearchFilter
                    data={cocs ? cocs : []}
                    searchTerm={searchTerm}
                    filterCond={["title", "body"]}
                    sortCond={["title", "newest", "drange"]}
                    setSearchTerm={setSearchTerm}
                    filter={filter}
                    setFilter={setFilter}
                    searchedData={allCocs || []}
                    setData={setAllCocs}
                />
                {content}
            </View>
            <View className="absolute top-0 right-4">
                <CusIcon
                    action={() => setCocsModal(prev => !prev)}
                    bg="bg-primary"
                    color="text-white"
                    name="close"
                />
            </View>

            <AddButton action={() => handleNavigation()} />
        </Modal>
    );
};
export default CocsList;
