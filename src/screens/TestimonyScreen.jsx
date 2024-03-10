import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useGetTestimoniesQuery,
    useDeleteTestimonyMutation
} from "../redux/testimony/testimonyApiSlice";
import { textTruncate, formatDateAgo } from "../lib/utils";
import { testimonyForm } from "../lib/forms";
import {
    SearchFilter,
    Reactions,
    CardActions,
    Testimony,
    AddButton,
    Form,
    ScreenLoader,
    Loader
} from "../components/";
import { announcementForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const TestimonyScreen = ({ navigation, route }) => {
    const { obj, setObj, setValue, setFormArray } = useContext(GlobalContext);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [allTestimonies, setAllTestimonies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const {
        data: testimonies,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetTestimoniesQuery("testimonylist");
    const [
        deleteTestimony,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteTestimonyMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (testimonies && testimonies !== undefined) {
                setAllTestimonies(testimonies);
                console.log("testimony", testimonies);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [testimonies]);
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
        setFormArray(testimonyForm);
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
        navigation.navigate("TestimonyForm", {
            name: "testimony",
            action: "create",
            multiple: false
        });
    };

    const popularTestimonies =
        testimonies &&
        testimonies !== undefined &&
        [...testimonies]
            .sort(
                (a, b) =>
                    b.comments.length +
                    b.reactions.length -
                    (a.comments.length + a.reactions.length)
            )
            .slice(0, 10);
    console.log("popularTestimonies", popularTestimonies);

    const onProgramClicked = (clicked, fil) => {
        setFilter(fil);
        setSearchTerm(clicked);
    };
    useEffect(() => {
        if (filter && searchTerm) {
            const clickedArr = allTestimonies.filter(
                f => f[filter].toLowerCase() === searchTerm.toLowerCase()
            );
            if (clickedArr.length) {
                setAllTestimonies(clickedArr);
            } else {
                setAllTestimonies(testimonies);
            }
        } else {
            setAllTestimonies(testimonies);
        }
    }, [filter, searchTerm]);
    let content;
    content = (
        <FlatList
            keyExtractor={f => f._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allTestimonies}
            renderItem={({ item: f }) => (
                <View className="space-y-1 mb-1 py-2 bg-white">
                    <View className="flex-row justify-between items-center px-2">
                        <Text
                            onPress={() =>
                                navigation.navigate("STestimonyScreen", {
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
                            from="testimony"
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
    if (!testimonies?.length)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className=" flex-1 bg-white">
            <SearchFilter
                data={testimonies}
                filterCond={["title", "program"]}
                sortCond={["title", "newest", "popular"]}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allTestimonies}
                setData={setAllTestimonies}
            />
            <Testimony
                horizontal={true}
                testimonies={popularTestimonies}
                navigation={navigation}
                title={popularTestimonies?.length ? "popular testimony" : null}
                size={"h-40 w-44"}
            />
            <View className="flex-1 bg-gray-500">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default TestimonyScreen;
