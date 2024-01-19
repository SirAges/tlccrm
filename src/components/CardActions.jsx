import { useState } from "react";
import { View, Text } from "react-native";
import { CusIcon, Reactions } from "../components";
import { reactions } from "../lib/data";
const CardActions = ({ navigation, feed }) => {
    const [modal, setModal] = useState(false);
    const openCommentScreen = () => {
        if (feed.text) {
            navigation.navigate("SSermonScreen", { feed });
        } else if (feed.testifier) {
            navigation.navigate("STestimonyScreen", { feed })
        } else {
            navigation.navigate("SNewsScreen", { feed })
        }
    };
    return (
        <View>
            <View className="relative flex-row justify-between items-center">
                {modal && (
                    <View className="absolute flex-row flex-wrap w-fit max-w-2xl bg-white shadow-lg shadow-black rounded-lg h-fit max-h-24 bottom-10 left-4 px-2 py-1 z-20">
                        {reactions.map(r => (
                            <View key={r.id}>
                                <CusIcon name={r.reaction} />
                            </View>
                        ))}
                    </View>
                )}
                <CusIcon
                    name="thumbs-up-outline"
                    action={() => setModal(prev => !prev)}
                />
                <CusIcon
                    name="chatbox-outline"
                    action={() => openCommentScreen()}
                />
                <CusIcon name="share-social-outline" />
            </View>
        </View>
    );
};
export default CardActions;
