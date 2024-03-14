import { View, Text } from "react-native";
const CusSwitch = ({ value, onValueChange }) => {
    return (
        <View
            className={`flex-row ${
                value
                    ? "justify-end bg-primary/20"
                    : "justify-start bg-background"
            }  rounded-full w-20 px-1 py-1`}
        >
            <Text
                onPress={onValueChange}
                className={`${
                    value ? "bg-primary" : "bg-title"
                } rounded-full w-1/2 py-1`}
            ></Text>
        </View>
    );
};

export default CusSwitch;
