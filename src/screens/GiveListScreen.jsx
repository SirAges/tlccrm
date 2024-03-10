import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Modal,
    BackHandler,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { processText, formatDate } from "../lib/utils";

import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    ScreenLoader,
    Loader
} from "../components";

import {
    useGetGivesQuery,
    useDeleteGiveMutation
} from "../redux/give/giveApiSlice";

import { giveForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const GiveListScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [toggleModal, setToggleModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [allGives, setAllGives] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mapDetails, setMapDetails] = useState({
        lng: 1,
        lat: 1,
        give: "",
        about: ""
    });
    const [filter, setFilter] = useState(null);
    const {
        data: gives,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetGivesQuery("giveslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [
        deleteGives,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteGiveMutation();
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    useEffect(() => {
        try {
            setLoading(true);
            if (gives && gives !== undefined) {
                setAllGives(gives);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [gives]);

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
                await deleteGives(id);
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
            "Delete This Gives",
            "Are you sure you want to delete this give",
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
        setFormArray(giveForm);
        setValue(item);
        navigation.navigate("GiveForm", {
            name: "Gives",
            action: "edit",
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

    const [idx, setIdx] = useState(null);

    const handleMap = b => {
        if (b) {
            console.log("b", b);
            setMapDetails({
                lng: b.geoLocation.lng || 1,
                lat: b.geoLocation.lat || 1,
                give: b.name,
                about: b.body
            });
            setToggleModal(true);
        }
    };
    useEffect(() => {
        const backAction = () => {
            if (toggleModal) {
                setToggleModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [toggleModal]);

    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allGives.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllGives(clickedArr);
            } else {
                setAllGives(gives);
            }
        } else {
            setAllGives(gives);
        }
    }, [filter, searchTerm]);

    let content;

    content = (
        <FlatList
            keyExtractor={b => b._id}
            data={allGives}
            refreshing={isRefreshing}
            onRefresh={refresh}
            maxToRenderPerBatch={5}
            renderItem={({ item: b }) => (
                <TouchableWithoutFeedback onPress={() => handleDropdown(b._id)}>
                    <View
                        className="h-fit 
                        bg-white shadow-sm shadow-black mx-2 my-2 rounded-md flex-row items-center"
                    >
                        <View className="flex-1">
                            <View className="flex-1 justify-between items-center flex-row py-4">
                                <Text className="flex-1 capitalize font-semibold text-xl px-2  text-justify">
                                    {b.name}
                                </Text>

                                <CusIcon
                                    action={() => handleEdit(b)}
                                    size={20}
                                    name="create"
                                />
                                {deleting && b._id === deletingItem && (
                                    <Loader />
                                )}
                                <CusIcon
                                    color="text-danger"
                                    action={() => handleDelete(b._id)}
                                    size={20}
                                    name="trash"
                                />
                            </View>

                            {dropDown && idx === b._id && (
                                <View className="px-2 space-y-2 py-2">
                                    <Separator />
                                    <View
                                        className="flex-row space-x-2
                                    items-start"
                                    >
                                        <Text
                                            className="capitalize font-medium
                                        text-lg text-primary"
                                        >
                                            purpose:
                                        </Text>
                                        <Text
                                            className="capitalize font-medium
                                        text-xl text-body"
                                        >
                                            {b.purpose}
                                        </Text>
                                    </View>
                                    <View
                                        className="flex-row space-x-2
                                    items-start"
                                    >
                                        <Text
                                            className="capitalize font-medium
                                        text-lg text-primary"
                                        >
                                            amount:
                                        </Text>
                                        <Text
                                            className="capitalize font-medium
                                        text-xl text-body"
                                        >
                                            {b.amount}
                                        </Text>
                                    </View>
                                    <View
                                        className="flex-row space-x-2
                                    items-start"
                                    >
                                        <Text
                                            className="capitalize font-medium
                                        text-lg text-primary"
                                        >
                                            note:
                                        </Text>
                                        <Text
                                            className="capitalize font-medium
                                        text-xl text-body"
                                        >
                                            {b.body}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );
    if (isError || error?.data){
        content = <ScreenLoader refresh={refresh} text="no content try again..." />;}
    if (loading || isLoading) {content = <ScreenLoader text="loading data..." />;}
    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="uppercase text-2xl text-primary font-extrabold p-2  text-center">
                Gives
            </Text>

            <SearchFilter
                data={gives}
                searchTerm={searchTerm}
                filterCond={["name", "amount", "purpose"]}
                sortCond={["name", "newest"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={gives || []}
                setData={setAllGives}
            />

            <View className="bg-white  max-w-full flex-1">{content}</View>

            <Modal
                className="w-full h-full"
                animationType="slide"
                transparent={false}
                visible={toggleModal}
                onRequestClose={() => setToggleModal(false)}
            >
                <View className="flex-1">
                    <MapView
                        className="flex-1"
                        initialRegion={{
                            latitude: mapDetails.lat,
                            longitude: mapDetails.lng,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        mapType="mutedStandard"
                    >
                        <Marker
                            coordinate={{
                                latitude: mapDetails.lat,
                                longitude: mapDetails.lng
                            }}
                            title={mapDetails.give}
                            description={mapDetails.about}
                            identifier="origin"
                            pinColor="#0b6e4f"
                        />
                    </MapView>
                    <View className="absolute top-4 right-4">
                        <CusIcon
                            action={() => setToggleModal(prev => !prev)}
                            bg="bg-primary"
                            color="text-white"
                            name="close"
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
export default GiveListScreen;
