import { View, Text, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { CusIcon } from "./";
import { getYear, getMonth, getDays } from "../lib/utils";
const DevotionFilter = ({
    data,
    setData,
    searchedData,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    toggleList,
    setToggleList
}) => {
    const [noSearch, setNoSearch] = useState(true);
    const [list, setList] = useState([]);

    const handleListDropdown = clicked => {
        const uniqueYearsSet = new Set(data.map(d => getYear(d.createdAt)));

        const years = Array.from(uniqueYearsSet).sort(() => -1);

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const months30 = ["April", "June", "September", "November"];

        const dayCond =
            filter.month === "February"
                ? 28 +
                  (filter.year % 4 === 0 &&
                      (filter.year % 100 !== 0 || filter.year % 400 === 0))
                : months30.includes(filter.month)
                ? 30
                : 31;

        const days = Array.from({ length: dayCond }, (_, index) => index + 1);

        if (clicked === "year") {
            setList(years);
        } else if (clicked === "month") {
            setList(months);
        } else {
            setList(days);
        }
        setToggleList(prev => !prev);
    };

    const handleSelection = clicked => {
        if (clicked > 31) {
            setFilter(prev => ({ ...prev, year: clicked }));
        } else if (typeof clicked === "string") {
            setFilter(prev => ({ ...prev, month: clicked }));
        } else {
            setFilter(prev => ({ ...prev, day: Number(clicked) }));
        }
        setToggleList(prev => !prev);
    };

    const handleSearch = () => {
        if (searchTerm) {
            const searchArr = data.filter(
                s =>
                    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.body.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (searchArr) {
                setData(searchArr);
            } else {
                setNoSearch(true);
            }
        } else {
            Alert.alert(
                "Search input is empty",
                "Please input a search value and try again"
            );
        }
    };
    const handleClearFilter = () => {
        setFilter({
            year: "Select Year",
            month: "Select Month",
            day: "Select Day"
        });
        setToggleList(prev => !prev);
    };
    useEffect(() => {
        setData(data);
        setNoSearch(false);
    }, [searchTerm]);
    useEffect(() => {
        const filterDevotion = () => {
            const yearDefault = filter.Year === "Select Year";
            const monthDefault = filter.month === "Select Month";
            const dayDefault = filter.day === "Select Day";
            const filtered = data?.filter(f => {
                const filterYear = getYear(f.createdAt);
                const filterMonth = getMonth(f.createdAt);
                const filterDay = getDays(f.createdAt);

                const yearCondition = filterYear === filter.year;
                const monthCondition = filterMonth === filter.month.slice(0, 3);
                const dayCondition = filterDay === filter.day;

                console.log("filter", filterYear, filter.year);
                return (
                    (yearCondition && monthDefault && dayDefault) ||
                    (yearCondition && monthCondition && dayDefault) ||
                    (yearCondition && monthCondition && dayCondition)
                );
            });

            setData(
                filtered?.length
                    ? filtered
                    : data
            );
        };
        filterDevotion();
    }, [filter]);

    const handleOutsideClick = () => {
        if (toggleList) {
            setToggleList(false);
        }
    };
    return (
        <View className="bg-white mb-0.5 px-2 py-1">
            <View className="flex-row">
                <TextInput
                    className="flex-1 bg-background rounded-l-full flex-1 items-center px-3 py-2"
                    value={searchTerm}
                    onChangeText={text => setSearchTerm(text)}
                    placeholder="search here..."
                />
                <View
                    className="items-center justify-center rounded-r-full
                bg-primary px-2"
                >
                    <CusIcon
                        color="text-white"
                        name="search"
                        action={() => handleSearch()}
                    />
                </View>
            </View>

            <View className="relative">
                <View className="flex-row space-x-3 px-2 py-2">
                    <Text
                        onPress={() => handleListDropdown("year")}
                        className="grow text-center capitalize bg-primary text-white rounded-lg px-2 py-1"
                    >
                        {filter.year}
                    </Text>
                    <Text
                        onPress={() => handleListDropdown("month")}
                        className="grow text-center capitalize bg-primary text-white rounded-lg px-2 py-1"
                    >
                        {filter.month}
                    </Text>
                    <Text
                        onPress={() => handleListDropdown("day")}
                        className="grow  text-center capitalize bg-primary text-white rounded-lg px-2 py-1"
                    >
                        {filter.day}
                    </Text>
                </View>
                {toggleList && (
                    <View className=" max-h-64 h-fit flex-wrap flex-row px-2 py-2 rounded-lg shadow-lg shadow-black bg-white justify-between items-center">
                        <CusIcon
                            action={() => setToggleList(prev => !prev)}
                            bg="bg-primary"
                            m={4}
                            color="text-white"
                            name="close"
                        />
                        <CusIcon
                            action={() => handleClearFilter()}
                            bg="bg-primary"
                            m={4}
                            color="text-white"
                            name="reload"
                        />
                        {list.map(l => (
                            <Text
                                className="mr-2 mb-2 bg-primary px-3 py-2 rounded-md text-white grow max-w-fit text-center"
                                onPress={() => handleSelection(l)}
                            >
                                {l}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
            {noSearch && <Text>No result for {searchTerm}</Text>}
        </View>
    );
};
export default DevotionFilter;
