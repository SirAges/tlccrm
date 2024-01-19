import { useState, useEffect } from "react";
import { View, Text } from "react-native";

const CountDown = ({ date }) => {
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

    return (
        <View className="flex-row items-center space-x-2 rounded-md  bg-white shadow-black shadow-lg px-2 my-2 py-1 w-full">
            {counts.years !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow ">
                    <Text className=" capitalize">Year</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.years}
                    </Text>
                </View>
            )}

            {counts.months !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className=" capitalize">month</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.months}
                    </Text>
                </View>
            )}
            {counts.days !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className=" capitalize">day</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.days}
                    </Text>
                </View>
            )}
            {counts.hours !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className=" capitalize">hour</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.hours}
                    </Text>
                </View>
            )}
            {counts.minutes !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className="capitalize ">minute</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.minutes}
                    </Text>
                </View>
            )}
            {counts.seconds !== 0 && (
                <View className=" items-center bg-primary/10 py-4 grow">
                    <Text className="capitalize ">second</Text>
                    <Text className=" text-xl font-extrabold">
                        {counts.seconds}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CountDown;
