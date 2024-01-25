import { Ionicons } from "@expo/vector-icons";

import { View, Text } from "react-native";
const CusIcon = ({ name, size, Textclass, m, p, bg, color, hw, action }) => {
    return (
        <View className="items-center justify-center">
            <Text
                onPress={action}
                style={{ marginRight: m }}
                className={`${Textclass}   ${
                    color ? color : "text-primary"
                } ${bg} ${hw ? hw : "h-10 w-10"} rounded-full ${
                    p ? p : "py-1.5"
                } text-center`}
            >
                <Ionicons size={size ? size : 24} name={name} />
            </Text>
        </View>
    );
};
export default CusIcon;
