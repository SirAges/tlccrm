import { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert,
    Modal
} from "react-native";
import {
    CusIcon,
    CusPrompt,
    FormsImageView,
    Loader,
    UsersList,
    Separator
} from "../components";
import { formatDateAgo, roundNumber, getYear } from "../lib/utils";
import {
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserHiddensQuery,
    useAddNewUserRequestMutation
} from "../redux/user/userApiSlice";
import { GlobalContext } from "../hooks/GlobalContext";
const ProfileScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const { handleInputChange, getUser, currentUser, value, setValue, cUid } =
        useContext(GlobalContext);
    const u = getUser(userId);
    const avatar = require("../../assets/images/avatar.jpg");
    //redux start
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    //
    const { data: hiddens } = useGetUserHiddensQuery({ userId });
    const [addNewUserRequest] = useAddNewUserRequestMutation();

    //redux end

    const requestId = cUid;
    const [userData, setUserData] = useState({});
    const [popup, setPopup] = useState(false);
    const [toggleOffline, setToggleOffline] = useState(false);
    const [requestsModal, setRequestsModal] = useState(false);
    const [friendsModal, setFriendsModal] = useState(false);
    const [editKey, setEditKey] = useState(null);
    const [editText, setEditText] = useState("");
    const [editting, setEditting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [removingDept, setRemovingDept] = useState(false);
    const [idx, setIdx] = useState(null);
    const [editInner, setEditInner] = useState(null);

    useEffect(() => {
        setValue(u);
    }, [u]);

    const isFriend =
        u.friends.includes(cUid) ||
        u.requests.includes(cUid) ||
        userId === cUid;
    const isHidden = hide => u.hiddens.includes(hide || editInner || editKey);
    const addNewCompanion = () => {
        const sendRequest = async () => {
            try {
                setLoading(true);
                const res = await addNewUserRequest({ userId, requestId });

                if (res?.error) {
                    Alert.alert("Join This request", res?.error?.data);
                }
            } catch (error) {
                console.log("errorjoin", error);
            } finally {
                setLoading(false);
            }
        };

        //addNewCompanion
        Alert.alert(
            "Send Friend Request",
            "Are you sure you want to send a friend request",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => sendRequest() }
            ]
        );
    };
    const removeCompanion = () => {
        //removeCompanion
    };

    const handleUpdate = async (key, inner) => {
        setEditKey(key);
        setEditInner(inner);
        setPopup(true);
    };
    const handleRemoveDept = async clicked => {
        setIdx(clicked);
        setRemovingDept(true);
        const filteredDept = u["departments"].filter((f, i) => i !== clicked);
        const editData = {
            ["departments"]: filteredDept
        };
        try {
            const res = await updateUser({ userId, value: editData });
        } catch (error) {
            setEditting(false);
            console.log("error", error);
        } finally {
            setRemovingDept(false);
            setEditText("");
            setEditting(false);
            setPopup(false);
        }
    };

    const handleSubmit = async () => {
        setEditting(true);
        const newArray =
            editKey === "departments"
                ? [...u?.departments, editText.toLowerCase()]
                : Array.isArray(value[editKey]) || editKey === "dateJoined"
                ? value[editKey]
                : typeof value[editKey] === "object"
                ? { ...value[editKey], [editInner]: editText.toLowerCase() }
                : editText.toLowerCase();

        const editData = {
            [editKey]: newArray
        };
        try {
            const res = await updateUser({ userId, value: editData });
            console.log("resedit", res);
        } catch (error) {
            setEditting(false);
            console.log("error", error);
        } finally {
            setEditText("");
            setEditting(false);
            setPopup(false);
        }
    };

    const viewProfile = key => {
        setUserData(prev => ({ ...prev, [key]: "hello" }));
        Alert.alert(`${userData[key]}`);
    };
    const editProfile = key => {
        Alert.alert(`${userData[key]}`);
    };

    return (
        <View className="bg-white h-full w-full flex-1">
            <View className="relative image h-60 w-full bg-black">
                <TouchableWithoutFeedback
                    onPress={() => handleUpdate("cImage")}
                >
                    <Image
                        className="opacity-90 h-full w-full"
                        style={{ resizeMode: "cover" }}
                        source={
                            isHidden("cImage") ? avatar : { uri: u?.cImage[0] }
                        }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleUpdate("image")}>
                    <View
                        className=" p-0.5 border-2 border-white rounded-full bottom-5 left-5 absolute h-24
                   w-24"
                    >
                        <Image
                            className=" rounded-full h-full w-full"
                            style={{ resizeMode: "cover" }}
                            source={
                                isHidden("image")
                                    ? avatar
                                    : { uri: u?.image[0] }
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View className="absolute right-3 bottom-3 flex-row items-center space-x-2 bg-background p-0.5 rounded-sm">
                    <Text
                        onPress={() => handleUpdate("online")}
                        className={` capitalize 
                            ${
                                isHidden("online")
                                    ? " text-primary/60"
                                    : " text-primary  text-md"
                            }`}
                    >
                        {isHidden("online")
                            ? "hidden"
                            : toggleOffline
                            ? "online"
                            : "offline"}
                    </Text>
                    {toggleOffline && !isHidden("online") ? (
                        <Text className="h-2 w-2 bg-primary rounded-full"></Text>
                    ) : null}
                </View>
            </View>
            <></>

            <View className="head px-2 space-y-3 ">
                <View className="flex-row items-center justify-between">
                    <TouchableWithoutFeedback
                        onPress={() => handleUpdate("username")}
                    >
                        <View>
                            <Text className="text-body text-sm capitalize">
                                username
                            </Text>
                            <Text
                                className={`
                            ${
                                isHidden("username")
                                    ? "capitalize text-primary/60"
                                    : "font-extrabold text-black uppercase text-md"
                            }`}
                            >
                                {isHidden("username")
                                    ? "hidden"
                                    : `@${u?.username}`}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <CusIcon
                        size={20}
                        name={
                            !u?.isVerified
                                ? !u?.departments?.includes("pastor")
                                    ? "medal"
                                    : u?.departments?.includes("pastor")
                                    ? "book"
                                    : "ribbon"
                                : "close"
                        }
                        color={
                            !u?.isVerified
                                ? !u?.departments?.includes("pastor")
                                    ? "text-primary"
                                    : u?.departments?.includes("pastor")
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                : "text-gray-500"
                        }
                    />
                    <TouchableWithoutFeedback
                        onPress={() => handleUpdate("dateJoined")}
                    >
                        <View className="">
                            <Text className="text-body capitalize text-sm">
                                Joined
                            </Text>
                            <Text
                                className={`
                            ${
                                isHidden("dateJoined")
                                    ? "capitalize text-primary/60"
                                    : "font-extrabold text-black uppercase text-md"
                            }`}
                            >
                                {isHidden("dateJoined")
                                    ? "hidden"
                                    : getYear(u?.dateJoined)}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View className="flex-row items-center pb-3 space-x-3">
                    <Text
                        onPress={() => handleUpdate("departments")}
                        className="text-body capitalize text-sm"
                    >
                        Departments:
                    </Text>
                    <ScrollView horizontal>
                        <View className="flex-row items-center space-x-2">
                            {!isHidden("departments") ? (
                                u?.departments?.map((d, i) => (
                                    <View
                                        key={d + i}
                                        className="px-1 py-0.5 bg-gray-200 rounded-sm shadow-xs shadow-black flex-row
                                    items-center
                                space-x-0.5"
                                    >
                                        <Text className="font-semibold capitalize">
                                            {d}
                                        </Text>
                                        {removingDept && idx === i ? (
                                            <Loader />
                                        ) : (
                                            <CusIcon
                                                color="text-danger"
                                                size={12}
                                                action={
                                                    removingDept
                                                        ? null
                                                        : () =>
                                                              handleRemoveDept(
                                                                  i
                                                              )
                                                }
                                                name={"close"}
                                            />
                                        )}
                                    </View>
                                ))
                            ) : (
                                <Text className=" capitalize text-primary/60 text-md">
                                    hidden
                                </Text>
                            )}
                        </View>
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => handleUpdate("ministry")}
                >
                    <View className="flex-row items-center space-x-2">
                        <Text className="capitalize text-body text-sm">
                            Ministry:
                        </Text>
                        <Text
                            className={`
                            ${
                                isHidden("ministry")
                                    ? "capitalize text-primary/60"
                                    : "font-extrabold text-black uppercase text-md"
                            }`}
                        >
                            {isHidden("ministry") ? "hidden" : u?.ministry}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <View className=" space-y-3">
                    {u?.friends?.length && (
                        <View className="flex-row items-center space-x-2 pl-5">
                            <Text className=" font-medium">
                                {roundNumber(u?.friends?.length)}
                            </Text>
                            <Text className="capitalize text-body text-sm ">
                                Friends
                            </Text>
                        </View>
                    )}

                    <ScrollView className="w-full" horizontal={true}>
                        <View className="flex-row items-center space-x-2 ">
                            {u.friends.map(
                                f =>
                                    cUid !== f && (
                                        <TouchableWithoutFeedback
                                            key={f}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "ProfileScreen",
                                                    {
                                                        userId: f
                                                    }
                                                )
                                            }
                                        >
                                            <View className="items-center">
                                                <View className="rounded-full h-10 w-10 bg-background p-0.5">
                                                    <Image
                                                        style={{
                                                            resizeMode: "cover"
                                                        }}
                                                        className="w-full h-full rounded-full"
                                                        source={{
                                                            uri: getUser(
                                                                f,
                                                                "image"
                                                            )
                                                        }}
                                                    />
                                                </View>
                                                <Text className="capitalize text-black text-[10px] font-semibold">
                                                    {getUser(f, "username")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                            )}
                        </View>
                    </ScrollView>
                    {!isFriend && (
                        <Text
                            onPress={addNewCompanion}
                            className="bg-primary rounded-full px-2
                    py-2 text-center text-white font-medium"
                        >
                            {loading
                                ? "sending request"
                                : "Send Friend request"}
                        </Text>
                    )}
                </View>
            </View>
            <View className="flex-row items-center justify-start space-x-3 pb-5 px-2">
                <Text
                    onPress={() => setRequestsModal(true)}
                    className="bg-primary px-2 py-1 rounded-md text-white font-semibold capitalize"
                >
                    friend requests
                </Text>
                <Text
                    onPress={() => setFriendsModal(true)}
                    className="bg-primary px-2 py-1 rounded-md text-white font-semibold capitalize"
                >
                    friend list
                </Text>
            </View>
            <ScrollView className="w-full">
                <View className="pb-5  px-2 ">
                    <Text className="capitalize text-[14px] text-primary font-semibold">
                        more Info:
                    </Text>
                    {Object.entries(u?.personal)?.map(([key, value]) => (
                        <View  key={key} className="">
                            <TouchableWithoutFeedback
                               
                                onPress={() => handleUpdate("personal", key)}
                            >
                                <View
                                    className="flex-row items-center
                             w-full       justify-between space-x-3 py-4"
                                >
                                    <Text
                                        className="text-primary
                                            text-md capitalize "
                                    >
                                        {key
                                            .replace("resident", "resident ")
                                            .replace("Code", " Code")}
                                        :
                                    </Text>
                                    <Text
                                        className={`text-title flex-1
                                                text-right capitalize text-sm
                                                ${
                                                    isHidden(key)
                                                        ? "text-primary/60"
                                                        : ""
                                                }`}
                                    >
                                        {isHidden(key) ? "hidden" : value}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Separator />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <FormsImageView id={editKey} />
            {popup && (
                <CusPrompt
                    editting={editting}
                    setEditting={setEditting}
                    title={"edit"}
                    editKey={editKey}
                    editInner={editInner}
                    editText={editText}
                    setEditText={setEditText}
                    handleSubmit={handleSubmit}
                    setPopup={setPopup}
                    hiddens={u.hiddens}
                    userId={userId}
                    isHidden={isHidden}
                    toggleOffline={toggleOffline}
                    setToggleOffline={setToggleOffline}
                />
            )}

            <UsersList
                navigation={navigation}
                from="friends"
                modal={friendsModal}
                userId={userId}
                cUser={u}
                setModal={setFriendsModal}
                members={u.friends}
            />

            <UsersList
                navigation={navigation}
                from="requests"
                modal={requestsModal}
                userId={userId}
                cUser={u}
                setModal={setRequestsModal}
                members={u.request}
            />
        </View>
    );
};
export default ProfileScreen;
