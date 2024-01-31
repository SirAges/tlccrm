import { useEffect, useState, useContext, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalContext } from "../hooks/GlobalContext";

import {
    View,
    Text,
    Modal,
    BackHandler,
    ScrollView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions
} from "react-native";

import { CusIcon, DatePicker, FilePicker, Separator } from "../components/";
const FormScreen = ({ route }) => {
    const { formArray, name, multiple } = route.params;
    const { handleInputChange, value,obj } = useContext(GlobalContext);
    const [selected, setSelected] = useState("Offering");
    const [dropdown, setDropdown] = useState(false);
    const [idx, setIdx] = useState(null);
    const [prvIdx, setPrvIdx] = useState(null);
   
    const handleInnerChange = (text, id) => {
        setObj(prev => ({ ...prev, [id]: text }));
    };
    const handleDropdown = (s, id, name) => {
        setSelected(s);
        handleInputChange(s, id, name);
        setDropdown(prev => !prev);
    };
    const onAddArray = id => {
        handleInputChange(obj, id);
        console.log(value);
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-2">
                <ScrollView
                    scrollEnabled
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    contentInsetAdjustmentBehavior="always"
                >
                    <View className="pb-4">
                        <View className="">
                            <Text className="capitalize text-2xl font-extrabold text-center">
                                {name} form
                            </Text>
                        </View>
                        <View className="">
                            <View className="">
                                <View className="px-2 py-2 space-y-2">
                                    {formArray.map((f, i) => (
                                        <View
                                            key={f.id + i}
                                            className="space-y-2"
                                        >
                                            <Text className="capitalize text-md  font-semibold px-2">
                                                {f.label}
                                            </Text>
                                            {f.id === "start" ||
                                            f.id === "end" ||
                                            f.id === "date" ? (
                                                <DatePicker
                                                    id={f.id}
                                                    name={f.name}
                                                    handleInputChange={
                                                        handleInputChange
                                                    }
                                                />
                                            ) : f.id === "image" ? (
                                                <FilePicker
                                                    id={f.id}
                                                    multiple={multiple}
                                                    type={[
                                                        "image/png",
                                                        "image/jpg",
                                                        "image/jpeg"
                                                    ]}
                                                    name={f.name}
                                                    handleInputChange={
                                                        handleInputChange
                                                    }
                                                />
                                            ) : f.array ? (
                                                <View className="pl-4 space-y-2">
                                                    {f.array.map(b => (
                                                        <View className="">
                                                            <Text className="capitalize text-md  font-semibold px-2">
                                                                {b.label}
                                                            </Text>
                                                            <TextInput
                                                                style={{
                                                                    textAlignVertical:
                                                                        b.multiline
                                                                            ? "top"
                                                                            : null
                                                                }}
                                                                className="px-2 py-2 align-text-top bg-background border border-primary/10 rounded-lg"
                                                                value={
                                                                    obj[b.id]
                                                                }
                                                                placeholder={
                                                                    b.placeholder
                                                                }
                                                                onChangeText={text =>
                                                                    handleInnerChange(
                                                                        text,
                                                                        b.id,
                                                                        b.name
                                                                    )
                                                                }
                                                                inputMode={
                                                                    b.type
                                                                }
                                                                multiline={
                                                                    b.multiline
                                                                }
                                                                onFocus={() =>
                                                                    setIdx(b.id)
                                                                }
                                                                onBlur={() =>
                                                                    setPrvIdx(
                                                                        b.id
                                                                    )
                                                                }
                                                                numberOfLines={
                                                                    b.multiline
                                                                        ? 5
                                                                        : null
                                                                }
                                                            />
                                                            {(idx === b.id &&
                                                                obj[b.id]
                                                                    .length <
                                                                    4) ||
                                                            (prvIdx === b.id &&
                                                                obj[b.id]
                                                                    .length <
                                                                    4) ? (
                                                                <Text className="text-danger">
                                                                    {b.error}
                                                                </Text>
                                                            ) : null}
                                                        </View>
                                                    ))}
                                                    <View
                                                        className="flex-row
                                                    justify-end"
                                                    >
                                                        <Text
                                                            onPress={() =>
                                                                onAddArray(f.id)
                                                            }
                                                            className="max-w-[50%]
                                                            text-md
                                                        capitalize bg-primary
                                                        text-white font-medium
                                                        px-2 py-3 rounded-lg
                                                        text-center "
                                                        >
                                                            {f.label}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ) : f.obj ? (
                                                <View className="pl-4 space-y-2">
                                                    {Object.values(f.obj).map(
                                                        j => (
                                                            <View className="">
                                                                <Text className="capitalize text-md  font-semibold px-2">
                                                                    {j.label}
                                                                </Text>
                                                                <TextInput
                                                                    style={{
                                                                        textAlignVertical:
                                                                            j.multiline
                                                                                ? "top"
                                                                                : null
                                                                    }}
                                                                    className="px-2 py-2 align-text-top bg-background border border-primary/10 rounded-lg"
                                                                    value={
                                                                        value[
                                                                            f.id
                                                                        ][j.id]
                                                                    }
                                                                    placeholder={
                                                                        j.placeholder
                                                                    }
                                                                    onChangeText={text =>
                                                                        handleInputChange(
                                                                            text,
                                                                            f.id,
                                                                            j.name
                                                                        )
                                                                    }
                                                                    inputMode={
                                                                        j.type
                                                                    }
                                                                    multiline={
                                                                        j.multiline
                                                                    }
                                                                    onFocus={() =>
                                                                        setIdx(
                                                                            j.id
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        setPrvIdx(
                                                                            j.id
                                                                        )
                                                                    }
                                                                    numberOfLines={
                                                                        j.multiline
                                                                            ? 5
                                                                            : null
                                                                    }
                                                                />
                                                                {(idx ===
                                                                    j.id &&
                                                                    value[f.id][
                                                                        j.id
                                                                    ].length <
                                                                        4) ||
                                                                (prvIdx ===
                                                                    j.id &&
                                                                    value[f.id][
                                                                        j.id
                                                                    ].length <
                                                                        4) ? (
                                                                    <Text className="text-danger">
                                                                        {
                                                                            j.error
                                                                        }
                                                                    </Text>
                                                                ) : null}
                                                            </View>
                                                        )
                                                    )}
                                                </View>
                                            ) : f.isSelect ? (
                                                <View className="relative">
                                                    <Text
                                                        className="h-fit
                                                        bg-background capitalize
                                                    font-medium px-2 py-3
                                                    align-text-top bg-background
                                                    border border-primary/10
                                                    rounded-lg"
                                                        onPress={() =>
                                                            setDropdown(
                                                                prev => !prev
                                                            )
                                                        }
                                                    >
                                                        {selected}
                                                    </Text>
                                                    {dropdown && (
                                                        <View
                                                            className="absolute
                                                             z-20 h-24 top-0
                                                        bg-white shadow-md
                                                        shadow-black w-52
                                                        space-y-2 px-2 py-2 align-text-top bg-background border border-primary/10 rounded-lg"
                                                        >
                                                            <ScrollView>
                                                                {f.isSelect.map(
                                                                    s => (
                                                                        <>
                                                                            <Text
                                                                                onPress={() =>
                                                                                    handleDropdown(
                                                                                        s,
                                                                                        f.id,
                                                                                        f.name
                                                                                    )
                                                                                }
                                                                                className="bg-background
                                                                            
                                                       flex-1 my-1          capitalize"
                                                                            >
                                                                                {
                                                                                    s
                                                                                }
                                                                            </Text>
                                                                            <Separator />
                                                                        </>
                                                                    )
                                                                )}
                                                            </ScrollView>
                                                        </View>
                                                    )}
                                                </View>
                                            ) : (
                                                <TextInput
                                                    style={{
                                                        textAlignVertical:
                                                            f.multiline
                                                                ? "top"
                                                                : null
                                                    }}
                                                    className="px-2 py-2 align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
                                                    value={value[f.id]}
                                                    placeholder={f.placeholder}
                                                    onChangeText={text =>
                                                        handleInputChange(
                                                            text,
                                                            f.id,
                                                            f.name
                                                        )
                                                    }
                                                    inputMode={f.type}
                                                    multiline={f.multiline}
                                                    onFocus={() => setIdx(f.id)}
                                                    onBlur={() =>
                                                        setPrvIdx(f.id)
                                                    }
                                                    numberOfLines={
                                                        f.multiline ? 5 : null
                                                    }
                                                />
                                            )}
                                            {(idx === f.id &&
                                                value[f.id].length < 4) ||
                                            (prvIdx === f.id &&
                                                value[f.id].length < 4) ? (
                                                <Text className="text-danger">
                                                    {f.error}
                                                </Text>
                                            ) : null}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Text
                    onPress={() => handleFormSubmit()}
                    className=" text-xl capitalize bg-primary text-white
                    font-semibold px-2 my-2 py-3 rounded-lg text-center"
                >
                    Submit Your {name}
                </Text>
            </View>
        </SafeAreaView>
    );
};
export default FormScreen;
