import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { CusIcon } from "./";

const ScreenLoader = ({ refresh, text }) => {
    return (
        <View className="flex-1 bg-black/50 items-center justify-center">
            <Animatable.Text
                animation="rotate"
                iterationCount="infinite"
                duration={3000}
                easing="linear"
            >
                <CusIcon name="reload-outline" color="text-white" size={34} />
            </Animatable.Text>
            <Text className="text-xl font-medium capitalize text-white">
                {text}
            </Text>

            {refresh && (
                <Text
                onPress={()=>refresh()}
                className="capitalize px-2 py-3 text-white bg-primary rounded-lg
                text-xl">
                    Reload content
                </Text>
            )}
        </View>
    );
};
export default ScreenLoader;
