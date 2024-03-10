import { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { processText } from "../lib/utils";
import { CusIcon, AddButton, ScreenLoader, Loader } from "../components";
import { giveForm, bankAccountForm } from "../lib/forms";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    useGetBankAccountsQuery,
    useDeleteBankAccountMutation
} from "../redux/bankAccount/bankAccountApiSlice";

const GiveScreen = ({ navigation }) => {
    const { setValue, setFormArray } = useContext(GlobalContext);
    const [cdx, setCdx] = useState(null);
    const [idx, setIdx] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [copied, setCopied] = useState(false);
    const [allBankAccounts, setAllBankAccounts] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const {
        data: bankAccounts,
        isLoading,
        isSuccess,
        isError,
        error,refetch
    } = useGetBankAccountsQuery("bankAccountslist", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    const [
        deleteBankAccount,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteBankAccountMutation();

    useEffect(() => {
        try {
            setLoading(true);

            if (bankAccounts && bankAccounts !== undefined) {
                setAllBankAccounts(bankAccounts);
                console.log("bank", allBankAccounts);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [bankAccounts]);
  
    const refresh = async () => {
        setIsRefreshing(true);
        setLoading(true);

        try {
            await refetch();
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteBankAccount(id);
            } catch (error) {
                console.log("del", deleteError);
                throw new Error(error.message);
            } finally {
                if (deleted || deleteIsError) {
                    setDeleting(false);
                    setDeletingItem(null);
                }
            }
        };
        Alert.alert(
            "Delete This BankAccount",
            "Are you sure you want to delete this bankAccount",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };

    const handleEdit = item => {
        setFormArray(bankAccountForm);
        setValue(item);
        navigation.navigate("BankAccountForm", {
            name: "bank account",
            action: "edit",
            multiple: false
        });
    };
    const handleNavigation = () => {
        setFormArray(giveForm);
        setValue({
            name: "",
            amount: "",
            purpose: "",
            body: ""
        });
        navigation.navigate("GiveForm", {
            name: "giving",
            action: "create",
            multiple: false
        });
    };

    const handleBankNavigation = () => {
        setFormArray(bankAccountForm);
        setValue({
            title: "",
            bankName: "",
            accountName: "",
            accountNumber: "",
            routing: "",
            swiftCode: "",
            iban: ""
        });
        navigation.navigate("BankAccountForm", {
            name: "bank account",
            action: "create",
            multiple: false
        });
    };

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

    let content;
    content = (
        <View className=" py-4">
            {allBankAccounts.map(a => (
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
                            <CusIcon
                                action={() => handleEdit(a)}
                                size={20}
                                name="create"
                            />
                            {deleting && a._id === deletingItem && <Loader />}
                            <CusIcon
                                color="text-danger"
                                action={() => handleDelete(a._id)}
                                size={20}
                                name="trash"
                            />
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
                                        {copied && cdx === a.bankName && (
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
                                        {copied && cdx === a.accountName && (
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
                                        {copied && cdx === a.accountNumber && (
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
                                        {copied && cdx === a.swiftCode && (
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
                                                handleCopyToClipboard(a.iban)
                                            }
                                            className="font-semibold uppercase"
                                        >
                                            {a.iban}
                                        </Text>
                                        {copied && cdx === a.iban && (
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
                                                handleCopyToClipboard(a.routing)
                                            }
                                            className="font-semibold uppercase"
                                        >
                                            {a.routing}
                                        </Text>
                                        {copied && cdx === a.routing && (
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
    );
    if (isError || error?.data)
        content = <ScreenLoader refresh={refresh} text="no content try again..." />;
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;
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
                        className="flex-row items-center space-x-2 absolute
                    top-5 right-5"
                    >
                        <Text
                            className=" capitalize font-medium text-white
                    bg-primary px-2 py-2 rounded-lg shadow-lg shadow-black"
                            onPress={() => handleBankNavigation()}
                        >
                            add bank account
                        </Text>
                        <Text
                            className=" capitalize font-medium text-white
                    bg-primary px-2 py-2 rounded-lg shadow-lg shadow-black"
                            onPress={() =>
                                navigation.navigate("GiveListScreen")
                            }
                        >
                            givers list
                        </Text>
                    </View>
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
                    {content}
                </View>

                <Text className="capitalize text-2xl italic text-center font-extrabold text-primary tracking-widest pb-3">
                    Jesus Is Lord
                </Text>
            </ScrollView>

            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default GiveScreen;
