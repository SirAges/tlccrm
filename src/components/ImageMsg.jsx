import { View, Text, Image } from "react-native";
import { ImageGrid } from "./";
const ImageMsg = ({ message, documents, CusIcon }) => {
    return (
        <View className="w-full">
            <ImageGrid size="h-52" rounded="rounded-md" images={documents} />

            {message && (
                <View className=" px-2 py-3">
                    <Text className="text-title">{message}</Text>
                </View>
            )}
        </View>
    );
};
export default ImageMsg;
