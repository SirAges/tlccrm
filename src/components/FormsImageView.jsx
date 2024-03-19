import {
    View,
    Text,
    Image,
    FlatList,
    Modal,
    BackHandler,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import { useEffect, useState, useContext, useRef } from "react";
import { CusIcon } from "./";
import { saveToCloudinary } from "../lib/utils.js";
import { GlobalContext } from "../hooks/GlobalContext";
const FormsImageView = ({ id, multiple }) => {
    const {
        file,
        setFile,
        formsImageViewModal,
        setFormsImageViewModal,
        imageIndex,
        setImageIndex,
        setValue,
        value
    } = useContext(GlobalContext);

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const [viewPosition, setviewPosition] = useState(0);
    const [loading, setLoading] = useState(false);

    const flatListRef = useRef();

    useEffect(() => {
        const fileEmpty = () => {
            if (!file.length) {
                setFormsImageViewModal(false);
            }
        };
        fileEmpty();
    }, [file]);
    // useEffect(() => {
    //     const backAction = () => {
    //         if (!file.length && formsImageViewModal) {
    //             setFormsImageViewModal(false);

    //             return true; // Prevent default behavior (exit the app)
    //         }
    //         return false; // Default behavior (exit the app)
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );

    //     return () => backHandler.remove(); // Cleanup the event listener on component unmount
    // }, [setFormsImageViewModal]);
    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: imageIndex,
            animated: false
        });
    }, [imageIndex]);
    const handleImageIcon = async i => {
        if (i !== imageIndex) {
            setImageIndex(i);
        }
    };
    const removeImage = async index => {
        const newFile = file.filter((f, i) => i !== index);
        setFile(newFile);
        setLoading(false);

        // Delete the image by public ID
    };
    const handleCloseModal = index => {
        setLoading(false);
        setFile([]);
        // Delete the image by public ID
    };

    const handleSetImages = async () => {
        multiple ?
            setValue(prev => ({
                ...prev,
                [id]: []
            })):null
        const cloudName = "daxrp4nar";
        const apiKey = "868455186369275";
        const uploadPreset = "tlccrm";

        if (!file) throw new Error("no file");
        setLoading(true);
        for (const asset of file) {
            try {
                const { name, mimeType, uri } = asset;
                const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

                const formData = new FormData();
                formData.append("file", {
                    uri,
                    type: mimeType,
                    name
                });

                formData.append("upload_preset", uploadPreset);
                formData.append("api_key", apiKey);

                const options = {
                    method: "post",
                    body: formData,
                    headers: {
                        accept: "application/json"
                    }
                };

                const response = await fetch(apiUrl, options);
                const data = await response.json();
                const imageUri = data.secure_url;
                if (imageUri) {
                    setValue(prev => ({
                        ...prev,
                        [id]: [...prev[id], imageUri]
                    }));
                }
            } catch (err) {
                console.log("error", err);
            } finally {
                setFile([]);
                setLoading(false);
                setFormsImageViewModal(false);
            }
        }
    };

    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={formsImageViewModal}
        >
            <View className="flex-1 justify-center items-center">
                {file.length ? (
                    <FlatList
                        className="flex-1 bg-black"
                        ref={flatListRef}
                        keyExtractor={d => d.uri}
                        bounce={false}
                        pagingEnabled
                        data={file}
                        horizontal
                        initialScrollIndex={0}
                        getItemLayout={(data, index) => ({
                            length: windowWidth,
                            offset: windowWidth * index,
                            index
                        })}
                        renderItem={({ item: d }) => (
                            <View
                                className=" h-full w-screen justify-center items-center
                        "
                            >
                                <Image
                                    className="w-full h-full"
                                    style={{ resizeMode: "center" }}
                                    source={{ uri: d.uri }}
                                />
                            </View>
                        )}
                    />
                ) : (
                    <Text
                        className="text-2xl capitalize font-extrabold
                    text-danger "
                    >
                        No file ! Exiting...
                    </Text>
                )}
            </View>
            {file.length ? (
                <View className="flex-row items-center px-2 space-x-2">
                    <FlatList
                        className="flex-1 "
                        keyExtractor={d => d.uri}
                        data={file}
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
                                            action={() => removeImage(index)}
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
                    <Text
                        onPress={() => handleSetImages()}
                        className="bg-primary rounded-lg px-2 py-1
                    font-semibold text-lg text-white"
                    >
                        {loading ? "loading" : "set"}
                    </Text>
                </View>
            ) : null}

            <View
                className="absolute top-5
                                     right-5 z-10 "
            >
                <CusIcon
                    bg="bg-white"
                    p={""}
                    color="text-danger"
                    name="close"
                    action={() => handleCloseModal()}
                />
            </View>
        </Modal>
    );
};
export default FormsImageView;
