import { View } from "react-native";
import { CusIcon } from "./";
const AddButton = ({ action }) => {
    return (
        <View className="absolute bottom-5 right-5 items-center justify-center">
            <CusIcon
                name="add"
                bg="bg-primary"
                hw="w-14 h-14"
                p="py-2.5 px-2.5"
                size={35}
                action={action}
                color="text-white"
            />
        </View>
    );
};
export default AddButton;
