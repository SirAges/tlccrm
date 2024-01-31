import { useEffect, useState, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

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

import { CusIcon, DatePicker, FilePicker } from "../components/";
const Form = ({
    name,
    extra,
    value,
    inner,
    formModal,
    setFormModal,
    idx,
    setIdx,
    prvIdx,
    setPrvIdx,
    formArray,
    handleInputChange,
    onAddArray,
    handleFormSubmit,
    handleInnerChange
}) => {
    // const onFocusEffect = useCallback(() => {
    //     AvoidSoftInput.setAdjustPan();
    //     return () => {
    //         AvoidSoftInput.setDefaultAppSoftInputMode();
    //     };
    // }, []);

    // useFocusEffect(onFocusEffect);

    useEffect(() => {
        const backAction = () => {
            if (formModal) {
                setFormModal(false);
                return true; // Prevent default behavior (exit the app)
            }
            return false; // Default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener on component unmount
    }, [formModal]);
    const [date, setDate] = useState(new Date());

    return (
        <View className="flex-1">
            <Modal
                className="flex-1"
                animationType="slide"
                transparent={false}
                visible={formModal}
                onRequestClose={() => setFormModal(false)}
            >
               
            </Modal>
        </View>
    );
};
export default Form;
