import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
// import { sermons } from "../lib/data";
const Sermon = ({ title, size, horizontal, sermons }) => {
    const [data, setData] = useState(sermons);

    return (
        <View className="px-2 py-1 mb-1 bg-white">
            <Text className="capitalize font-medium text-title">{title}</Text>
            <FlatList
                keyExtractor={s => s._id}
                horizontal={horizontal}
                initialNumToRender={2}
                data={data}
                renderItem={({ item: s }) => (
                    <View className="mx-1 my-1">
                        <View className={`image ${size} rounded-lg`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                source={s.image}
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
                                {s.program}
                            </Text>
                        </View>
                        <View
                            className="absolute title h-fit px-2 py-1 w-full bottom-0
                        bg-primary/80 rounded-b-lg"
                        >
                            <Text className="text-white font-semibold text-sm capitalize">
                                {s.title}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};
export default Sermon;
