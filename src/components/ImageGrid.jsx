import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import { useState, useContext } from "react";
import { ImageViewer } from "./";

import { GlobalContext } from "../hooks/GlobalContext";
const ImageGrid = ({ images, size, rounded }) => {
    const { setImageIndex, imageIndex, setViewImages, setImageViewModal } =
        useContext(GlobalContext);

    const handleImageIcon = async (m, i) => {
        setImageIndex(0);
        setImageViewModal(true);
        setViewImages(images);
    };

    const zero = !images?.length;
    const one = images?.length === 1;
    const two = images?.length === 2;
    const three = images?.length === 3;
    const four = images?.length === 4;
    const five = images?.length === 5;
    const six = images?.length >= 6;
    let content;
    //no images
    if (zero) {
        content = null;
    }
    //one images
    if (one) {
        content = (
            <View
                className={`w-full ${rounded ? rounded : ""} ${
                    size ? size : "h-96"
                }`}
            >
                {images.map((m, i) => (
                    <View
                        className={`relative w-full ${rounded ? rounded : ""} ${
                            size ? size : "h-96"
                        }`}
                    >
                        <Image
                            style={{ resizeMode: "cover" }}
                            className={`${
                                rounded ? rounded : ""
                            } h-full w-full`}
                            source={{ uri: m }}
                        />
                    </View>
                ))}
            </View>
        );
    }
    //two images
    if (two) {
        content = (
            <View
                className={`flex flex-row items-center w-full ${
                    rounded ? rounded : ""
                } ${size ? size : "h-96"}`}
            >
                {images.map((m, i) => (
                    <View className={` w-1/2 full p-0.5`}>
                        <Image
                            style={{ resizeMode: "cover" }}
                            className={`h-full w-full relative `}
                            source={{ uri: m }}
                        />
                    </View>
                ))}
            </View>
        );
    }
    //three images
    if (three) {
        const firstPart = images.slice(0, 1);
        const secondPart = images.slice(1, 3);

        content = (
            <View
                className={`flex items-center w-full ${
                    rounded ? rounded : ""
                } ${size ? size : "h-96"}`}
            >
                {firstPart.map((m, i) => (
                    <View className={` w-full h-3/5 p-0.5`}>
                        <Image
                            style={{ resizeMode: "cover" }}
                            className={`${
                                rounded ? rounded : ""
                            } h-full w-full relative `}
                            source={{ uri: m }}
                        />
                    </View>
                ))}
                <View className={`flex flex-row w-full h-2/5`}>
                    {secondPart.map((m, i) => (
                        <View
                            className={` w-1/2 h-full ${
                                rounded ? rounded : ""
                            }  p-0.5`}
                        >
                            <Image
                                style={{ resizeMode: "cover" }}
                                className={`${
                                    rounded ? rounded : ""
                                }  w-full relative h-full`}
                                source={{ uri: m }}
                            />
                        </View>
                    ))}
                </View>
            </View>
        );
    }
    //four images
    if (four) {
        content = (
            <View className={`flex flex-row items-center flex-wrap w-full`}>
                {images.map((m, i) => (
                    <View className={` w-1/2 full h-1/2 p-0.5`}>
                        <Image
                            style={{ resizeMode: "cover" }}
                            source={{ uri: m }}
                        />
                    </View>
                ))}
            </View>
        );
    }
    //five images
    if (five) {
        const firstPart = images.slice(0, 3);
        const secondPart = images.slice(3);

        content = (
            <View
                className={`flex flex-row items-center w-full ${
                    rounded ? rounded : ""
                } ${size ? size : "h-96"} `}
            >
                <View className={`flex items-center w-1/2`}>
                    {firstPart.map((m, i) => (
                        <View className={` w-full h-1/3 p-0.5`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                className={`${
                                    rounded ? rounded : ""
                                } h-full w-full relative `}
                                source={{ uri: m }}
                            />
                        </View>
                    ))}
                </View>
                <View className={`flex items-center w-1/2 h-full`}>
                    {secondPart.map((m, i) => (
                        <View className={` w-full h-1/2 p-0.5`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                className={`${
                                    rounded ? rounded : ""
                                }  w-full relative `}
                                source={{ uri: m }}
                            />
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    //six images and above
    if (six) {
        const firstPart = images.slice(0, 3);
        const secondPart = images.slice(3, 5);
        const thirdPart = images.slice(4);

        content = (
            <View
                className={`flex flex-row items-center w-full ${
                    rounded ? rounded : ""
                } ${size ? size : "h-96"} `}
            >
                <View className={`flex items-center w-1/2`}>
                    {firstPart.map((m, i) => (
                        <View className={` w-full h-1/3 p-0.5`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                className={`${
                                    rounded ? rounded : ""
                                } h-full w-full relative `}
                                source={{ uri: m }}
                            />
                        </View>
                    ))}
                </View>
                <View className={`flex items-center h-full w-1/2`}>
                    {secondPart.map((m, i) => (
                        <View className={` w-full full h-1/2 p-0.5`}>
                            <Image
                                style={{ resizeMode: "cover" }}
                                className={`${
                                    rounded ? rounded : ""
                                } h-full w-full relative `}
                                source={{ uri: m }}
                            />
                        </View>
                    ))}
                </View>

                <View
                    className={`absolute bottom-0 p-0.5 right-0
                    h-1/2
                    w-1/2
                flex items-center justify-center`}
                >
                    <View
                        className={` ${rounded ? rounded : ""} h-full w-full
                    
                flex items-center justify-center bg-black/50`}
                    >
                        <Text className={`text-white font-medium text-2xl`}>
                            + {thirdPart.length}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={handleImageIcon}>
            {content}
        </TouchableWithoutFeedback>
    );
};
export default ImageGrid;
