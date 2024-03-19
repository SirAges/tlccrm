import { useEffect, useState, useContext } from "react";
import {
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Text,
    BackHandler,
    TextInput,
    Alert
} from "react-native";
import { GlobalContext } from "../hooks/GlobalContext";
import {
    useGetUserHiddensQuery,
    useDeleteUserHiddenMutation,
    useAddNewUserHiddenMutation
} from "../redux/user/userApiSlice";
import {
    Loader,
    CusIcon,
    FilePicker,
    DatePicker,
    CusSwitch,
    CusSelect
} from "./";
const CusPrompt = ({
    title,
    editKey,
    editInner,
    setPopup,
    handleSubmit,
    editting,
    setEditting,
    setEditText,
    editText,
    hiddens,
    userId,
    isHidden,
    toggleOffline,
    setToggleOffline
}) => {
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
    const [addNewUserHidden] = useAddNewUserHiddenMutation();
    const selects =editKey==="departments"? [
        "Intercessory",
        "Evangelism",
        "Ushering",
        "Choir",
        "Chorus",
        "Technical",
        "Media",
        "Outreach",
        "Counseling",
        "Welfare",
        "Finance",
        "Protocol",
        "Hospitality"
    ]:["Children Ministry","Youth Ministry","Women Ministry","Welfare Ministry"]
    const [deleteUserHidden] = useDeleteUserHiddenMutation();
    const [dropdown, setDropdown] = useState(false);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        if (editKey === "departments") {
            setEditText("intercessory");
        }else if (editKey === "ministry") {
            setEditText("Children Ministry");
        }
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                setPopup(false);
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);
    const handleDropdown = (s, id, name) => {
        setEditText(s);
        setDropdown(prev => !prev);
    };
    const handleShow = () => {
        const show = async () => {
            try {
                setHiding(true);
                const res = await deleteUserHidden({
                    userId,
                    hiddenId: editInner ? editInner : editKey
                });
                console.log("resunhid", res);
                if (res?.error) {
                    Alert.alert("Join This request", res?.error?.data);
                }
            } catch (error) {
                console.log("Failed to process request try again", error);
            } finally {
                setHiding(false);
                setPopup(false);
            }
        };
        Alert.alert(
            `show ${editInner ? editInner : editKey}`,
            `Are you sure you want to show ${editInner ? editInner : editKey}`,
            [
                ({
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => show() })
            ]
        );
    };
    const handleHide = () => {
        const hide = async () => {
            try {
                setHiding(true);
                const res = await addNewUserHidden({
                    userId,
                    hiddenId: editInner ? editInner : editKey
                });
                console.log("reshid", res);

                if (res?.error) {
                    Alert.alert(
                        "Failed to process request try again",
                        res?.error?.data
                    );
                }
            } catch (error) {
                console.log("errorjoin", error);
            } finally {
                setHiding(false);
                setPopup(false);
            }
        };
        Alert.alert(
            `show ${editInner ? editInner : editKey}`,
            `Are you sure you want to hide ${editInner ? editInner : editKey}`,
            [
                ({
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => hide() })
            ]
        );
    };

    let content;
    content = (
        <>
            <View className="w-full">
                {(editKey === "image" || editKey === "cImage") && (
                    <FilePicker
                        id={editKey}
                        setImageIndex={setImageIndex}
                        setFormsImageViewModal={setFormsImageViewModal}
                        setValue={setValue}
                        setFile={setFile}
                        disabled={isHidden()}
                        imageIndex={imageIndex}
                        setFormsImageViewModal={setFormsImageViewModal}
                        setFile={setFile}
                        value={value}
                        multiple={false}
                        type={["image/png", "image/jpg", "image/jpeg"]}
                        name={editKey}
                        handleInputChange={handleInputChange}
                    />
                )}

                {editKey !== "cImage" &&
                    editKey !== "image" &&
                    editKey !== "dateJoined" &&
                    editKey !== "departments"&&editKey!=="ministry" && (
                        <TextInput
                            editable={!isHidden()}
                            className="align-text-top px-2 py-2 align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
                            value={editText}
                            multiline={editInner === "about"}
                            numberOfLines={editInner === "about" ? 5 : null}
                            style={{
                                textAlignVertical:
                                    editInner === "about" ? "top" : null
                            }}
                            placeholder={
                                editInner
                                    ? editInner
                                          .replace("resident", "Resident ")
                                          .replace("Code", " Code")
                                    : editKey
                            }
                            onChangeText={text => setEditText(text)}
                            inputMode={"text"}
                        />
                    )}
                {(editKey === "departments"||editKey==="ministry") && (
                    <CusSelect
                        id={editKey}
                        name={editKey}
                        selected={editText}
                        dropdown={dropdown}
                        setDropdown={setDropdown}
                        selects={selects}
                        handleDropdown={handleDropdown}
                    />
                )}
                {editKey === "dateJoined" && (
                    <DatePicker
                        value={value}
                        id={editKey}
                        name={"dateJoined"}
                        handleInputChange={handleInputChange}
                    />
                )}
            </View>

            <Text
                onPress={editting || isHidden() ? null : handleSubmit}
                className={`mt-4 ${isHidden() ? "bg-primary/40" : "bg-primary"}
                    uppercase rounded-md text-white font-semibold w-1/2 py-3
                    px-2 text-center`}
            >
                {editting ? "editing" : "edit"}
            </Text>
        </>
    );

    if (editKey === "online") {
        content = (
            <View>
                <CusSwitch
                    value={toggleOffline}
                    onValueChange={
                        isHidden(editKey)
                            ? null
                            : () => setToggleOffline(prev => !prev)
                    }
                />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => setPopup(false)}>
            <View
                className="absolute bottom-0 h-full w-full
            bg-transparent"
            >
                <View className="absolute bottom-0 w-full h-fit">
                    <TouchableWithoutFeedback onPress={null}>
                        <View
                            className="w-full rounded-t-3xl 
                items-center px-5 py-5 shadow-lg shadow-black
                bg-white max-h-56"
                        >
                            <Text className="capitalize w-full mb-3 font-bold text-xl text-center">
                                {title} {editKey}
                            </Text>
                            {content}
                        </View>
                    </TouchableWithoutFeedback>
                    <View className="absolute right-4 top-4">
                        <Text
                            className="text-primary"
                            onPress={
                                hiding
                                    ? null
                                    : () =>
                                          isHidden()
                                              ? handleShow()
                                              : handleHide()
                            }
                        >
                            {isHidden() ? "show" : "hide"}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default CusPrompt;
