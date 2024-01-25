import { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { processText } from "../lib/utils";
import { CusIcon } from "../components";
import { visions, services } from "../lib/data";
const AboutScreen = () => {
    const [idx, setIdx] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const handleDropdown = clicked => {
        if (clicked === idx) {
            setDropDown(prev => !prev);
        } else {
            setIdx(clicked);
            setDropDown(true);
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <View className="bg-primary w-full h-screen  relative items-center justify-center">
                    <Image
                        style={{ resizeMode: "cover" }}
                        source={require("../../assets/images/ch2.png")}
                        className="w-full h-full opacity-80"
                    />
                    <View className="absolute bg-white h-44 inset-x-4 w-90 bottom-10 rounded-b-lg space-y-3 items-center pt-10 px-2">
                        <Text className="uppercase text-xl font-extrabold text-primary  ">
                            Ordained with a Mandate
                        </Text>
                        <Text className="capitalize text-lg">
                            A three fold vision and a 10 Billion soul mandate to
                            fulfill
                        </Text>
                    </View>
                    <View className="absolute  w-72 h-96 bg-white px-4 py-4 flex-1">
                        <Image
                            style={{ resizeMode: "cover" }}
                            source={require("../../assets/images/p.jpg")}
                            className="w-full h-full"
                        />
                    </View>
                </View>

                <Text className="px-2 text-center text-justify text-lg pt-5">
                    {processText(
                        "The Lord’s Chosen Charismatic Revival Church is a Christian Ministry. As the name connotes, it is a revival church inspired by the Holy Spirit to bring the knowledge of salvation to all the kings and their subjects, to the masters and their servants, to the rulers and them that are being ruled all over the world.###### *The birth of the church was in response to the divine call of God received by the founder* ***Pastor Lazarus Muoka*** ######Who consequently brought together some brethren (in their hundreds) on the 23rd of December, 2002, at its first location No.16 Odunaike Street, Ilasamaja Area of Lagos, Nigeria, and declared to them the great calling of God upon his life."
                    )}
                </Text>

                <View className="px-3 py-5">
                    <Text className="uppercase text-2xl text-center font-extrabold text-primary pb-3">
                        Our Mission and Vision
                    </Text>
                    <Text className="text-lg text-justify ">
                        When God calls one for an assignment or mission, He will
                        obviously impart in the person the concept or vision on
                        which the calling will be anchored in. Thus, the three
                        (3) fold vision upon which the calling of Pastor Lazarus
                        Muoka is anchored are:
                    </Text>
                    <View className=" py-4">
                        {visions.map(v => (
                            <View key={v._id} className="py-3 space-y-2">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(v._id)}
                                >
                                    <View className="flex-row items-start bg-background py-1 px-2">
                                        <CusIcon
                                            name={
                                                dropDown && idx === v._id
                                                    ? "caret-down"
                                                    : "caret-forward"
                                            }
                                        />
                                        <Text className="flex-1 text-lg font-semibold text-primary uppercase">
                                            {processText(v.title)}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {dropDown && idx === v._id && (
                                    <Text
                                        className="text-lg leading-7
                                6"
                                    >
                                        {processText(v.body)}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <View className="px-3 py-5">
                    <Text className="uppercase text-2xl text-center font-extrabold text-primary pb-3">
                        Our Services and Time
                    </Text>
                    <Text className="text-lg text-justify ">
                        When God calls one for an assignment or mission, He will
                        obviously impart in the person the concept or vision on
                        which the calling will be anchored in. Thus, the three
                        (3) fold vision upon which the calling of Pastor Lazarus
                        Muoka is anchored are:
                    </Text>
                    <View className=" py-4">
                        {services.map(s => (
                            <View key={s._id} className="py-3 space-y-2">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(s._id)}
                                >
                                    <View className="flex-row items-center bg-background py-1 px-2">
                                        <CusIcon
                                            name={
                                                dropDown && idx === s._id
                                                    ? "caret-down"
                                                    : "caret-forward"
                                            }
                                        />
                                        <Text className="flex-1 text-lg font-semibold text-primary uppercase">
                                            {processText(s.title)}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {dropDown && idx === s._id && (
                                    <View>
                                        <View className="flex-row items-center justify-between py-2">
                                            <View className="flex-row items-center space-x-2">
                                                <Text className="capitalize text-lg font-semibold text-primary">
                                                    Day:
                                                </Text>
                                                <Text className="capitalize text-lg font-semibold">
                                                    {s.day}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center space-x-2">
                                                <Text className="capitalize text-lg font-semibold text-primary">
                                                    Time:
                                                </Text>
                                                <Text className="capitalize text-lg font-semibold">
                                                    {s.time}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text
                                            className="text-lg leading-7
                                6"
                                        >
                                            {processText(s.body)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                <Text className="capitalize text-2xl italic text-center font-extrabold text-primary tracking-widest">
                    Jesus Is Lord
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};
export default AboutScreen;
