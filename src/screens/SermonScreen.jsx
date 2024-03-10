import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useGetSermonsQuery,
    useDeleteSermonMutation
} from "../redux/sermon/sermonApiSlice";
import { textTruncate, formatDateAgo } from "../lib/utils";
import { sermonForm } from "../lib/forms";
import {
    SearchFilter,
    Reactions,
    CardActions,
    Sermon,
    AddButton,
    Form,
    ScreenLoader,
    Loader
} from "../components/";
import { announcementForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const SermonScreen = ({ navigation, route }) => {
    const { obj, setObj, setValue, setFormArray } = useContext(GlobalContext);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [allSermons, setAllSermons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const {
        data: sermons,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetSermonsQuery("sermonlist");
    const [
        deleteSermon,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteSermonMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (sermons && sermons !== undefined) {
                setAllSermons(sermons);
                console.log("sermon", sermons);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [sermons]);
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
        setFormArray(sermonForm);
        setValue({
            title: "",
            image: [],
            text: "",
            body: [],
            program: "",
            introduction: ""
        });

        setObj({
            point: "",
            title: "",
            text: "",
            body: ""
        });
        navigation.navigate("SermonForm", {
            name: "sermon",
            action: "create",
            multiple: false
        });
    };

    const popularSermons =
        sermons &&
        sermons !== undefined &&
        [...sermons]
            .sort(
                (a, b) =>
                    b.comments.length +
                    b.reactions.length -
                    (a.comments.length + a.reactions.length)
            )
            .slice(0, 10);
    console.log("popularSermons", popularSermons);

    const onProgramClicked = (clicked, fil) => {
        setFilter(fil);
        setSearchTerm(clicked);
    };
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allSermons.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllSermons(clickedArr);
            } else {
                setAllSermons(sermons);
            }
        } else {
            setAllSermons(sermons);
        }
    }, [filter, searchTerm]);
    let content;
    content = (
        <FlatList
            keyExtractor={f => f._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allSermons}
            renderItem={({ item: f }) => (
                <View className="space-y-1 mb-1 py-2 bg-white">
                    <View className="flex-row justify-between items-center px-2">
                        <Text
                            onPress={() =>
                                navigation.navigate("SSermonScreen", {
                                    feed: f
                                })
                            }
                            className="text-title text-lg font-semibold capitalize"
                        >
                            {textTruncate(f.title, 30)}
                        </Text>
                        <Text
                            onPress={() =>
                                onProgramClicked(f.program, "program")
                            }
                            className="text-primary  px-2 text-xs  font-semibold"
                        >
                            {f.program}
                        </Text>
                    </View>
                    <View className="w-full h-52">
                        <Image
                            className="w-full h-full"
                            style={{ resizeMode: "cover" }}
                            source={{ uri: f.image[0] }}
                        />
                    </View>
                    <Text className="text-body px-2">
                        {textTruncate(f.introduction, 100)}
                    </Text>

                    <View>
                        <CardActions
                            navigation={navigation}
                            feed={f}
                            from="sermon"
                        />
                    </View>
                </View>
            )}
        />
    );
    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="error occured try again..." />
        );
    if (!sermons?.length)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className=" flex-1 bg-white">
            <SearchFilter
                data={sermons}
                filterCond={["title", "program"]}
                sortCond={["title", "newest", "popular"]}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allSermons}
                setData={setAllSermons}
            />
            <Sermon
                horizontal={true}
                sermons={popularSermons}
                navigation={navigation}
                title={popularSermons?.length ? "popular sermon" : null}
                size={"h-40 w-44"}
            />
            <View className="flex-1 bg-gray-500">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default SermonScreen;
