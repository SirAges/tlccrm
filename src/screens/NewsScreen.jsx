import { View, Text, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { news } from "../lib/data";
import { textTruncate, formatDateAgo } from "../lib/utils";
import { SearchFilter, Reactions, CardActions, News } from "../components/";
const NewsScreen = ({ navigation }) => {
    const [allNews, setAllNews] = useState(news);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [clickedDate, setClickedDate] = useState(null);
    const popularNews = [...news]
        .sort(
            (a, b) =>
                b.comments.length +
                b.reactions.length -
                (a.comments.length + a.reactions.length)
        )
        .slice(0, 10);

    const onDateClicked = (clicked)=> {
        setClickedDate(clicked);
        
    };
    useEffect(() => {
      
        if (clickedDate) {
            const clickedArr = allNews.filter(f => {
            const  dateA= new Date(f._createdAt)
            const  dateB= new Date(clickedDate)
            return dateA>dateB
              
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

    return (
        <SafeAreaView className=" flex-1 bg-white">
            <View className="h-fit bg-gray-500">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <SearchFilter
                                data={news}
                             filterCond={"body"}   searchTerm={searchTerm}
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
                                title={"popular news"}
                                size={"h-40 w-44"}
                            />
                        </>
                    }
                    keyExtractor={n => n._id}
                    horizontal={false}
                    initialNumToRender={2}
                    data={allNews}
                    renderItem={({ item: n }) => (
                        <View className="space-y-1 mb-1 py-2 bg-white">
                            <View className="flex-row justify-between items-center px-2">
                                <Text
                                    onPress={() =>
                                        navigation.navigate("SNewsScreen", {
                                            feed: n
                                        })
                                    }
                                    className="text-title text-md font-semibold capitalize"
                                >
                                    {textTruncate(n.title, 35)}
                                    
                                </Text>
                                <Text
                                    onPress={() =>
                                        onDateClicked(
                                            n._createdAt,
                                            "_createdAt"
                                        )
                                    }
                                    className="bg-primary text-white text-[8px]  px-2 py-1 font-semibold rounded-br-md rounded-tl-md"
                                >
                                    {formatDateAgo(n._createdAt)}
                                </Text>
                            </View>
                            <View className="w-full h-52">
                                <Image
                                    className="w-full h-full"
                                    style={{ resizeMode: "cover" }}
                                    source={n.image}
                                />
                            </View>
                            <Text className="text-body px-2">
                                {textTruncate(n.body, 100)}
                            </Text>
                            <View className="py-0.5">
                                <Reactions navigation={navigation} feed={n} />
                            </View>

                            <View>
                                <CardActions navigation={navigation} feed={n} />
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
export default NewsScreen;
