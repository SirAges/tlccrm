import { Text, View, Image } from "react-native";

const ImageGrid = ({images}) => {
  
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
            <View className="w-full h-72">
                {images.map((m, i) => (
                    <View key={i} className="relative w-full h-full">
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="h-full w-full"
                            source={{uri:m}}
                        />
                    </View>
                ))}
            </View>
        );
    }
    //two images
    if (two) {
        content = (
            <View className="flex flex-row items-center w-full h-72 ">
                {images.map((m, i) => (
                    <View key={i} className=" w-1/2 full p-0.5">
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="h-full w-full relative "
                            source={{uri:m}}
                        />
                    </View>
                ))}
            </View>
        );
    }
    //three images
    if (three) {
        const firstPart = images.slice(2);
        const secondPart = images.slice(0, 2);

        content = (
            <View className="flex items-center w-full h-96">
                {firstPart.map((m, i) => (
                    <View key={i} className=" w-full h-3/5 p-0.5">
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="h-full w-full relative "
                            source={{uri:m}}
                        />
                    </View>
                ))}
                <View className="flex flex-row h-2/5">
                    {secondPart.map((m, i) => (
                        <View key={i} className=" w-1/2 full h-full p-0.5">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="h-full w-full relative "
                                source={{uri:m}}
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
            <View className="flex flex-row items-center flex-wrap w-full h-72 ">
                {images.map((m, i) => (
                    <View key={i} className=" w-1/2 full h-1/2 p-0.5">
                        <Image
                            style={{ resizeMode: "cover" }}
                            className="h-full w-full relative "
                            source={{uri:m}}
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
            <View className="flex flex-row items-center w-full h-96 ">
                <View className="flex items-center w-1/2">
                    {firstPart.map((m, i) => (
                        <View key={i} className=" w-full h-1/3 p-0.5">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="h-full w-full relative "
                                source={{uri:m}}
                            />
                        </View>
                    ))}
                </View>
                <View className="flex items-center w-1/2">
                    {secondPart.map((m, i) => (
                        <View key={i} className=" w-full full h-1/2 p-0.5">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="h-full w-full relative "
                                source={{uri:m}}
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
            <View className="flex flex-row items-center w-full h-96 ">
                <View className="flex items-center w-1/2">
                    {firstPart.map((m, i) => (
                        <View key={i} className=" w-full h-1/3 p-0.5">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="h-full w-full relative "
                                source={{uri:m}}
                            />
                        </View>
                    ))}
                </View>
                <View className="flex items-center w-1/2">
                    {secondPart.map((m, i) => (
                        <View key={i} className=" w-full full h-1/2 p-0.5">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="h-full w-full relative "
                                source={{uri:m}}
                            />
                        </View>
                    ))}
                </View>

                <View
                    className="absolute bottom-0 right-0 bg-black/50 h-1/2
                flex items-center justify-center w-1/2"
                >
                    <Text className="text-white font-medium text-2xl">
                        + {thirdPart.length}
                    </Text>
                </View>
            </View>
        );
    }
    return content;
};
export default ImageGrid;
