import {
    View,
    Text,
    TextInput,
    Modal,
    BackHandler,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { pickDocument } from "../lib/utils";
import { CusIcon, FilePicker, ImageViewer } from "./";
const Messanger = ({
    processText,
    senderId,
    receiverId,
    replyId,
    handleReplyMessage,
    setReplyId
}) => {
    const [message, setMessage] = useState("");
    const [iconIndex, setIconIndex] = useState(0);
    const [documents, setDocuments] = useState([]);

    const [msgMenu, setMsgMenu] = useState(false);
    const [imageViewModal, setImageViewModal] = useState(false);

    const flatListRef = useRef();

    const handleImageIcon = async i => {
        setIconIndex(i);

      
           
            setImageViewModal(true);
        
    };

    const pickFile = async clicked => {
        try {
            if (clicked === "image") {
                const res = await pickDocument(
                    ["image/png", "image/jpg", "image/jpeg"],
                    true
                );
                const images = res.assets;
                setDocuments(prev => [...prev, ...images]);
                console.log(documents);
                setMsgMenu(false);

                setImageViewModal(true);
            } else {
            }
        } catch (err) {
            console.log(err);
        }
    };
    const removeFile = async uri => {
        const newFile = documents.filter((f, i) => f.uri !== uri);
        setDocuments(newFile);

        // Delete the image by public ID
    };
    const sendMessage = () => {
        const messageObject = {
            senderId,
            receiverId,
            message,
            documents,
            replyId
        };

        console.log(messageObject);
        setMessage("");
    };

    useEffect(() => {
        const backAction = () => {
            if (msgMenu) {
                setMsgMenu(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [msgMenu]);
    return (
        <View className="py-2 px-2 space-y-2">
            {replyId.length ? (
                <View className="flex-row items-center space-x-2 px-2 rounded-full">
                    <Text className="text-white capitalize">
                        replying {handleReplyMessage(replyId)[0]}
                    </Text>
                    <Text className="text-white">
                        @{processText(handleReplyMessage(replyId)[1], 20)}
                    </Text>
                    <CusIcon
                        color="text-danger"
                        name="close"
                        action={() => setReplyId("")}
                    />
                </View>
            ) : null}

            {documents.length ? (
                <View>
                    <FlatList
                        className="px-2"
                        keyExtractor={d => d.uri}
                        data={documents}
                        horizontal
                        renderItem={({ item: d, index }) => (
                            <TouchableWithoutFeedback
                                onPress={() => handleImageIcon(index)}
                            >
                                <View
                                    className=" h-14 w-14 justify-center
                                    items-center relative
                       rounded-md mr-1 ml-1"
                                >
                                    <View
                                        className="absolute top-0
                                     right-0 z-10 "
                                    >
                                        <CusIcon
                                            bg="bg-white"
                                            p={""}
                                            hw="h-5 w-5"
                                            size={10}
                                            m={0}
                                            color="text-danger"
                                            name="close"
                                            action={() => removeFile(d.uri)}
                                        />
                                    </View>
                                    <Image
                                        className="w-full h-full rounded-md"
                                        style={{ resizeMode: "cover" }}
                                        source={{ uri: d.uri }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    />
                </View>
            ) : null}

            <View
                className="flex-row items-center rounded-full border
            border-primary/10 bg-white/10"
            >
                <TextInput
                    className="flex-1 px-4 py-2 text-white"
                    value={message}
                    onChangeText={text => setMessage(text)}
                    inputMode={"text"}
                    placeholder="message here"
                />
                <View className="px-2 py-2">
                    <CusIcon
                        color="text-white"
                        name="attach"
                        action={() => setMsgMenu(true)}
                    />
                </View>
                <View className="bg-white  rounded-r-full py-2 px-2">
                    <CusIcon name="send" action={() => sendMessage()} />
                </View>
            </View>

            <Modal
                className="flex-1 relative"
                animationType="slide"
                transparent={true}
                visible={msgMenu}
                onRequestClose={() => setMsgMenu(false)}
            >
                <TouchableWithoutFeedback onPress={() => setMsgMenu(false)}>
                    <View className="flex-1">
                        <View
                            className="w-full absolute bottom-0 h-52 bg-white
                        justify-center items-center rounded-t-2xl"
                        >
                            <View
                                className="w-full flex-1 flex-row flex-wrap
                            px-2 py-4 justify-between gap-5"
                            >
                                <View
                                    className="bg-primary rounded-md h-14 w-14
                                items-center justify-center"
                                >
                                    <CusIcon
                                        color="text-white"
                                        name="image"
                                        action={() => pickFile("image")}
                                    />
                                </View>

                                <View
                                    className="bg-primary rounded-md h-14 w-14
                                items-center justify-center"
                                >
                                    <CusIcon
                                        color="text-white"
                                        name="videocam"
                                        action={() => null}
                                    />
                                </View>

                                <View
                                    className="bg-primary rounded-md h-14 w-14
                                items-center justify-center"
                                >
                                    <CusIcon
                                        color="text-white"
                                        name="person"
                                        action={() => null}
                                    />
                                </View>
                                <View
                                    className="bg-primary rounded-md h-14 w-14
                                items-center justify-center"
                                >
                                    <CusIcon
                                        color="text-white"
                                        name="musical-note"
                                        action={() => null}
                                    />
                                </View>
                                <View
                                    className="bg-primary rounded-md h-14 w-14
                                items-center justify-center"
                                >
                                    <CusIcon
                                        color="text-white"
                                        name="document"
                                        action={() => null}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <ImageViewer
                iconIndex={iconIndex}
                flatListRef={flatListRef}
                imageViewModal={imageViewModal}
                setImageViewModal={setImageViewModal}
                documents={documents}
            />
        </View>
    );
};
export default Messanger;
