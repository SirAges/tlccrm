import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
const ChosenSchoolScreen = () => {
    return (
        <ScrollView>
            <View className="flex-1 bg-white">
                <View className="w-full h-96">
                    <Image
                        style={{ resizeMode: "cover" }}
                        className="w-full h-full rounded-md"
                        source={require("../../assets/images/ch2.png")}
                    />
                </View>

                <View className="flex-1 py-2 px-2">
                    <Text className="text-6xl font-extrabold uppercase text-center text-primary">
                        Welcome to chosen schools
                    </Text>

                    <View className="relative h-72  ">
                        <View className="absolute bg-white shadow-lg shadow-black left-4 bottom-24 w-44 h-44 rounded-md">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-md"
                                source={require("../../assets/images/ch2.png")}
                            />
                        </View>
                        <View className="absolute bg-white shadow-lg shadow-black right-4 top-24 w-44 h-44 rounded-md">
                            <Image
                                style={{ resizeMode: "cover" }}
                                className="w-full h-full rounded-md"
                                source={require("../../assets/images/psmm1.png")}
                            />
                        </View>
                    </View>

                    <View>
                        <Text className="text-lg text-justify">
                            Welcome to the Lord's Chosen School, a beacon where
                            education meets inspiration. Our institution is
                            dedicated to nurturing young minds through a
                            holistic approach, fostering a supportive
                            environment for academic excellence. With a
                            committed faculty, cutting-edge facilities, and an
                            empowering curriculum, we shape future leaders and
                            contributors to society. Whether in primary or
                            secondary education, our comprehensive approach
                            ensures a seamless and enriching learning journey.
                            Join us on the path of knowledge, character
                            building, and boundless possibilities.
                        </Text>
                    </View>
                    <TouchableWithoutFeedback>
                        <Text className="capitalize px-3 py-2 bg-primary text-white font-extrabold text-lg text-center rounded-md">
                            Apply now
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    );
};
export default ChosenSchoolScreen;
