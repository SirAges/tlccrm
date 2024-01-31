import { useState, useEffect } from "react";
import mime from "mime";
import { uploadFile } from "../lib/utils";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CusIcon } from "./";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const FilePicker = ({ id, type, handleInputChange, multiple, name }) => {
    const [file, setFile] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [idx, setIdx] = useState(null);

    const pickDocument = async () => {
        setLoading(true);
        const cloudName = "daxrp4nar";
        const apiKey = "868455186369275";
        const uploadPreset = "tlccrm";

        const result = await DocumentPicker.getDocumentAsync({
            type: type,
            multiple: multiple
        });
        if(result.assets.length!==0){
        result.assets.forEach((r, i) => {
            try {
                setIdx(i);
                if (result.canceled === false) {
                    const { name, mimeType, uri } = r;

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

                    fetch(apiUrl, options)
                        .then(response => response.json())
                        .then(data => {
                            if (data.secure_url !== "") {
                                handleInputChange(data.secure_url, id);
                                setFile(prev => [...prev, data.secure_url]);

                                setLoading(false);
                            }
                        })
                        .catch(err => {
                            setError(err.message);
                            setLoading(false);
                        });
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });}else{
        setLoading(false);}
    };
    const removeImage = index => {
        const newFile = file.filter((f, i) => i !== index);
        setFile(newFile);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                className="flex-row  items-start space-x-2 px-2 py-1 align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
            >
                <CusIcon
                    name="images"
                    action={() => (loading ? null : pickDocument())}
                />

                <View
                    className={`flex-row flex-wrap ${
                        loading ? "justify-center" : null
                    } items-center  space-y-2 flex-1`}
                >
                    {loading ? (
                        <Text className=" text-2xl text-primary font-bold">
                            Loading Image...
                        </Text>
                    ) : file.length ? (
                        file.map((f, i) => (
                            <View className="mx-0.5 w-20 h-20 rounded-md bg-white items-center justify-center">
                                <Image
                                    style={{ resizeMode: "contain" }}
                                    source={{ uri: f }}
                                    className="w-full h-full rounded-md"
                                />
                                <View className="absolute bg-white  w-5 h-5 items-center justify-center rounded-md">
                                    <CusIcon
                                        name="close"
                                        m={0}
                                        p="py-2.5"
                                        size={19}
                                        action={() => removeImage(i)}
                                    />
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="justify-center h-full">
                            <Text className="font-medium capitalize">
                                no file selected
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};
export default FilePicker;
