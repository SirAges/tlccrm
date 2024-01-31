import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { CusIcon } from "./";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateTime } from "../lib/utils";
const DatePicker = ({ id, handleInputChange,name }) => {
    const [date, setDate] = useState();
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(prev => !prev);
    };
    const handleConfirm = d => {
        handleInputChange(d, id,name);
        setDate(d);
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisible(prev => !prev);
    };

    return (
        <SafeAreaView className="">
            <View
                className="flex-row items-center space-x-2 px-2 py-1 min-h-fit align-text-top
                                bg-background border border-primary/10
                                rounded-lg"
            >
                <CusIcon name="calendar" action={showDatePicker} />
                <Text className="font-medium">
                    {date ? formatDateTime(date) : "No date selected"}
                </Text>
                <DateTimePickerModal
                    date={date}
                    isVisible={datePickerVisible}
                    mode="datetime"
                    is24Hour
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </SafeAreaView>
    );
};

export default DatePicker;
