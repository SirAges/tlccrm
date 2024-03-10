import { TouchableWithoutFeedback, View, ScrollView, Text } from "react-native";
import {
    
    Loader,
    
} from "./";
const ButtomMenu = ({
    deletingComment,
    setPopup,
    handleEditComment,
    handleDeleteComment
}) => {
    return (
        <TouchableWithoutFeedback onPress={() => setPopup(false)}>
            <View className="absolute h-full  w-full flex-1">
                <View
                    className="w-full rounded-t-3xl absolute bottom-0
                items-start px-5 py-5 shadow-lg shadow-black
                bg-white max-h-56"
                >
                    <Text className="capitalize w-full mb-3 font-bold text-xl text-center">
                        Comment Options
                    </Text>
                    <ScrollView className="flex-1 w-full">
                        <View className="space-y-4 px-2 flex-1">
                            <Text
                                onPress={() => handleEditComment()}
                                className="w-full capitalize font-medium"
                            >
                                Edit comment
                            </Text>
                            <Text
                                className="w-full capitalize font-medium"
                                onPress={() =>
                                    deletingComment
                                        ? null
                                        : handleDeleteComment()
                                }
                            >
                                delete comment
                                {deletingComment && <Loader />}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default ButtomMenu;
