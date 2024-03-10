import {
    View,
    Text,
    Image,
    FlatList,
    Modal,
    BackHandler,
    Dimensions
} from "react-native";
import { useEffect, useState, useRef } from "react";

const ImageViewer = ({
    imageViewModal,
    setImageViewModal,
    images,
    imageIndex
}) => {
    const flatListRef = useRef();
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const [viewPosition, setviewPosition] = useState(0);

    useEffect(() => {
        const backAction = () => {
            if (imageViewModal) {
                setImageViewModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [setImageViewModal]);
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
                    keyExtractor={d => d}
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
                    renderItem={({ item: d }) => (
                        <View
                            className=" h-full w-screen justify-center items-center
                        "
                        >
                            <Image
                                className="w-full h-full"
                                style={{ resizeMode: "center" }}
                                source={{ uri: d }}
                            />
                        </View>
                    )}
                />
            </View>
        </Modal>
    );
};
export default ImageViewer;
