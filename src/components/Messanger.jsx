import {
    View,
    Text,
    TextInput,
    Modal,
    BackHandler,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    Alert
} from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { pickDocument, deleteImageByUrl } from "../lib/utils";
import { GlobalContext } from "../hooks/GlobalContext";
import { CusIcon, FilePicker, FormsImageView, ImageViewer } from "./";
const Messanger = ({
    processText,
    senderId,
    receiverId,
    replyId,
    handleReplyMessage,
    setReplyId,
    sendMessage,
    message,
    setMessage,

    adding
}) => {
    const {
        handleInputChange,
        value,
        setValue,
        file,
        setFile,
        formsImageViewModal,
        setFormsImageViewModal,
        imageViewModal,
        setImageViewModal,
        setImageIndex,
        setViewImages,
        viewImages,
        imageIndex
    } = useContext(GlobalContext);
    const [iconIndex, setIconIndex] = useState(0);
    useEffect(() => {
        setValue({ documents: [] });
    }, []);

    const [msgMenu, setMsgMenu] = useState(false);

    const flatListRef = useRef();

    const handlePickDocument = async () => {
        const multiple = true;
        const type = ["image/png", "image/jpg", "image/jpeg"];
        try {
            const { assets } = await pickDocument(type, multiple);
            if (assets?.length) {
                setFile(prev => [...prev, ...assets]);
                setMsgMenu(false);
                setFormsImageViewModal(true);
            } else {
            }
        } catch (err) {
            console.log("error", err);
        } finally {
        }
    };
    const removeImage = async index => {
        const newimages = value["documents"].filter((f, i) => i !== index);

        setValue(prev => ({ ...prev, documents: newimages }));
    };
    const handleImageIcon = async (m, i) => {
        setViewImages(value["documents"]);

        setImageIndex(i);
        setImageViewModal(true);
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
            {replyId ? (
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

            {value?.documents?.length && (
                <View>
                    <FlatList
                        keyExtractor={d => d}
                        data={value?.documents}
                        horizontal
                        renderItem={({ item: d, index }) => (
                            <TouchableWithoutFeedback
                                onPress={() => handleImageIcon(d, index)}
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
                                            action={() => removeImage(index)}
                                        />
                                    </View>
                                    <Image
                                        className="w-full h-full rounded-md"
                                        style={{ resizeMode: "cover" }}
                                        source={{ uri: d }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    />
                </View>
            )}

            <View
                className="flex-row items-center rounded-full border
            border-primary/10 bg-white/10"
            >
                <TextInput
                    className="flex-1 px-4 py-2 text-white"
                    value={message}
                    placeholderTextColor="white"
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
                    <CusIcon
                        name={adding ? "ellipsis-horizontal" : "send"}
                        action={adding ? null : () => sendMessage(receiverId)}
                    />
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
                                        action={() => handlePickDocument()}
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
                imageViewModal={imageViewModal}
                setImageViewModal={setImageViewModal}
                images={viewImages}
                imageIndex={imageIndex}
            />
            <FormsImageView id={"documents"} />
        </View>
    );
};

export default Messanger;
