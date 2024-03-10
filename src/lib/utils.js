import { formatDistanceToNow, format, getDay } from "date-fns";
import { useGetUserQuery } from "../redux/user/userApiSlice";
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { users } from "./data";
import { Text } from "react-native";

export const formatDateAgo = raw => {
    const timestamp = new Date(raw);
    const timeAgo = formatDistanceToNow(timestamp, {
      
        addSuffix: true
    });
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
    if (!dateString) {
        return "Invalid date";
    }

    const formattedDate = format(new Date(dateString), "yyyy MMMM dd, HH:mm", {
        timeZone: "UTC"
    });

    return formattedDate;
};
export const getDays = dateString => {
    return getDay(new Date(dateString));
};

export const getDayText = dateString => {
    return format(new Date(dateString), "EEE");
};

export const getMonth = dateString => {
    return format(new Date(dateString), "MMM");
};

export const getYear = dateString => {
    return format(new Date(dateString), "yyyy");
};

export const getTime = dateString => {
    return format(new Date(dateString), "HH:mm", { timeZone: "UTC" });
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
    } else if (number >= 1000 && number < 10000) {
        const newNumber = String(number).charAt(0) + "K";
        return newNumber;
    } else if (number >= 10000 && number < 100000) {
        const newNumber = String(number).slice(0, 1) + "k";
        return newNumber;
    } else if (number >= 100000 && number < 1000000) {
        const newNumber = String(number).slice(0, 2) + "K";
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

export const processText = (value, len) => {
    const boldItalicRegex = /\*\*\*(.*?)\*\*\*/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const italicRegex = /\*([^*]+)\*/g;
    const newLineRegex = /##/g;
    const listRegex = /#(\d+)/g;
    if (value) {
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

            return newList;
        } else {
            return <>{textFormat(value)}</>;
        }
    } else {
        return null;
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

export const pickDocument = async (type, multiple) => {
    const result = await DocumentPicker.getDocumentAsync({
        type,
        multiple
    });

    return result;
    console.log("result", result);
};

export const saveToCloudinary = async result => {
    const cloudName = "daxrp4nar";
    const apiKey = "868455186369275";
    const uploadPreset = "tlccrm";
    let uploadedUrls = [];

    if (!result) throw new Error("no result");

    for (const asset of result) {
        try {
            const { name, mimeType, uri } = asset;
            const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

            const formData = new FormData();
            formData.append("file", {
                uri,
                type: mimeType,
                name
            });

            formData.append("upload_preset", uploadPreset);
            formData.append("api_key", apiKey);

            const options = {
                method: "post",
                body: formData,
                headers: {
                    accept: "application/json"
                }
            };

            const response = await fetch(apiUrl, options);
            const data = await response.json();
            const imageUri = data.secure_url;

            uploadedUrls = [...uploadedUrls, imageUri];
        } catch (err) {
            throw new Error(err.message);
        }
    }

    return uploadedUrls;
};

export const deleteImageByUrl = async imageUrl => {
    try {
        // Extract public ID from the image URL (assuming it follows the Cloudinary pattern)
        const publicId = imageUrl.match(/\/([^/]+)\/[^/]+$/)[1];

        // Cloudinary API endpoint for deleting by public ID
        const deleteEndpoint = `https://api.cloudinary.com/v1_1/your_cloud_name/image/destroy/${publicId}`;

        // Cloudinary credentials
        const apiKey = "868455186369275";
        const apiSecret = "QbqJgL592zxwFis-L4Ibs12qUdw";

        // Encode credentials using FileSystem
        const credentials = `${apiKey}:${apiSecret}`;
        const encodedCredentials = await FileSystem.readAsStringAsync(
            FileSystem.cacheDirectory + "encodedCredentials.txt",
            { encoding: FileSystem.EncodingType.Base64 }
        );

        // Make a DELETE request to Cloudinary API
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        };

        const response = await fetch(deleteEndpoint, options);

        // Log the response
        console.log(response);

        // Return the response or handle it as needed
        return response;
    } catch (error) {
        console.error(error.message);
        // Handle the error as needed
    }
};

export const getLocalStorage = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value; // Return the retrieved value
    } catch (error) {
        console.error("Error retrieving data:", error);
        return null; // Return null in case of error
    }
};

export const setLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log("Data stored successfully");
    } catch (error) {
        console.error("Error storing data:", error);
    }
};
