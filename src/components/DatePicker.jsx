import React, { useState, useRef } from "react";
import { View, Text, Button, Alert } from "react-native";
import { CusIcon } from "./";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateTime } from "../lib/utils";
const DatePicker = ({ id, handleInputChange, name, value }) => {
    const date = useRef(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisible(prev => !prev);
    };
    const valueType = value[id];
    const handleConfirm = async d => {
        if (d || d !== undefined || d !== null) {
            if (id === "end") {
                const selectedDate = new Date(d);
                const minDate = new Date(value.start);

                const canPick = selectedDate > minDate;
                if (canPick) {
                    handleInputChange(d, id, name);
                } else {
                    Alert.alert("End date must be greater than start date");
                }
            } else {
                handleInputChange(d, id, name);
            }
        }
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisible(prev => !prev);
    };

    return (
        <View
            className="max-h-12 flex-row items-center space-x-2 px-2 py-1 min-h-fit align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
        >
            <CusIcon name="calendar" action={showDatePicker} />
            <Text className="font-medium">
                {valueType? formatDateTime(valueType) : "No date selected"}
            </Text>
            <DateTimePickerModal
                date={date.current}
                isVisible={datePickerVisible}
                mode="datetime"
                is24Hour
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default DatePicker;
