import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Modal,
    BackHandler
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { processText, formatDate } from "../lib/utils";
import { CusIcon, AddButton, SearchFilter, Separator } from "../components";
import { branches } from "../lib/data";
import { branchForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const BranchesScreen = ({ navigation }) => {
    const { setValue } = useContext(GlobalContext);
    useEffect(() => {
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
            lng: "",
            lat: ""
        });
    }, []);
    const [toggleModal, setToggleModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [allBranches, setAllBranches] = useState(branches);
    const [searchTerm, setSearchTerm] = useState("");
    const [mapDetails, setMapDetails] = useState({
        lng: 1,
        lat: 1,
        branch: "",
        about: ""
    });
    const [filter, setFilter] = useState(null);
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
        setMapDetails({
            lng: b.geoLocation.lng,
            lat: b.geoLocation.lat,
            branch: b.name,
            about: b.body
        });
        setToggleModal(prev => !prev);
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

            <View className="bg-white py-3 max-w-full flex-1">
                <FlatList
                    keyExtractor={b => b._id}
                    data={allBranches}
                    renderItem={({ item: b }) => (
                        <View
                            className="h-fit 
                        bg-white shadow-md shadow-black mx-2 my-2 rounded-md flex-row items-center"
                        >
                            <View className="flex-1">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(b._id)}
                                >
                                    <View className="flex-1 justify-between items-center flex-row py-4">
                                        <Text className="capitalize font-semibold text-xl px-2  text-justify">
                                            {b.title}
                                        </Text>
                                        <CusIcon
                                            action={() => handleMap(b)}
                                            name="location-outline"
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                {dropDown && idx === b._id && (
                                    <View className="px-2 space-y-2 py-2">
                                        <Separator />
                                        {b.image && (
                                            <View className="w-full h-36 ">
                                                <Image
                                                    source={b.image}
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
                                                {formatDate(b._createdAt)}
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
                    )}
                />
            </View>

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
            <AddButton
                action={() =>
                    navigation.navigate("FormScreen", {
                        name: "branch",
                        formArray: branchForm
                    })
                }
            />
        </SafeAreaView>
    );
};
export default BranchesScreen;
