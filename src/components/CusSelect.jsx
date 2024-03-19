import { View, Text, ScrollView } from "react-native";
import { Separator, CusIcon } from "./";
const CusSelect = ({
    id,
    name,
    selected,
    setDropdown,
    dropdown,
    selects,
    handleDropdown
}) => {
    return (
        <View className="relative justify-center">
            <View className="absolute z-20 right-0 ">
                <CusIcon
                    action={() => setDropdown(prev => !prev)}
                    name={dropdown ? "caret-up" : "caret-down"}
                />
            </View>
            <Text
                className="h-fit
                                                        bg-background capitalize
                                                    font-medium px-2 py-3
                                                    align-text-top bg-background
                                                    border border-primary/10
                                                    rounded-lg"
            >
                {selected}
            </Text>
            {dropdown && (
                <View
                    className="
                                 absolute          z-10          top-0
                                                      bg-white shadow-md
                                                    w-full
                                      max-h-24              shadow-black 
                                                        space-y-2 px-2 py-2 align-text-top bg-background border border-primary/10 rounded-lg"
                >
                    <ScrollView>
                        {selects.map(s => (
                            <View key={s}>
                                <Text
                                    onPress={() => handleDropdown(s, id, name)}
                                    className="bg-background
                                                                            
                                                       flex-1 my-1          capitalize"
                                >
                                    {s}
                                </Text>
                                <Separator />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};
export default CusSelect;
