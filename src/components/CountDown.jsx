import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { formatDateAgo } from "../lib/utils";

const CountDown = ({ date, navigation }) => {
    const [counts, setCounts] = useState({});
    const countDowns = () => {
        const thirty = [4, 6, 9, 11];
        const thirtyone = [1, 3, 5, 7, 8, 10, 12];

        const dateObject = new Date(date);
        const countdownDate = dateObject.getTime();

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                setCounts({
                    years: 0,
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            } else {
                const years = Math.floor(
                    distance / (1000 * 60 * 60 * 24 * 365)
                );
                const months = Math.floor(
                    distance /
                        (1000 *
                            60 *
                            60 *
                            24 *
                            (thirty.includes(dateObject.getUTCMonth() + 1)
                                ? 30
                                : 31))
                );
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((distance / (1000 * 60)) % 60);
                const seconds = Math.floor((distance / 1000) % 60);

                setCounts({ years, months, days, hours, minutes, seconds });
            }
        }, 1000);

        return countdownInterval;
    };
    useEffect(() => {
        const interval = countDowns();

        return () => {
            clearInterval(interval);
        };
    }, [date]);

    const today = new Date();

    const programDate = new Date(date);

    const millidays = today - programDate;
    const days = Math.floor(millidays / (1000 * 60 * 60 * 24)) + 1;
    const programDay =
        counts.years === 0 &&
        counts.months === 0 &&
        counts.days === 0 &&
        counts.hours === 0 &&
        counts.minutes === 0 &&
        counts.seconds === 0;
    return (
        <View
            className="flex-row items-center space-x-2 rounded-md  bg-black/50
        shadow-black shadow-lg px-2 my-2 py-2 w-full"
        >
            {counts.years !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">Year</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.years}
                    </Text>
                </View>
            )}

            {counts.months !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">month</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.months}
                    </Text>
                </View>
            )}
            {counts.days !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">day</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.days}
                    </Text>
                </View>
            )}
            {counts.hours !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">hour</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.hours}
                    </Text>
                </View>
            )}
            {counts.minutes !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">minute</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.minutes}
                    </Text>
                </View>
            )}

            {counts.minutes !== 0 && (
                <View className=" items-center justify-center grow ">
                    <Text className=" capitalize text-white">second</Text>
                    <Text className=" text-white font-extrabold">
                        {counts.seconds}
                    </Text>
                </View>
            )}

            {programDay && days === 1 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className="capitalize text-white">
                        happening live
                    </Text>
                    <Text className="capitalize text-lg font-medium text-white">
                        welcome to the day one
                    </Text>
                    <Text
                        className=" text-xl font-extrabold capitalize
                        bg-primary text-white rounded-md shadow-lg shadow-black
                        px-2 py-1"
                        onPress={() => navigation.navigate("LiveScreen")}
                    >
                        Join live
                    </Text>
                </View>
            )}

            {programDay && days > 2 && (
                <View
                    className=" items-center bg-primary/10 py-4 grow
                    space-y-2"
                >
                    <Text className="capitalize text-white">
                        program concluded
                    </Text>
                    <Text className="capitalize font-medium text-white">
                        let us hear your testimony
                    </Text>
                    <Text
                        className="font-extrabold capitalize
                        bg-primary text-white rounded-md shadow-lg shadow-black
                        px-2 py-1"
                        onPress={() => navigation.navigate("BranchNavigator")}
                    >
                        find a branch close to you
                    </Text>
                </View>
            )}
            {programDay && days === 2 && (
                <View className=" items-center bg-primary/10 space-y-2 py-4 grow">
                    <Text className="capitalize text-white">
                        happening live
                    </Text>
                    <Text
                        className="capitalize text-lg font-medium bg-white
                        rounded-md text-primary px-2 py-1 shadow-lg shadow-black "
                    >
                        the grand finale
                    </Text>
                    <Text
                        className=" text-xl font-extrabold capitalize
                        bg-primary text-white rounded-md shadow-lg shadow-black
                        px-2 py-1"
                        onPress={() => navigation.navigate("LiveScreen")}
                    >
                        Join Live
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CountDown;
