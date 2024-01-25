import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { CusIcon, Separator } from "../components";
import { processText } from "../lib/utils";

const SHymnScreen = ({ route }) => {
    const { hymn: h } = route.params;
    const soundRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [soundPath, setSoundPath] = useState(null);

    useEffect(() => {
      

        const loadAudio = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(h.audio);
                soundRef.current = sound;
            } catch (error) {
                console.error("Error loading audio:", error);
            }
        };

        loadAudio();

        // Unload the sound when the component unmounts
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, [soundRef]);

    const togglePlayPause = async () => {
        if (soundRef.current) {
            if (isPlaying) {
                await soundRef.current.pauseAsync();
            } else {
                await soundRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stopSound = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
          
            setIsPlaying(false);
        }
    };

    const replaySound = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.playAsync();
            setIsPlaying(true);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View className="w-full shadow-lg shadow-black bg-white py-2">
                    <View className="flex-row items-center">
                        <View className="justify-center items-center bg-primary rounded-r-md px-2 py-2">
                            <Text className="text-lg font-extrabold text-white">
                                {h.index}
                            </Text>
                        </View>
                        <Text className="max-w-[85%] text-xl font-extrabold uppercase tracking-widest px-2">
                            {h.title}
                        </Text>
                    </View>
                </View>

                <ScrollView>
                    <View className="flex-1 px-2 space-y-5">
                        {h.body.map(v => (
                            <View className="py-2 space-y-2" key={v._id}>
                                <View className="flex-row space-x-1">
                                    <Text className="max-h-12 px-2 py-2 font-extrabold text-xl bg-primary text-white">
                                        {v.number}
                                    </Text>
                                    <View className="bg-primary pr-0.5" />
                                    <Text className="text-title text-lg font-medium capitalize max-w-[90%]">
                                        {processText(v.verse)}
                                    </Text>
                                </View>
                                {h.chorus || v.chorus ? (
                                    <Text className="text-body italic decoration-from-font pl-12 text-lg font-semibold capitalize">
                                        {processText(
                                            h.chorus ? h.chorus : v.chorus
                                        )}
                                    </Text>
                                ) : null}
                            </View>
                        ))}
                    </View>
                    <Separator />
                    <View className="py-3 px-2 space-y-2">
                        <View className="flex-row items-center space-x-2">
                            <Text className="capitalize font-medium text-title">
                                Author:
                            </Text>
                            <Text className="text-md font-medium text-primary">
                                {h.author}
                            </Text>
                        </View>
                        <View className="items-start space-x-2">
                            <Text className="capitalize font-medium text-primary">
                                Brief history:
                            </Text>
                            <Text className="text-lg text-title">
                                {processText(h.history)}
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View className="flex-row items-center justify-around h-fit bg-primary py-2 px-2">
                    <CusIcon
                        color="text-white"
                        action={() => togglePlayPause()}
                        name={isPlaying ? "pause" : "play"}
                    />
                    <CusIcon
                        color="text-white"
                        action={() => replaySound()}
                        name="repeat"
                    />
                    <CusIcon
                        color="text-white"
                        action={() => stopSound()}
                        name="stop"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SHymnScreen;
