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
import { processText, formatDateTime, roundNumber } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    ScreenLoader,
    Loader
} from "../components";
import { ministryForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    useGetMinistriesQuery,
    useDeleteMinistryMutation
} from "../redux/ministry/ministryApiSlice";
const MinistryScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [allMinistries, setAllMinistries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const {
        data: ministries,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetMinistriesQuery("ministrieslist", {
        // pollingInterval: 15000,

        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [
        deleteMinistry,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteMinistryMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (ministries && ministries !== undefined) {
                setAllMinistries(ministries);
                console.log("ministries", allMinistries);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [ministries]);
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
        setFormArray(ministryForm);
        setValue({
            title: "",
            image: [],
            body: "",
            
        });
        navigation.navigate("MinistryForm", {
            name: "ministry",
            action: "create",
            multiple: false
        });
    };
    let content;
    content = (
        <FlatList
            keyExtractor={m => m._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={ministries}
            renderItem={({ item: m }) => (
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate("SMinistryScreen", {
                            ministry: m
                        })
                    }
                >
                    <View
                        className="bg-white flex-1 mx-2 mt-1 mb-1 bg-white rounded-md
                            shadow-sm
                        shadow-black  "
                    >
                        <View
                            className="flex-row items-center
                            justify-between px-2"
                        >
                            <Text
                                className="text-lg font-semibold uppercase
                            px-2 py-2"
                            >
                                {m.title}
                            </Text>
                            <View
                                className="justify-center items-center
                                rounded-full bg-primary h-6 w-6"
                            >
                                <Text
                                    className=" text-white
                                     "
                                >
                                    {roundNumber(m.members.length)}
                                </Text>
                            </View>
                        </View>

                        {m.image && (
                            <View className="w-full h-52 bg-white">
                                <Image
                                    className=" w-full h-full"
                                    style={{ resizeMode: "cover" }}
                                    source={{ uri: m.image[0] }}
                                />
                            </View>
                        )}
                        <Text
                            className="text-md px-2 py-2 text-justify
                            text-body"
                        >
                            {m.body}
                        </Text>
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
            <View className=" flex-1 bg-white">
                <Text
                    className="text-2xl font-extrabold text-primary shadow-lg shadow-black
                    bg-white py-2 px-2 text-center
                uppercase"
                >
                    Connect with your specific ministry
                </Text>

                {content}
            </View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default MinistryScreen;
