import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { CusIcon } from "./";

const Loader = ({ color }) => {
    return (
        <Animatable.Text
            animation="rotate"
            iterationCount="infinite"
            duration={3000}
            easing="linear"
        >
            <CusIcon color={color} name="sync" size={16} />
        </Animatable.Text>
    );
};
export default Loader;
