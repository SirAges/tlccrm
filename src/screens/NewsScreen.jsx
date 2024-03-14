import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useGetNewsQuery,
    useDeleteNewsMutation
} from "../redux/news/newsApiSlice";
import { textTruncate, formatDateAgo } from "../lib/utils";
import { newsForm } from "../lib/forms";
import {
    SearchFilter,
    Reactions,
    CardActions,
    News,
    AddButton,
    Form,
    ScreenLoader,
    Loader,
    ImageGrid
} from "../components/";
import { announcementForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const NewsScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [allNews, setAllNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);

    const {
        data: news,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetNewsQuery("newslist");
    const [
        deleteNews,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteNewsMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (news && news !== undefined) {
                setAllNews(news);
                console.log("news", news);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [news]);
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
        setFormArray(newsForm);
        setValue({
            title: "",
            image: [],
            body: ""
        });
        navigation.navigate("NewsForm", {
            name: "news",
            action: "create",
            multiple: false
        });
    };

    const [clickedDate, setClickedDate] = useState(null);

    const popularNews =
        news &&
        news !== undefined &&
        [...news]
            .sort(
                (a, b) =>
                    b.comments.length +
                    b.reactions.length -
                    (a.comments.length + a.reactions.length)
            )
            .slice(0, 10);

    const onDateClicked = clicked => {
        setClickedDate(clicked);
    };
    useEffect(() => {
        if (clickedDate) {
            const clickedArr = allNews.filter(f => {
                const dateA = new Date(f.createdAt);
                const dateB = new Date(clickedDate);
                return dateA > dateB;
            });
            if (clickedArr.length) {
                setAllNews(clickedArr);
            } else {
                setAllNews(news);
            }
        } else {
            setAllNews(news);
        }
    }, [clickedDate]);
    let content;
    content = (
        <FlatList
            keyExtractor={f => f._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allNews}
            renderItem={({ item: f }) => (
                <View className="space-y-1 mb-1 py-2 bg-white">
                    <View className="flex-row justify-between items-center px-2">
                        <Text
                            onPress={() =>
                                navigation.navigate("SNewsScreen", {
                                    feed: f
                                })
                            }
                            className="text-title text-lg font-semibold capitalize"
                        >
                            {textTruncate(f.title, 30)}
                        </Text>
                        <Text
                            onPress={() => onDateClicked(f.createdAt)}
                            className="text-primary  px-2 text-xs  font-semibold"
                        >
                            {formatDateAgo(f.createdAt)}
                        </Text>
                    </View>
                   <ImageGrid images={f.image} />
                    <Text className="text-body px-2">
                        {textTruncate(f.body, 100)}
                    </Text>

                    <View>
                        <CardActions
                            navigation={navigation}
                            feed={f}
                            from="news"
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
    if (!news?.length)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
    return (
        <SafeAreaView className=" flex-1 bg-white">
            <SearchFilter
                data={news}
                filterCond={["title", "program"]}
                sortCond={["title", "newest", "popular"]}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
                searchedData={allNews}
                setData={setAllNews}
            />
            <News
                horizontal={true}
                news={popularNews}
                navigation={navigation}
                title={popularNews?.length ? "popular news" : null}
                size={"h-40 w-44"}
            />
            <View className="flex-1 bg-gray-500">{content}</View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default NewsScreen;
