import { useEffect, useState, useContext, useCallback } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalContext } from "../hooks/GlobalContext";
import { processText, saveToCloudinary } from "../lib/utils";
import { View, Text, BackHandler, ScrollView, TextInput } from "react-native";
import {
    CusIcon,
    DatePicker,
    FilePicker,
    Separator,
    FormsImageView
} from "../components";
import {
    useAddNewAnnouncementMutation,
    useUpdateAnnouncementMutation
} from "../redux/announcement/announcementApiSlice";
const AnnouncementForm = ({ route, navigation }) => {
    const { name, multiple, action } = route.params;

    const {
        handleInputChange,
        value,
        setObj,
        obj,
        formArray,
        setValue,
        file,
        setFile,
        formsImageViewModal,
        setFormsImageViewModal,
        setImageIndex,
        imageIndex
    } = useContext(GlobalContext);
    const [adding, setAdding] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [errors, setErrors] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { title, image, start, end, link, body } = value;
    const canCreate = [].every(Boolean) && (!adding || !updating);

    const [valueReady, setValueReady] = useState(false);

    const [
        updateAnnouncement,
        { isSuccess: updated, isError: updateIsError, error: updateError }
    ] = useUpdateAnnouncementMutation();
    const [
        addNewAnnouncement,
        { isSuccess: added, isError: addIsError, error: addError }
    ] = useAddNewAnnouncementMutation();

    const handleFormSubmit = async () => {
        if (!canCreate) {
            setErrors(true);
            return;
        }

        try {
            if (action === "create") {
                setAdding(true);
                if (addIsError) {
                    setErrorMsg(addError.message);
                    return;
                }
               const res= await addNewAnnouncement(value);
               console.log('anno', res)
            } else if (action === "edit") {
                setUpdating(true);
                if (updateIsError) {
                    setErrorMsg(updateError.message);
                    return;
                }
                await updateAnnouncement(value);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setAdding(false);
            setUpdating(false);
            setErrors(false);
            if (!addError||!updateError) {
                navigation.goBack();
            }
        }
    };

    const [selected, setSelected] = useState("Offering");
    const [dropdown, setDropdown] = useState(false);
    const [focused, setFocused] = useState(false);

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
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-2">
                <Text
                    className="capitalize text-2xl font-extrabold text-center
                py-2"
                >
                    {name} form
                </Text>
                <ScrollView
                    scrollEnabled
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    contentInsetAdjustmentBehavior="always"
                >
                    <View
                        className="border border-primary rounded-lg
                    bg-background space-y-2 px-2 py-2"
                    >
                        <Text className="capitalize">
                            wrap text around this special characters to get the
                            following results
                        </Text>
                        <View
                            className="flex-row flex-wrap mr-2
                        items-center "
                        >
                            <Text>*italic* --> {processText("*italic*")}</Text>
                            <Text>**bold** --> {processText("**bold**")}</Text>
                            <Text>
                                ***bold italic*** -->
                                {processText("***bold italic***")}
                            </Text>
                            <Text>
                                ##new##lin e####an other new line -->
                                {processText(
                                    "##***new*** ##line####another new line"
                                )}
                            </Text>
                            <Text>
                                ##***new*** *##line*####another new line -->
                                {processText(
                                    "##***new*** ##*line*####**another** ##*new* line"
                                )}
                            </Text>
                        </View>
                        <Text
                            className="text-center font-medium py-2 text-md
                        capitalize text-danger"
                        >
                            {errorMsg}
                        </Text>
                    </View>
                    <View className="px-2 py-2 space-y-2">
                        {formArray.map((f, i) => (
                            <View key={f.id + i} className="space-y-2">
                                <Text className="capitalize text-md  font-semibold px-2">
                                    {f.label}
                                </Text>
                                {f.id === "start" ||
                                f.id === "end" ||
                                f.id === "date" ? (
                                    <DatePicker
                                        value={value}
                                        id={f.id}
                                        name={f.name}
                                        handleInputChange={handleInputChange}
                                    />
                                ) : f.id === "image" ? (
                                    <FilePicker
                                        id={f.id}
                                        setImageIndex={setImageIndex}
                                        setFormsImageViewModal={
                                            setFormsImageViewModal
                                        }
                                        setValue={setValue}
                                        setFile={setFile}
                                        imageIndex={imageIndex}
                                        setFormsImageViewModal={
                                            setFormsImageViewModal
                                        }
                                        setFile={setFile}
                                        value={value}
                                        multiple={multiple}
                                        type={[
                                            "image/png",
                                            "image/jpg",
                                            "image/jpeg"
                                        ]}
                                        name={f.name}
                                        handleInputChange={handleInputChange}
                                    />
                                ) : f.array ? (
                                    <View className="pl-4 space-y-2">
                                        {f?.array.map(b => (
                                            <View key={b.id} className="">
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
                                                    value={obj[b.id]}
                                                    placeholder={b.placeholder}
                                                    onChangeText={text =>
                                                        handleInnerChange(
                                                            text,
                                                            b.id,
                                                            b.name
                                                        )
                                                    }
                                                    inputMode={b.type}
                                                    multiline={b.multiline}
                                                    onBlur={() => {
                                                        setFocused(
                                                            prev => !prev
                                                        );
                                                        obj[b.id].length
                                                            ? (b.focused = true)
                                                            : null;
                                                    }}
                                                    numberOfLines={
                                                        b.multiline ? 5 : null
                                                    }
                                                />
                                                {obj[b.id].length &&
                                                b.focused &&
                                                !b.pattern.test(obj[b.id]) ? (
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
                                                onPress={() => onAddArray(f.id)}
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
                                        {Object.values(f.obj).map(j => (
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
                                                    value={value[f.id][j.id]}
                                                    placeholder={j.placeholder}
                                                    onChangeText={text =>
                                                        handleInputChange(
                                                            text,
                                                            f.id,
                                                            j.name
                                                        )
                                                    }
                                                    inputMode={j.type}
                                                    multiline={j.multiline}
                                                    onBlur={() => {
                                                        setFocused(
                                                            prev => !prev
                                                        );
                                                        value[j.id].length
                                                            ? (j.focused = true)
                                                            : null;
                                                    }}
                                                    numberOfLines={
                                                        j.multiline ? 5 : null
                                                    }
                                                />
                                                {value[f.id][j.id]?.length &&
                                                j.focused &&
                                                !f?.pattern.test(
                                                    value[f?.id][j.id]
                                                ) ? (
                                                    <Text className="text-danger">
                                                        {j?.error}
                                                    </Text>
                                                ) : null}
                                            </View>
                                        ))}
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
                                                setDropdown(prev => !prev)
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
                                                    {f.isSelect.map(s => (
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
                                                                {s}
                                                            </Text>
                                                            <Separator />
                                                        </>
                                                    ))}
                                                </ScrollView>
                                            </View>
                                        )}
                                    </View>
                                ) : (
                                    <TextInput
                                        style={{
                                            textAlignVertical: f.multiline
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
                                        onBlur={() => {
                                            setFocused(prev => !prev);
                                            value[f.id]?.length
                                                ? (f.focused = true)
                                                : null;
                                        }}
                                        numberOfLines={f.multiline ? 5 : null}
                                    />
                                )}
                                {!f.array && !f.obj ? (
                                    value[f.id]?.length &&
                                    f?.focused &&
                                    !f?.pattern.test(value[f.id]) ? (
                                        <Text className="text-danger">
                                            {f?.error}
                                        </Text>
                                    ) : null
                                ) : null}
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <Text>
                    {name === "create"
                        ? addIsError
                            ? addError.data.message
                            : null
                        : updateIsError
                        ? updateError.data.message
                        : null}
                </Text>
                {errors && (
                    <Text className="text-danger text-lg capitalize text-center">
                        validate all input field and try again
                    </Text>
                )}
                <Text
                    onPress={() =>
                        adding || updating ? null : handleFormSubmit()
                    }
                    className=" text-xl capitalize bg-primary text-white
                    font-semibold px-2 my-2 py-3 rounded-lg text-center"
                >
                    {action === "create"
                        ? adding
                            ? "creating"
                            : "create"
                        : updating
                        ? "editing"
                        : "edit"}{" "}
                    {name}
                </Text>
            </View>
            <FormsImageView />
        </SafeAreaView>
    );
};
export default AnnouncementForm;
