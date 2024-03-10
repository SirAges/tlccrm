import { View, Text, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { CusIcon } from "./";
const SearchFilter = ({
    data,
    setData,
    searchedData,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filterCond,
    sortCond,
    handleDropdown
}) => {
    const [sort, setSort] = useState("");
    const [noSearch, setNoSearch] = useState(false);
    const [sortName, setSortName] = useState(true);

    const handleSelectSort = clicked => {
        handleDropdown ? handleDropdown() : null;
        setSortName(clicked);
        setSort(prev => (prev === "acd" ? "dcd" : "acd"));
    };

    const handleSearch = () => {
        if (searchTerm) {
            if (filter) {
                const searchArr = data.filter(s =>
                    s[filter]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase().trim())
                );
                if (searchArr.length) {
                    setNoSearch(false);
                    setData(searchArr);
                } else {
                    setNoSearch(true);
                }
            } else {
                const searchArr = data.filter(s =>
                    s.title
                        ? s.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase().trim())
                        : false || s.chorus
                        ? s.chorus
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase().trim())
                        : false ||
                          (s.program
                              ? s.program
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase().trim())
                              : false) ||
                          (Array.isArray(s.body)
                              ? s.body.some(b =>
                                    (b.body
                                        ? b.body.toLowerCase()
                                        : b.verse.toLowerCase()
                                    ).includes(searchTerm.toLowerCase().trim())
                                )
                              : s.body
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase().trim()))
                );
                if (searchArr.length) {
                    setData(searchArr);
                } else {
                    setNoSearch(true);
                }
            }
        } else {
            Alert.alert(
                "Search input is empty",
                "Please input a search value and try again"
            );
        }
    };

    useEffect(() => {
        setData(data);
        setNoSearch(false);
    }, [searchTerm]);
    useEffect(() => {
        let subscribe = true;
        const sortArr = () => {
            const sorted = [...searchedData]?.sort((a, b) => {
                const dateA = new Date(a?.createdAt);
                const dateB = new Date(b?.createdAt);
                const currentDate = new Date();
                const endDateA = new Date(a.end);
                const endDateB = new Date(b.end);
                const isExpiredA = currentDate > endDateA;
                const isExpiredB = currentDate > endDateB;
                if (sort) {
                    if (sortName === "title" && sort === "acd")
                        return a.title.localeCompare(b.title);
                    if (sortName === "title" && sort === "dcd")
                        return b.title.localeCompare(a.title);
                    if (sortName === "name" && sort === "acd")
                        return a.name.localeCompare(b.name);
                    if (sortName === "name" && sort === "dcd")
                        return b.name.localeCompare(a.name);
                    if (sortName === "newest" && sort === "acd")
                        return dateB - dateA;
                    if (sortName === "newest" && sort === "dcd")
                        return dateA - dateB;
                    if (sortName === "index" && sort === "acd")
                        return a.index - b.index;
                    if (sortName === "index" && sort === "dcd")
                        return b.index - a.index;
                    if (sortName === "popular" && sort === "acd")
                        return (
                            a.comments.length +
                            a.reactions.length -
                            (b.comments.length + b.reactions.length)
                        );
                    if (sortName === "popular" && sort === "dcd")
                        return (
                            b.comments.length +
                            b.reactions.length -
                            (a.comments.length + a.reactions.length)
                        );
                    if (sortName === "drange" && sort === "acd")
                        return isExpiredA - isExpiredB;
                    // || endDateA - endDateB;

                    if (sortName === "drange" && sort === "dcd")
                        return isExpiredB - isExpiredA;
                    // || endDateB- endDateA
                }
                return 0; // Return 0 if no sorting is applied
            });
            setData(sorted);
        };

        sortArr();
        return () => (subscribe = false);
    }, [sort]);

    return (
        <View className="bg-white mb-0.5 px-2 py-1">
            {filterCond.length ? (
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
            ) : null}
            {filterCond.length ? (
                <View>
                    <Text className="capitalize font-semibold">Search by:</Text>
                    <View className="flex-row justify-start space-x-2 items-center">
                        {filterCond.map((f, i) => (
                            <Text
                                key={f + i}
                                onPress={() =>
                                    setFilter(prev => (prev === f ? "" : f))
                                }
                                className={`capitalize ${
                                    filter === f
                                        ? "bg-primary text-white"
                                        : null
                                } border border-primary  w-fit px-2 py-1 rounded-sm`}
                            >
                                {f === "body" ? "Details" : f}
                            </Text>
                        ))}
                    </View>
                </View>
            ) : null}
            {sortCond.length ? (
                <View>
                    <Text className="capitalize font-semibold">Sort by:</Text>
                    <View className="flex-row justify-start space-x-2 items-center">
                        {sortCond.map((s, i) => (
                            <Text
                                key={s + i}
                                onPress={() => handleSelectSort(s)}
                                className={`capitalize ${
                                    sortName === s && sort === "acd"
                                        ? "bg-primary text-white"
                                        : sortName === s && sort === "dcd"
                                        ? "bg-background text-black"
                                        : null
                                } border border-primary  w-fit px-2 py-1 rounded-sm`}
                            >
                                {s === "drange" ? "expiration" : s}
                            </Text>
                        ))}
                    </View>
                </View>
            ) : null}
            {noSearch && (
                <Text className="mt-2 px-2 py-3 border border-danger text-danger text-md capitalize rounded-lg">
                    No search result for
                    <Text className="text-xl font-extrabold">{searchTerm}</Text>
                    Please try again
                </Text>
            )}
        </View>
    );
};
export default SearchFilter;
