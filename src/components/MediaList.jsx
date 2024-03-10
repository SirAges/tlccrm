import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Modal,
    BackHandler
} from "react-native";
import {
    processText,
    formatDateTime,
    roundNumber,
    getUser
} from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions
} from "../components";

import { GlobalContext } from "../hooks/GlobalContext";
const MediaList = ({ allMedia, setAllMedia, mediaModal, setMediaModal }) => {
  

    const [idx, setIdx] = useState(null);

    useEffect(() => {
        const backAction = () => {
            if (mediaModal) {
                setMediaModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [mediaModal]);

    const handleImage = i => {
        setIdx(i);
    };

    let content;
    content = (
        <FlatList
            keyExtractor={m => m._id}
            numColumns={3}
            data={allMedia}
            renderItem={({ item: m }) => (
                <TouchableWithoutFeedback onPress={() => handleImage(m)}>
                    <View
                        className="h-24 flex-1 rounded-sm shadow-sm
                                shadow-black bg-white px-1 py-1 mx-1 my-1"
                    >
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="w-full h-full rounded-sm"
                            source={{ uri: m }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    );
    if (!allMedia?.length) content = <Text className="text-2xl">no media</Text>;
    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={mediaModal}
            onRequestClose={() => setMediaModal(false)}
        >
            <View className="flex-1 ">
                <View className="px-5 py-2 bg-background flex-row items-center space-x-2">
                    <Text className="font-semibold capitalize text-title">
                        Media
                    </Text>
                </View>

                <View className="">{content}</View>

                <View className="absolute top-0 right-4">
                    <CusIcon
                        action={() => setMediaModal(prev => !prev)}
                        bg="bg-primary"
                        color="text-white"
                        name="close"
                    />
                </View>
            </View>

            {idx ? (
                <TouchableWithoutFeedback onPress={() => setIdx(null)}>
                    <View
                        className="absolute flex-1 w-full h-full
                     bg-black/70 items-center justify-center"
                    >
                        <View
                            className=" rounded-sm shadow-sm h-52 w-full
                                shadow-black bg-white px-1 py-1 mx-1 my-1"
                        >
                            <Image
                                style={{ resizeMode: "contain" }}
                                className="w-full h-full rounded-sm"
                                source={{ uri: idx }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ) : null}
        </Modal>
    );
};
export default MediaList;
