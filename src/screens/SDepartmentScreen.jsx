import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    FlatList,
    Alert,
    Modal,
    BackHandler
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { processText, formatDateTime, roundNumber } from "../lib/utils";
import {
    AddButton,
    CusIcon,
    SearchFilter,
    Separator,
    Reactions,
    CardActions,
    MembersList,
    AnnouncementsList,
    CocsList,
    MediaList,
    ScreenLoader,
    Loader,
    ImageViewer
} from "../components";
import { feedForm, departmentForm } from "../lib/forms";
import {
    useGetDeptFeedsQuery,
    useDeleteDepartmentMutation
} from "../redux/department/departmentApiSlice";

import { GlobalContext } from "../hooks/GlobalContext";
const SDepartmentScreen = ({ navigation, route }) => {
    const { department: m } = route.params;
    const { currentUser, setValue, setFormArray, minId, setMinId } =
        useContext(GlobalContext);
    const [deleting, setDeleting] = useState(false);
    const [allMedia, setAllMedia] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [allFeeds, setAllFeeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(null);
    const [membersModal, setMembersModal] = useState(false);
    const [announcementsModal, setAnnouncementsModal] = useState(false);
    const [cocsModal, setCocsModal] = useState(false);
    const [mediaModal, setMediaModal] = useState(false);

    const {
        data: feeds,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetDeptFeedsQuery(m._id);
    console.log("feedsdept", feeds);
    const [
        deleteDepartment,
        { isSuccess: deleted, isError: deleteIsError, error: deleteError }
    ] = useDeleteDepartmentMutation();

    useEffect(() => {
        setLoading(true);
        try {
            setMinId(m._id);

            if (feeds && feeds !== undefined) {
                const sorted = [...feeds].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });
                setAllFeeds(feeds);
            }
        } catch (error) {
            console.log("feedserror", error);
        } finally {
            setLoading(false);
        }

        return () => setLoading(false);
    }, [feeds]);
    useEffect(() => {
        if (feeds) {
            setAllMedia([]);
            for (let med of feeds) {
                if (med?.image) {
                    setAllMedia(prev => [...prev, ...med.image]);
                }
            }
        }
    }, [feeds]);
    const refresh = async () => {
        setIsRefreshing(true);
        setLoading(true);

        try {
            await refetch();
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleNavigation = () => {
        setFormArray(feedForm);
        setValue({
            title: "",
            image: [],
            body: "",
            comments: [],
            reactions: []
        });
        navigation.navigate("DFeedForm", {
            name: "feed",
            action: "create",
            multiple: false,
            minId: m._id
        });
    };

    const handleDelete = id => {
        const deleteItem = async () => {
            try {
                setDeleting(true);
                setDeletingItem(id);
                await deleteDepartment(id);
            } catch (error) {
                console.log("del", deleteError);
            } finally {
                console.log("deleted", deleted);
                setDeleting(false);
                setDeletingItem(null);
                navigation.navigate("DepartmentScreen");
            }
        };
        Alert.alert(
            "Delete This Department",
            "Are you sure you want to delete this department",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteItem() }
            ]
        );
    };

    const handleEdit = item => {
        setFormArray(departmentForm);
        setValue(item);
        navigation.navigate("DepartmentForm", {
            name: "department",
            action: "edit",
            multiple: false
        });
    };
    let content;

    content = (
        <FlatList
            keyExtractor={f => f._id}
            refreshing={isRefreshing}
            onRefresh={refresh}
            data={allFeeds}
            renderItem={({ item: f }) => (
                <View
                    className="bg-white mx-2 mt-1 mb-1 bg-white rounded-md
                            shadow-sm
                        shadow-black  "
                >
                    <View
                        className="flex-row items-center
                            justify-between px-2"
                    >
                        <Text
                            className="text-lg font-semibold capitalize
                             py-2"
                        >
                            {f.title}
                        </Text>
                    </View>
                    {f.image.length ? (
                        <View className="w-full h-52  bg-white">
                            <Image
                                className=" w-full h-full"
                                style={{ resizeMode: "cover" }}
                                source={{ uri: f.image[0] }}
                            />
                        </View>
                    ) : null}

                    <View>
                        <CardActions
                            navigation={navigation}
                            feed={f}
                            from="department"
                        />
                    </View>
                    <Text
                        className="text-md px-2 py-2 text-justify
                            text-body"
                    >
                        {f.body}
                    </Text>
                </View>
            )}
        />
    );

    if (isError || error?.data)
        content = (
            <ScreenLoader refresh={refresh} text="no content try again..." />
        );
    if (loading || isLoading) content = <ScreenLoader text="loading data..." />;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View>
                <View className=" px-2 py-2 flex-row items-center justify-between  bg-white">
                    <Text className="text-xl font-semibold uppercase">
                        {m.title}
                    </Text>
                    <View className=" flex-row space-x-2 items-center">
                       
                        <CusIcon
                            name="people"
                            color="text-primary"
                            action={() => setMembersModal(prev => !prev)}
                        />
                        <CusIcon
                            name="trash"
                            color="text-danger"
                            action={() => handleDelete(m._id)}
                        />

                        <CusIcon name="create" action={() => handleEdit(m)} />
                    </View>
                </View>
                <Separator />

                <View className="bg-white px-2 py-2">
                    <ScrollView horizontal={true}>
                        <View className="flex-row items-center space-x-3">
                            <Text
                                onPress={() =>
                                    setAnnouncementsModal(prev => !prev)
                                }
                                className="capitalize text-primary"
                            >
                                announcements
                            </Text>
                            <Text
                                onPress={() => setCocsModal(prev => !prev)}
                                className="capitalize text-primary"
                            >
                                code of conduct
                            </Text>
                            <Text
                                onPress={() => setMediaModal(prev => !prev)}
                                className="capitalize text-primary"
                            >
                                media
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <Separator />
            </View>
            <View className="flex-1">{content}</View>
            <View>
                <MembersList
                from="department"
                    membersModal={membersModal}
                    minId={minId}
                    cUser={currentUser}
                    setMembersModal={setMembersModal}
                    members={m.members}
                />
                <AnnouncementsList
                from="department"
                    announcementsModal={announcementsModal}
                    setAnnouncementsModal={setAnnouncementsModal}
                    minId={minId}
                    navigation={navigation}
                    announcements={m.announcements}
                />
                <CocsList
                from="department"
                    cocsModal={cocsModal}
                    setCocsModal={setCocsModal}
                    minId={minId}
                    navigation={navigation}
                    cocs={m.cocs}
                />
                <MediaList
                from="department"
                    mediaModal={mediaModal}
                    setMediaModal={setMediaModal}
                    allMedia={allMedia}
                    setAllMedia={setAllMedia}
                />
            </View>
            <AddButton action={() => handleNavigation()} />
        </SafeAreaView>
    );
};
export default SDepartmentScreen;
