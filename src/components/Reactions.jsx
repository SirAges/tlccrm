import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { CusIcon } from "../components";
import { roundNumber } from "../lib/utils";
const Reactions = ({ feed }) => {
    const [reactObj, setReactObj] = useState([]);

    useEffect(() => {
        const updateReactions = () => {
            const updatedReactions = feed.reactions.reduce((acc, r) => {
                const exist = acc.find(o => o.name === r.reaction);
                if (exist) {
                    exist.total += 1;
                } else {
                    acc.push({ name: r.reaction, total: 1 });
                }
                return acc;
            }, []);
            setReactObj(updatedReactions);
        };

        updateReactions();
    }, [feed.reactions]);

    return (
        <View className="flex-row items-center pl-5">
            {reactObj.map((r, index) => (
                <View className="-mx-2.5 relative " key={index}>
                    <View>
                        <CusIcon
                            bg="bg-gray-200 border border-primary "
                            p="py-1 px-1"
                            hw="h-6 w-6"
                            size={12}
                            name={r.name}
                        />
                    </View>
                    <Text className="absolute rounded-full h-3 w-3  bg-primary -top-1 right-3 text-white text-[6px] p-[1px] font-bold text-center">
                        {roundNumber(r.total)}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default Reactions;
