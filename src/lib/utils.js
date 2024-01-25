import { formatDistanceToNow } from "date-fns";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
// import { Audio } from "expo-av";
// import * as Permissions from "expo-permissions";
// import * as FileSystem from "expo-file-system";
import { users } from "./data";
import { Text } from "react-native";
export const formatDateAgo = raw => {
    // Example usage:
    const timestamp = new Date(raw);

    const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });
    return timeAgo;
};

export const formatDate = dateString => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
        /*hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC'*/
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const formatDateTime = dateString => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "UTC"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const getDay = dateString => {
    const options = {
        day: "numeric"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const getDayText = dateString => {
    const options = { weekday: "short" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const getMonth = dateString => {
    const options = {
        month: "short"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const getYear = dateString => {
    const options = {
        year: "numeric"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};
export const getTime = dateString => {
    const options = {
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        timeZone: "UTC"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(new Date(dateString));

    return formattedDate;
};

export const textTruncate = (text, len) => {
    if (text.length >= len) {
        const newText = text.slice(0, len) + "...";
        return newText;
    } else {
        return text;
    }
};

export const roundNumber = num => {
    const number = Number(num);

    if (number >= 100 && number < 1000) {
        const newNumber = String(number).charAt(0) + "H";
        return newNumber;
    } else if (number >= 1000 && number < 1000000) {
        const newNumber = String(number).charAt(0) + "K";
        return newNumber;
    } else if (number >= 1000000 && number < 1000000000) {
        const newNumber = String(number).charAt(0) + "M";
        return newNumber;
    } else if (number >= 1000000000) {
        const newNumber = String(number).charAt(0) + "B";
        return newNumber;
    } else {
        return number;
    }
};

export const getUser = id => {
    const foundUser = users.find(u => u._id === id);
    return foundUser;
};

export const processText = (value, len) => {
    const boldItalicRegex = /\*\*\*(.*?)\*\*\*/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const italicRegex = /\*([^*]+)\*/g;
    const newLineRegex = /##/g;
    const listRegex = /#(\d+)/g;

    const textFormat = innerString => {
        const newText =
            innerString.length > len
                ? innerString.slice(0, len) + "..."
                : innerString;
        const text = newText.replace(newLineRegex, "\n");
        formattedText = text
            .split(boldItalicRegex)
            .map((chunk, index) => {
                if (index % 2 === 0) {
                    return chunk
                        .split(boldRegex)
                        .map((innerChunk, innerIndex) => {
                            return innerIndex % 2 === 0 ? (
                                innerChunk
                                    .split(italicRegex)
                                    .map((subInnerChunk, subInnerIndex) => {
                                        return subInnerIndex % 2 === 0 ? (
                                            <Text
                                                key={`${index}-${innerIndex}-${subInnerIndex}`}
                                            >
                                                {subInnerChunk}
                                            </Text>
                                        ) : (
                                            <Text
                                                key={`${index}-${innerIndex}-${subInnerIndex}`}
                                                style={{
                                                    fontStyle: "italic"
                                                }}
                                            >
                                                {subInnerChunk}
                                            </Text>
                                        );
                                    })
                            ) : (
                                <Text
                                    key={`${index}-${innerIndex}`}
                                    style={{ fontWeight: "bold" }}
                                >
                                    {innerChunk}
                                </Text>
                            );
                        });
                } else {
                    return (
                        <Text
                            key={index}
                            style={{
                                fontStyle: "italic",
                                fontWeight: "bold"
                            }}
                        >
                            {chunk}
                        </Text>
                    );
                }
            })
            .flat();

        return formattedText;
    };

    if (listRegex.test(value)) {
        const listArray = value.split(listRegex);
        const newList = listArray.filter(f => f.length > 3);
        console.log(textFormat(value));
        return newList.map(l => (
            <Text className="text-body">{textFormat(l)}</Text>
        ));
    } else {
        return <>{textFormat(value)}</>;
    }
};

export const extractHashtags = text => {
    const hashtagRegex = /#(\w+)/g;
    return text.match(hashtagRegex)?.map(tag => tag.substring(1)) || [];
};

export const checkUserInContact = (contacts, users) => {
    const regex = /[-+\s]+/g;

    if (contacts && users) {
        const allPhoneNumbers = contacts
            .map(contact =>
                contact.phoneNumbers?.map(phoneNumber =>
                    phoneNumber.number.replace(regex, "")
                )
            )
            .flat();

        const usersInContact = users.filter(user => {
            const userPhone = user.personal.phone.replace(regex, "");

            return allPhoneNumbers.includes(userPhone);
        });

        return usersInContact;
    }
    return [];
};

export const AudioRecorder = () => {
    const [recording, setRecording] = useState();
    const [cloudinaryUrl, setCloudinaryUrl] = useState();

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING,
            Permissions.CAMERA_ROLL
        );
        if (status !== "granted") {
            console.error("Permission not granted");
        }
    };

    const startRecording = async () => {
        try {
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            await recording.startAsync();
            setRecording(recording);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = async () => {
        if (recording) {
            try {
                await recording.stopAndUnloadAsync();
                const cloudinaryResponse = await uploadToCloudinary(
                    recording.getURI()
                );
                setCloudinaryUrl(cloudinaryResponse.secure_url);
            } catch (error) {
                console.error("Error stopping recording:", error);
            } finally {
                setRecording(null);
            }
        }
    };

    const uploadToCloudinary = async audioUri => {
        // Implement Cloudinary upload logic here
        // Use a library like axios or fetch to make a POST request to Cloudinary API
        // Ensure you have the appropriate Cloudinary credentials and endpoint
        // Return the response from Cloudinary
    };

    const downloadAndSave = async url => {
        try {
            const downloadOptions = {
                fromUrl: url,
                toFile: `${FileSystem.documentDirectory}audio.mp3` // Change the filename and extension as needed
            };

            const downloadResult = await FileSystem.downloadAsync(
                url,
                downloadOptions.toFile
            );
            if (downloadResult.status === 200) {
                console.log("Download successful!");
                return downloadResult.uri;
            } else {
                console.error("Download failed:", downloadResult);
                return null;
            }
        } catch (error) {
            console.error("Error during download:", error);
            return null;
        }
    };

    const downloadAndPlay = async () => {
        if (cloudinaryUrl) {
            try {
                // Check if the file is already downloaded
                const localFilePath = `${FileSystem.documentDirectory}audio.mp3`;
                const fileExists = await FileSystem.getInfoAsync(localFilePath);

                if (fileExists.exists) {
                    // File is already downloaded, play it directly
                    await playAudio(localFilePath);
                } else {
                    // File not downloaded, initiate download
                    const downloadedFilePath =
                        await downloadAndSave(cloudinaryUrl);
                    if (downloadedFilePath) {
                        await playAudio(downloadedFilePath);
                    } else {
                        console.error("Unable to download and save the file.");
                    }
                }
            } catch (error) {
                console.error("Error downloading and playing audio:", error);
            }
        }
    };

    const playAudio = async filePath => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: filePath },
                { shouldPlay: true }
            );
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    return {
        recording,
        startRecording,
        stopRecording,
        downloadAndPlay,
        downloadAndSave
    };
};
