import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    BackHandler
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Sharing from "expo-sharing";
import { CusIcon } from "../components";
const LiveScreen = ({ navigation }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPlaying, setPlaying] = useState(true);
    const [isPortrait, setIsPortrait] = useState(false);
    const [volume, setVolume] = useState(1);
    const [orient, setOrient] = useState(1);

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    useEffect(() => {
        const onFocus = () => {
            if (video.current) {
                video.current.playAsync();
            }
        };

        const onBlur = () => {
            if (video.current) {
                video.current.pauseAsync();
            }
        };

        const focusSubscription = navigation.addListener("focus", onFocus);
        const blurSubscription = navigation.addListener("blur", onBlur);

        return () => {
            // focusSubscription.remove();
            // blurSubscription.remove();
        };
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
            // Perform your function here
            const orientation = ScreenOrientation.OrientationLock.PORTRAIT;

            ScreenOrientation.lockAsync(orientation);
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove(); // Remove the event listener on component unmount
        };
    }, []);

    const onPlaybackStatusUpdate = newStatus => {
        setStatus(newStatus);
        setLoading(!newStatus.isLoaded);
    };

    const togglePlayPause = () => {
        setPlaying(!isPlaying);
        isPlaying ? video.current.pauseAsync() : video.current.playAsync();
    };

    const handleVolumeChange = value => {
        setVolume(value);
        video.current.setVolumeAsync(value);
    };

    const shareVideo = async () => {
        const videoUrl =
            "https://webstreaming-2.viewmedia.tv/web_024/Stream/playlist.m3u8";
        try {
            await Sharing.shareAsync(videoUrl);
        } catch (error) {
            console.error("Error sharing video:", error.message);
        }
    };

    const toggleOrientation = async () => {
        await setIsPortrait(screenWidth < screenHeight);
        const orientation = isPortrait
            ? ScreenOrientation.OrientationLock.LANDSCAPE
            : ScreenOrientation.OrientationLock.PORTRAIT;
        ScreenOrientation.lockAsync(orientation);
    };
    const handleBackPress = () => {
        if (video.current) {
            return video.current.stopAsync();
        }
        return false;
    };

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                source={{
                    uri: "https://webstreaming-2.viewmedia.tv/web_024/Stream/playlist.m3u8"
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                style={styles.video}
                volume={volume}
            />
            {loading && (
                <View style={styles.loader}>
                    <Text style={styles.controlText}>Loading...</Text>
                </View>
            )}
            <View style={styles.controls}>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text style={styles.controlText}>
                        {isPlaying ? (
                            <CusIcon bg="bg-gray-100/50" name="pause" />
                        ) : (
                            <CusIcon disabled={loading} name="play" />
                        )}
                    </Text>
                </TouchableOpacity>
                <Slider
                    style={styles.volumeSlider}
                    minimumValue={0}
                    maximumValue={1}
                    value={volume}
                    onValueChange={handleVolumeChange}
                />
                <TouchableOpacity onPress={shareVideo}>
                    <Text style={styles.controlText}>
                        <CusIcon
                        bg="bg-gray-100/50"
                        disabled={loading} name="share-social" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleOrientation}>
                    <Text style={styles.controlText}>
                        <CusIcon bg="bg-gray-100/50" name={isPortrait ? "contract" : "expand"} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray"
    },
    video: {
        alignSelf: "stretch",
        flex: 1
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    controls: {
        position: "absolute",
        bottom: 20,
        left: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    controlText: {
        color: "white",
        fontSize: 16,
        marginRight: 10
    },
    volumeSlider: {
        width: 100,
        marginRight: 10
    }
});

export default LiveScreen;
