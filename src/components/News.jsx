import { useState, useEffect } from "react";
import { formatDateAgo } from "../lib/utils";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

const News = ({ size, title, horizontal, navigation, news }) => {
    
if(!news)return<Text>no news</Text>
    return (
        <View className="px-2 py-1 mb-1 bg-white">
            <Text className="capitalize font-medium text-title">{title}</Text>
            <FlatList
                keyExtractor={n => n._id}
                horizontal={horizontal}
                initialNumToRender={2}
                data={news}
                renderItem={({ item: n }) => (
                    <View className="mx-1 my-1">
                        <View className={`image ${size} rounded-lg`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                source={{uri:n.image[0]}}
                                className="w-full h-full rounded-lg"
                            />
                        </View>
                        <View
                            className="absolute program h-fit px-2 py-1 w-fit top-0
                            right-0
                        bg-primary rounded-tr-lg"
                        >
                            <Text
                                className="text-white font-semibold text-[8px]
                            capitalize"
                            >
                                {n.createdAt}
                            </Text>
                        </View>
                        <View
                            className="absolute title h-fit px-2 py-1 w-full bottom-0
                        bg-primary/80 rounded-b-lg"
                        >
                            <Text className="text-white font-semibold text-sm capitalize">
                                {n.title}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};
export default News;
