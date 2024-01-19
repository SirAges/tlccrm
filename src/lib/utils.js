import { formatDistanceToNow } from "date-fns";
import { users } from "./data";
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
export const getMonth = dateString => {
    const options = {
        month: "long"
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
        second: "numeric",
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
