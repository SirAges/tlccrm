import { View, Text, Image } from "react-native";
import { upcomingEvents } from "../lib/data";
import { formatDateTime } from "../lib/utils";
import { eventForm } from "../lib/forms";
import { CountDown } from "./";

import { useGetEventsQuery } from "../redux/event/eventApiSlice";

const UpcomingEvents = ({ navigation }) => {
    const {
        data: events,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetEventsQuery("eventslist");

    const event =
        events && events !== undefined
            ? [...events].sort((a, b) => {
                  const A = new Date(a.createdAt);
                  const B = new Date(b.createdAt);
                  return B - A
              })[0]
            : {};
    return (
        <View className="bg-primary/90 h-fit">
            <View key={event._id} className="justify-center items-center">
                {event.image && (
                    <View className="w-full h-80 opacity-40">
                        <Image
                            source={{ uri: event.image[0] }}
                            style={{
                                resizeMode: "cover"
                            }}
                            className="w-full h-full"
                        />
                    </View>
                )}
                <View className="absolute space-y-2">
                    <Text className="uppercase text-3xl font-extrabold text-white">
                        Upcoming Event
                    </Text>
                    <Text className="text-white capitalize text-2xl font-semibold">
                        {event.title}
                    </Text>
                    <View className="date flex-row items-center">
                        <Text className="text-white font-medium text-sm capitalize">
                            {formatDateTime(event.date)}
                        </Text>
                    </View>
                    <Text className="text-white capitalize">{event.venue}</Text>
                    <CountDown navigation={navigation} date={event.date} />
                </View>
            </View>
        </View>
    );
};

export default UpcomingEvents;
