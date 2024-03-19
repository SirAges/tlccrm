import React, { useEffect, useRef } from "react";
import { FlatList, Modal, BackHandler, Dimensions, View } from "react-native";

import { ImageCard } from "./";

const ImageViewer = ({
    imageViewModal,
    setImageViewModal,
    images,
    imageIndex
}) => {
    const flatListRef = useRef();
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        const backAction = () => {
            if (imageViewModal) {
                setImageViewModal(false);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [imageViewModal, setImageViewModal]);

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: imageIndex,
            animated: false
        });
    }, [imageIndex]);

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: imageIndex,
            animated: false
        });
    }, [imageIndex]);

    return (
        <Modal
            className="w-full h-full"
            animationType="slide"
            transparent={false}
            visible={imageViewModal}
            onRequestClose={() => setImageViewModal(false)}
        >
            <View className="flex-1">
                <FlatList
                    className="flex-1 bg-black"
                    keyExtractor={(item, index) => index.toString()}
                    ref={flatListRef}
                    bounce={false}
                    pagingEnabled
                    data={images}
                    horizontal
                    initialScrollIndex={0}
                    getItemLayout={(data, index) => ({
                        length: windowWidth,
                        offset: windowWidth * index,
                        index
                    })}
                    renderItem={({ item: uri }) => <ImageCard url={uri} />}
                />
            </View>
        </Modal>
    );
};

export default ImageViewer;
