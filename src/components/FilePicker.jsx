import { useState, useEffect } from "react";
import mime from "mime";
import { uploadFile } from "../lib/utils";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CusIcon, ImageViewer } from "./";
import { pickDocument, deleteImageByUrl } from "../lib/utils";

import axios from "axios";

const FilePicker = ({
    id,
    type,
    handleInputChange,
    multiple,
    name,
    value,
    setValue,
    setFile,
    setImageIndex,
    imageIndex,
    setFormsImageViewModal
}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [imageViewModal, setImageViewModal] = useState(false);

    const handlePickDocument = async () => {
        try {
            const { assets } = await pickDocument(type, multiple);
            await setFile(prev => [...prev, ...assets]);
                        setFormsImageViewModal(true);

        } catch (err) {
            console.log("error", err);
        }
    };
    const removeImage = async index => {
        const newimages = value.image.filter((f, i) => i !== index);

        setValue(prev => ({ ...prev, image: newimages }));
    };
    const handleImageIcon = async i => {
        setImageIndex(i);
        setImageViewModal(true);
    };
    return (
        <View
            className=" flex-row  items-start space-x-2 px-2 py-1 align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
        >
            <CusIcon
                name="images"
                action={() =>
                    loading ? null : handlePickDocument(type, multiple)
                }
            />

            <View
                className={`flex-row flex-wrap ${
                    loading ? "justify-center" : null
                } items-center  space-y-2 `}
            >
                {loading ? (
                    <Text className=" text-2xl text-primary font-bold">
                        Loading Image...
                    </Text>
                ) : value?.image?.length ? (
                    value?.image?.map((f, i) => (
                        <View
                            key={i}
                            className="mx-0.5 w-20 h-20 rounded-md bg-white items-center justify-center"
                        >
                            <Image
                                style={{ resizeMode: "contain" }}
                                source={{ uri: f }}
                                className="w-full h-full rounded-md"
                            />
                            <View className="absolute bg-white  w-5 h-5 items-center justify-center rounded-md">
                                <CusIcon
                                    name="expand"
                                    p="py-1.5"
                                    m={0}
                                    size={19}
                                    action={() => handleImageIcon(i)}
                                />
                            </View>
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
                                    action={() => removeImage(i)}
                                />
                            </View>
                        </View>
                    ))
                ) : (
                    <View className="justify-center py-2">
                        <Text className="font-medium capitalize">
                            no selected
                        </Text>
                    </View>
                )}
            </View>
            <ImageViewer
                imageViewModal={imageViewModal}
                setImageViewModal={setImageViewModal}
                images={value.image}
                imageIndex={imageIndex}
            />
        </View>
    );
};
export default FilePicker;
