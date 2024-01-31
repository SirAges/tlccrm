import { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { processText } from "../lib/utils";
import { CusIcon, AddButton } from "../components";
import { bankAccounts } from "../lib/data";
import { giveForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
const GiveScreen = ({ navigation }) => {
    const { setValue } = useContext(GlobalContext);
    useEffect(() => {
        setValue({
            name: "",
            amount: "",
            purpose: "",
            body: ""
        });
    }, []);
    const [cdx, setCdx] = useState(null);
    const [idx, setIdx] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleDropdown = clicked => {
        if (clicked === idx) {
            setDropDown(prev => !prev);
        } else {
            setIdx(clicked);
            setDropDown(true);
        }
    };

    const handleCopyToClipboard = async text => {
        setCdx(text);

        await Clipboard.setStringAsync(text);
        const clip = await Clipboard.getStringAsync();
        setCopied(true);
        if (clip !== text) {
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        } else {
            setTimeout(() => {
                setCopied(false);
            }, 7000);
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <View className="bg-primary w-full h-96 relative items-center justify-center">
                    <Image
                        style={{ resizeMode: "cover" }}
                        source={require("../../assets/images/ch2.png")}
                        className="w-full h-full opacity-80"
                    />
                    <View
                        className="absolute w-3/4 h-52 bg-white rounded-lg shadow-lg shadow-black items-center justify-center px-2 py-1
                    "
                    >
                        <Text className="capitalize font-extrabold text-4xl text-title">
                            Give online
                        </Text>
                        <Text className="uppercase font-semibold text-lg">
                            Support us as We take Salvation to the World
                        </Text>
                        <Text className="  text-md text-body italic text-justify">
                            “Each of you should give what you have decided in
                            your heart to give, not reluctantly or under
                            compulsion, for God loves a cheerful giver.” – 2
                            Corinthians 9:7
                        </Text>
                    </View>
                </View>

                <View className="px-3">
                    <Text className="uppercase text-2xl text-center font-extrabold text-primary pb-3">
                        Our Account Numbers
                    </Text>
                    <Text className="text-lg text-justify ">
                        Sow a seed into the ministry of The Lord’s Chosen
                        Charismatic Revival Ministries and join us in our aim to
                        reach out and touch billions of lives through the Word
                        of God – the Gospel of Jesus Christ, please follow these
                        instructions:
                    </Text>
                    <View className=" py-4">
                        {bankAccounts.map(a => (
                            <View key={a._id} className="py-3 space-y-2">
                                <TouchableWithoutFeedback
                                    onPress={() => handleDropdown(a._id)}
                                >
                                    <View className="flex-row items-start bg-background py-1 px-2">
                                        <CusIcon
                                            name={
                                                dropDown && idx === a._id
                                                    ? "caret-down"
                                                    : "caret-forward"
                                            }
                                        />
                                        <Text className="flex-1 text-lg font-semibold text-primary uppercase">
                                            {processText(a.title)}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                {dropDown && idx === a._id && (
                                    <View className="px-2">
                                        {a.bankName && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    bank name:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.bankName
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.bankName}
                                                    </Text>
                                                    {copied &&
                                                        cdx === a.bankName && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {a.accountName && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    account name:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.accountName
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.accountName}
                                                    </Text>
                                                    {copied &&
                                                        cdx ===
                                                            a.accountName && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {a.accountNumber && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    account number:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.accountNumber
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.accountNumber}
                                                    </Text>
                                                    {copied &&
                                                        cdx ===
                                                            a.accountNumber && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {a.swiftCode && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    Swift code:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.swiftCode
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.swiftCode}
                                                    </Text>
                                                    {copied &&
                                                        cdx === a.swiftCode && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {a.iban && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    iban:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.iban
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.iban}
                                                    </Text>
                                                    {copied &&
                                                        cdx === a.iban && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {a.routing && (
                                            <View className="flex-row items-center justify-between ">
                                                <Text className="uppercase text-primary font-extrabold text-lg">
                                                    routing/aba no:
                                                </Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        onPress={() =>
                                                            handleCopyToClipboard(
                                                                a.routing
                                                            )
                                                        }
                                                        className="font-semibold uppercase"
                                                    >
                                                        {a.routing}
                                                    </Text>
                                                    {copied &&
                                                        cdx === a.routing && (
                                                            <View className="flex-row items-center">
                                                                <CusIcon
                                                                    name="copy-outline"
                                                                    hw=" top-2 right-0"
                                                                    p="n"
                                                                    m={0}
                                                                    size={15}
                                                                />
                                                                <Text className="lowercase text-xs text-primary">
                                                                    Copied
                                                                </Text>
                                                            </View>
                                                        )}
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <Text className="capitalize text-2xl italic text-center font-extrabold text-primary tracking-widest pb-3">
                    Jesus Is Lord
                </Text>
            </ScrollView>

            <AddButton
                action={() =>
                    navigation.navigate("FormScreen", {
                        name: "giving",
                        formArray: giveForm,
                        multiple: false
                    })
                }
            />
        </SafeAreaView>
    );
};
export default GiveScreen;
