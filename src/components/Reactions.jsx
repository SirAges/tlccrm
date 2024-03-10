import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { CusIcon } from "../components";
import { roundNumber } from "../lib/utils";
const Reactions = ({ reactions }) => {
    const [reactObj, setReactObj] = useState([]);

    useEffect(() => {
        const updateReactions = () => {
            const updatedReactions = reactions?.reduce((acc, r) => {
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
    }, [reactions]);
    content = (
        <View className="flex flex-row items-center space-x-1">
            {reactObj?.slice(0, 3)?.map((r, index) => (
                <Text key={index} className="">
                    {r.name}
                </Text>
            ))}

            <Text className="uppercase text-primary font-medium text-xs">
                {roundNumber(reactions?.length)}
            </Text>
        </View>
    );
    return reactions?.length ? content : null;
};

export default Reactions;
