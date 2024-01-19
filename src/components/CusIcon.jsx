import {
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CusIcon = ({
    name,
    outline,
    bg,
    m,
    p,
    color,
    action,
    focus,
    disabled,
    size,
    hw
}) => {
    return (
        <Text
            style={{ marginRight: m }}
            className={`${bg} ${
                hw ? hw : "h-10 w-10"
            } rounded-full ${color ? color : "primary"} ${
                p ? p : "py-1.5 text-center"
            }`}
            onPress={disabled ? null : action}
        >
            <Ionicons name={outline ? outline : name} size={size ? size : 24} />
        </Text>
    );
};
export default CusIcon;
