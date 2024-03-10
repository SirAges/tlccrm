import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import {
    textTruncate,
    getDays,
    getMonth,
    getYear,
    getDayText,
    extractListArray,
    processText
} from "../lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
const SDevotionalScreen = ({ route }) => {
    const { devotion: d } = route.params;

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="flex-1 bg-white shadow-lg shadow-black rounded-lg mx-3 my-2">
                <ScrollView className="flex-1">
                    <View>
                        <View className="flex-row">
                            <View className="items-center justify-center bg-primary rounded-tl-lg px-0.5">
                                <Text className="uppercase font-extrabold text-xs text-white  tracking-[7px]">
                                    {getDayText(d.createdAt)}
                                </Text>
                                <Text className="uppercase font-extrabold text-xs text-white">
                                    day {getDays(d.createdAt)}
                                </Text>
                                <Text className="uppercase text-md tracking-[6px] leading-[15px] font-extrabold text-white">
                                    {getMonth(d.createdAt)}
                                </Text>
                                <Text className="uppercase font-extrabold text-xs text-white tracking-[4px]">
                                    {getYear(d.createdAt)}
                                </Text>
                            </View>
                            <View className="py-1 px-2 max-w-[300px]">
                                <Text className="font-extrabold uppercase ">
                                    theme: {processText(d.title)}
                                </Text>
                                <Text className="capitalize text-sm text-title">
                                    Text: {processText(d.text)}
                                </Text>
                            </View>
                        </View>
                        <View className="px-2 pb-2 space-y-1">
                            <Text className="capitalize font-semibold">
                                Memory Verse
                            </Text>

                            <Text className="capitalize text-primary font-semibold text-xs">
                                {processText(d.memoryVerse.text)}
                            </Text>
                            <Text className="text-md text-body ">
                                {processText(d.memoryVerse.body)}
                            </Text>
                        </View>
                        <View>
                            <Text className="font-semibold text-lg uppercase  px-2">
                                Message:
                            </Text>
                            <Text className="text-md text-body text-md tracking-wider text-justify leading-5 px-2 py-1">
                                {processText(d.body)}
                            </Text>
                        </View>
                        {d.prayer && (
                            <View className="px-2 pb-3 space-y-2">
                                <Text className="font-semibold text-sm uppercase  ">
                                    Worship/praise God and then take the
                                    following prayer points:
                                </Text>

                                <View className=" space-y-2">
                                    {processText(d.prayers).map((p, i) => (
                                        <View
                                            className="flex-row items-center
                                    space-x-2"
                                        >
                                            <Text
                                                className="font-medium  w-5
                   text-white text-lg bg-primary text-center"
                                            >
                                                {i + 1}
                                            </Text>

                                            <Text className="text-body flex-1">
                                                {processText(p)}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default SDevotionalScreen;
