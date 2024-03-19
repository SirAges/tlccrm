import {useEffect}from"react"
import {
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Text,
    BackHandler
} from "react-native";
import { Loader, CusIcon } from "./";
const ButtomMenu = ({ title, setPopup, idx, options }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                setPopup(false);
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);
    
  
    return (
        <TouchableWithoutFeedback onPress={() => setPopup(false)}>
            <View className="absolute bottom-0 h-full w-full bg-red-500 bg-transparent">
                <View
                    className="w-full rounded-t-3xl absolute bottom-0
                items-start px-5 py-5 shadow-lg shadow-black
                bg-white max-h-56"
                >
                    <Text className="capitalize w-full mb-3 font-bold text-xl text-center">
                        {title} Options
                    </Text>
                    <ScrollView className="w-full">
                        {options.map(o => (
                            <TouchableWithoutFeedback
                            key={o.name}
                                onPress={() => o.func(idx)}
                            >
                                <View className="flex-row items-center mb-3">
                                    <CusIcon
                                        name={o.icon}
                                        color={
                                            o.cond
                                                ? "text-primary"
                                                : "text-danger"
                                        }
                                    />
                                    <Text className="capitalize">
                                        {o.cond ? o.undo : o.name}
                                    </Text>
                                    {o.loader && <Loader />}
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default ButtomMenu;
