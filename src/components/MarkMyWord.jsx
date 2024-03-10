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

const MarkMyWord = ({ markMyWords, markMyWordsModal, setMarkMyWordsModal }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const w = markMyWords[0];
    const handleNavigation = () => {
        setFormArray(markMyWordForm);
        setValue({
            title: "",
            image: ""
        });
        navigation.navigate("FormScreen", {
            name: "mark My Word",
            multiple: false
        });
    };

    useEffect(() => {
        const backAction = () => {
            if (markMyWordsModal) {
                setMarkMyWordsModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [markMyWordsModal]);
    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={true}
            visible={markMyWordsModal}
            onRequestClose={() => setMarkMyWordsModal(false)}
        >
            <View className="flex-1 justify-center items-center ">
                <View
                    className="absolute flex-1 w-full h-full bg-black
                opacity-60"
                />
                <Text
                    className="absolute bg-white mx-2  w-full text-center
                    uppercase font-extrabold
                    text-2xl bottom-10"
                >
                    Mark my word
                </Text>
                <View className="w-full px-2">
                    <View className="rounded-lg bg-white px-2 py-2 h-64">
                        <Image
                            source={w.image}
                            style={{
                                resizeMode: "center"
                            }}
                            className="w-full h-full rounded-lg"
                        />
                    </View>

                    <Text
                        className="absolute bg-white mx-2 px-2 w-full text-center
                    text-2xl bottom-10"
                    >
                        {w.title}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};
export default MarkMyWord;
