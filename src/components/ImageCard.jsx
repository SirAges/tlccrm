import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react"; // Import useRef
import {
    Image,
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CusIcon } from "./";

const ImageCard = ({ url }) => {
    const urlSplit = url.split("/");
    const filename = urlSplit[urlSplit.length - 1];
    console.log("filename", filename);

    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Use useRef for download
    const downloadRef = useRef(null);

    const callback = progress => {
        const percentProgress = (
            (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
            100
        ).toFixed(0);
        setDownloadProgress(percentProgress);
    };

    useEffect(() => {
        const getDownloadable = async () => {
            try {
                const savedDownloadJSON =
                    await AsyncStorage.getItem("download");

                if (
                    savedDownloadJSON !== undefined &&
                    savedDownloadJSON !== null
                ) {
                    const savedDownload = JSON.parse(savedDownloadJSON);
                    const downloadResumable =
                        FileSystem.createDownloadResumable(
                            savedDownload.url,
                            savedDownload.fileUri,
                            savedDownload.options,
                            callback,
                            savedDownload.resumeData
                        );

                    // Set downloadRef.current
                    downloadRef.current = downloadResumable;
                    setIsPaused(true);
                    setIsDownloading(true);
                } else {
                    const downloadResumable =
                        FileSystem.createDownloadResumable(
                            url,
                            FileSystem.documentDirectory + filename,
                            {},
                            callback
                        );
                    // Set downloadRef.current
                    downloadRef.current = downloadResumable;
                }
            } catch (e) {
                console.log(e);
            }
        };
        getDownloadable();

        return async () => {
            if (isDownloading) {
                await pauseDownload();
            }
        };
    }, []);

    const downloadFile = async () => {
        setIsDownloading(true);
        const { uri } =
            downloadRef.current && (await downloadRef.current.downloadAsync());
        console.log("uri", uri);
        AsyncStorage.removeItem("download");
        setIsDownloaded(true);
    };

    const pauseDownload = async () => {
        setIsPaused(true);
        await downloadRef.current.pauseAsync();
        AsyncStorage.setItem(
            "download",
            JSON.stringify(downloadRef.current.savable())
        );
        console.log("Paused download");
    };

    const resumeDownload = async () => {
        setIsPaused(false);
        const { uri } = await downloadRef.current.resumeAsync();
        AsyncStorage.removeItem("download");
        setIsDownloaded(true);
    };

    const resetDownload = async () => {
        setIsDownloaded(false);
        setIsDownloading(false);
        setIsPaused(false);
        setDownloadProgress(0);

        AsyncStorage.removeItem("download");
        const downloadResumable = FileSystem.createDownloadResumable(
            url,
            FileSystem.documentDirectory + filename,
            {},
            callback
        );
        // Set downloadRef.current
        downloadRef.current = downloadResumable;
    };

    const exportDownload = async () => {
        await downloadFile();
        if (Platform.OS === "android") {
            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(
                    FileSystem.documentDirectory + filename,
                    { encoding: FileSystem.EncodingType.Base64 }
                );
                console.log("base64", base64);

                await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    filename,
                    "image/*"
                )
                    .then(async uri => {
                        await FileSystem.writeAsStringAsync(uri, base64, {
                            encoding: FileSystem.EncodingType.base64
                        });
                    })
                    .catch(e => console.log(e));
            }
        } else {
            await Sharing.shareAsync(FileSystem.documentDirectory + filename);
        }
    };

    return (
        <View className="relative justify-center items-center h-full w-screen">
            <View className=" flex-row absolute h-fit top-24 right-24">
                {isDownloading && (
                    <Text className="text-white">{downloadProgress}</Text>
                )}
            </View>
            <TouchableOpacity
                className=" relative flex-1 w-full "
                onLongPress={downloadFile}
            >
                <Image
                    className="w-full h-full"
                    style={{ resizeMode: "contain" }}
                    source={{ uri: url }}
                />
            </TouchableOpacity>
            <View className="">
                <Text onPress={exportDownload} className="font-bold text-white">
                    export
                </Text>
            </View>
        </View>
    );
};

export default ImageCard;