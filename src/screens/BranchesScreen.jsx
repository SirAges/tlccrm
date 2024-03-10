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
    useGetBranchsQuery,
    useDeleteBranchMutation
} from "../redux/branch/branchApiSlice";

import { branchForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const BranchesScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [toggleModal, setToggleModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [allBranches, setAllBranches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mapDetails, setMapDetails] = useState({
        lng: 1,
        lat: 1,
        branch: "",
        about: ""
    });
    const [filter, setFilter] = useState(null);
    const {
        data: branches,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetBranchsQuery("brancheslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [
        deleteBranch,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteBranchMutation();
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    useEffect(() => {
        try {
            setLoading(true);
            if (branches && branches !== undefined) {
                setAllBranches(branches);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [branches]);

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
                await deleteBranch(id);
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
            "Delete This Branch",
            "Are you sure you want to delete this branch",
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
        setFormArray(branchForm);
        setValue(item);
        navigation.navigate("BranchForm", {
            name: "Branch",
            action: "edit",
            multiple: false
        });
    };
    const handleNavigation = () => {
        setFormArray(branchForm);
        setValue({
            title: "",
            image: "",
            pastor: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            address: "",
            postalCode: "",
            geoLocation: {
                lng: "",
                lat: ""
            }
        });
        navigation.navigate("BranchForm", {
            name: "branch",
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

    const [idx, setIdx] = useState(null);

    const handleMap = b => {
        if (b) {
            console.log("b", b);
            setMapDetails({
                lng: b.geoLocation.lng || 1,
                lat: b.geoLocation.lat || 1,
                branch: b.name,
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
            const clickedArr = allBranches.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllBranches(clickedArr);
            } else {
                setAllBranches(branches);
            }
        } else {
            setAllBranches(branches);
        }
    }, [filter, searchTerm]);

    let content;

    content = (
        <FlatList
            keyExtractor={b => b._id}
            data={allBranches}
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
                                    {b.title}
                                </Text>
                                <CusIcon
                                    action={() => handleMap(b)}
                                    name="location-outline"
                                />

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
                                    {b.image && (
                                        <View className="w-full h-36 ">
                                            <Image
                                                source={{ uri: b.image }}
                                                style={{
                                                    resizeMode: "cover"
                                                }}
                                                className="w-full h-full"
                                            />
                                        </View>
                                    )}
                                    <Text className="text-justify text-lg text-body">
                                        {b.body}
                                    </Text>
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            Date Opened:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {formatDate(b.createdAt)}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            address:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.address}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            Pastor:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.pastor}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            Contact:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.phone}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            country:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.country}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            state:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.state}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            city:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.city}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-center space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            postal code:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {b.postalCode}
                                        </Text>
                                    </View>
                                    <Separator />
                                    <View className="flex-row items-start space-x-2">
                                        <Text className="capitalize text-primary  font-semibold">
                                            Bank Accounts:
                                        </Text>
                                        <Text className="font-semibold capitalize">
                                            {processText(b.bankAccount)}
                                        </Text>
                                    </View>
                                    <Separator />
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
                Branches
            </Text>

            <SearchFilter
                data={branches}
                searchTerm={searchTerm}
                filterCond={["title", "body", "address"]}
                sortCond={["title", "newest"]}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allBranches}
                setData={setAllBranches}
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
                            title={mapDetails.branch}
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
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default BranchesScreen;
