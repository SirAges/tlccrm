import { View, Text } from "react-native";
import { upcomingEvents } from "../lib/data";
import { formatDateTime } from "../lib/utils";
import { CountDown } from "./";
const UpcomingEvents = ({navigation}) => {
    return (
        <>
            {upcomingEvents.map(u => (
                <View
                    key={u._id}
                    className="bg-primary/90 rounded-lg px-2 p-1 h-fit space-y-2"
                >
                    <Text
                        className="uppercase text-4xl font-extrabold
                    text-white "
                    >
                        Upcoming Events
                    </Text>

                    <Text
                        className="text-white capitalize text-2xl
                    font-semibold"
                    >
                        {u.title}
                    </Text>

                    <View className="date flex-row items-center">
                        <Text
                            className="text-white font-medium text-sm capitalize
                  "
                        >
                            {formatDateTime(u.date)}
                        </Text>
                       
                    </View>

                    <Text className="text-white capitalize ">{u.venue}</Text>

                    <CountDown navigation={navigation}date={u.date} />
                </View>
            ))}
        </>
    );
};
export default UpcomingEvents;
