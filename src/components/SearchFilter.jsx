import { View, Text, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { CusIcon } from "./";
const SearchFilter = ({ data, setData, searchedData,searchTerm, setSearchTerm,filter, setFilter,filterCond }) => {
    
    
    const [sort, setSort] = useState("");
    const [noSearch, setNoSearch] = useState(true);

    const handleSearch = () => {
        if (searchTerm) {
            if (filter) {
                const searchArr = data.filter(s =>
                    s[filter].toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (searchArr.length) {
                    setData(searchArr);
                } else {
                    setNoSearch(true);
                }
            } else {
                const searchArr = data.filter(s =>
                    s.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            const sorted = [...searchedData].sort((a, b) => {
              const dateA= new Date(a._createdAt)
              const dateB= new Date(b._createdAt)
                if (sort) {
                    if (sort === "AZ") return a.title.localeCompare(b.title);
                    if (sort === "ZA") return b.title.localeCompare(a.title);
                    if (sort === "newA") return dateA - dateB;
                    if (sort === "newD") return dateB - dateA;
                    if (sort === "popA")
                        return (
                            a.comments.length +
                            a.reactions.length -
                            (b.comments.length + b.reactions.length)
                        );
                    if (sort === "popD")
                        return (
                            b.comments.length +
                            b.reactions.length -
                            (a.comments.length + a.reactions.length)
                        );
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
            <View className="flex-row">
                <TextInput
                    className="flex-1 bg-background rounded-l-full flex-1 items-center px-3 py-2"
                    value={searchTerm}
                    onChangeText={text => setSearchTerm(text)}
                    placeholder="search here..."
                />
                <View className="items-center justify-center rounded-r-full bg-primary">
                    <CusIcon
                        color="text-white"
                        name="search"
                        action={() => handleSearch()}
                    />
                </View>
            </View>
            <View>
                <Text className="capitalize font-semibold">Search by:</Text>
                <View className="flex-row justify-start space-x-2 items-center">
                    <Text
                        onPress={() =>
                            setFilter(prev => (prev === "title" ? "" : "title"))
                        }
                        className={`capitalize ${
                            filter === "title" ? "bg-primary text-white" : null
                        } border border-primary  w-fit px-2 py-1 rounded-sm`}
                    >
                        title
                    </Text>
                    <Text
                        onPress={() =>
                            setFilter(prev =>
                                prev === filterCond ? "" : filterCond
                            )
                        }
                        className={`capitalize ${
                            filter === filterCond
                                ? "bg-primary text-white"
                                : null
                        } border border-primary  w-fit px-2 py-1 rounded-sm`}
                    >
                        {filterCond==="program"?filterCond:"Details"}
                    </Text>
                </View>
            </View>
            <View>
                <Text className="capitalize font-semibold">Sort by:</Text>
                <View className="flex-row justify-start space-x-2 items-center">
                    <Text
                        onPress={() =>
                            setSort(prev => (prev === "newA" ? "newD" : "newA"))
                        }
                        className={`capitalize ${
                            sort === "newA"
                                ? "bg-primary text-white"
                                : sort === "newD"
                                ? "bg-background text-black"
                                : null
                        } border border-primary  w-fit px-2 py-1 rounded-sm`}
                    >
                        newest
                    </Text>
                    <Text
                        onPress={() =>
                            setSort(prev => (prev === "AZ" ? "ZA" : "AZ"))
                        }
                        className={`capitalize ${
                            sort === "AZ"
                                ? "bg-primary text-white"
                                : sort === "ZA"
                                ? "bg-background text-black"
                                : null
                        } border border-primary  w-fit px-2 py-1 rounded-sm`}
                    >
                        A-Z
                    </Text>
                    <Text
                        onPress={() =>
                            setSort(prev => (prev === "popA" ? "popD" : "popA"))
                        }
                        className={`capitalize ${
                            sort === "popA"
                                ? "bg-primary text-white"
                                : sort === "popD"
                                ? "bg-background text-black"
                                : null
                        } border border-primary  w-fit px-2 py-1 rounded-sm`}
                    >
                        popular
                    </Text>
                </View>
            </View>
            {noSearch && <Text>No result for {searchTerm}</Text>}
        </View>
    );
};
export default SearchFilter;
