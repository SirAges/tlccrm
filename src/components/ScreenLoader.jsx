import { View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { CusIcon } from "./";

const ScreenLoader = ({ refresh, text }) => {
    return (
        <View className="flex-1 bg-background items-center space-y-3 justify-center">
            <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                duration={3000}
                easing="linear"
            >
                <Image
                    className="w-20 h-20 rounded-full"
                    source={require("../../assets/images/icon.png")}
                />
            </Animatable.View>

            <Text className="font-medium capitalize text-primary">
                {text}
            </Text>

            {refresh && (
                <Text
                    onPress={() => refresh()}
                    className="capitalize px-2 py-3 text-primary rounded-lg
                "
                >
                    Reload content
                </Text>
            )}
        </View>
    );
};
export default ScreenLoader;
