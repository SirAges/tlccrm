import { Ionicons } from "@expo/vector-icons";

import { View, Text } from "react-native";
const CusIcon = ({ name, size, className, m, p, bg, color, hw, action }) => {
    return (
        <Text
            onPress={action}
            style={{ marginRight: m }}
            className={`${
                color ? color : "text-primary"
            } ${bg} mx-1 px-1 rounded-full ${p ? p : "py-1"} text-center`}
        >
            <Ionicons size={size ? size : 24} name={name} />
        </Text>
    );
};
export default CusIcon;
