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
import { CusIcon } from "../components";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    useGetQuotesQuery,
    useDeleteBranchMutation
} from "../redux/quote/quoteApiSlice";

const MarkMyWord = ({ markMyWords, markMyWordsModal, setMarkMyWordsModal }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const {
        data: quotes,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetQuotesQuery("quoteslist", {
        // pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [allQuotes, setAllQuotes] = useState([]);
    const [loading, setLoading] = useState([]);
    const w = allQuotes[0];

    useEffect(() => {
        try {
            setLoading(true);
            if (quotes && quotes !== undefined) {
                setAllQuotes(quotes);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
        return () => setLoading(false);
    }, [quotes]);

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
                    {w?.image && (
                        <View className="rounded-lg bg-white px-2 py-2 h-64">
                            <Image
                                source={{ uri: w.image[0] }}
                                style={{
                                    resizeMode: "center"
                                }}
                                className="w-full h-full rounded-lg"
                            />
                        </View>
                    )}
                    <View
                        className="absolute  mx-2 px-2 w-full 
                   bottom-10"
                    >
                        <Text
                            className="bg-white px-2 w-full text-center
                    text-2xl"
                        >
                            {w?.text}
                        </Text>
                        <Text className="capitalize bg-black/50 py-2 text-center text-white ">
                            {w?.author}
                        </Text>
                    </View>
                </View>
                <Text className="capitalize font-semibold text-white">
                    | quote |
                </Text>
                <Text className="text-white text-justify">{w?.body}</Text>
            </View>
        </Modal>
    );
};
export default MarkMyWord;
