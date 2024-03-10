export const usersChat = [
    {
        _id: "1",
        chatId: "1-2",
        messages: [
            {
                _id: "1",
                senderId: "1",
                receiverId: "2",
                documents: "hello",
                message: "first chat 2",
                replyId: "",
                seen: true
            }
        ]
    },
    {
        _id: "2",
        chatId: "1-3",

        messages: [
            {
                _id: "1",
                senderId: "1",
                receiverId: "3",
                documents: "hello normal",
                message: "second  chat 1",
                replyId: "",
                seen: false
            },
            {
                _id: "2",
                senderId: "3",
                receiverId: "1",
                documents: "hello image",
                message: "second  chat 2",
                replyId: "",
                seen: false
            },
            {
                _id: "3",
                senderId: "3",
                receiverId: "1",
                documents: "hello doc",
                message: "chat 1 reply second  chat 3",
                replyId: "3",
                seen: false
            },
            {
                _id: "5",
                senderId: "1",
                receiverId: "3",
                documents: "hello audio",
                message: "chat 1 reply second  chat 1",
                replyId: "1",
                seen: false
            },
            {
                _id: "6",
                senderId: "1",
                receiverId: "3",
                documents: "hello video",
                message: "second  chat 1",
                replyId: "",
                seen: false
            },
            {
                _id: "7",
                senderId: "3",
                receiverId: "1",
                documents: "ekelecontact08072921210",
                message: "new chat",
                replyId: "",
                seen: false
            },
            {
                _id: "8",
                senderId: "3",
                receiverId: "1",
                documents: "hello normal",
                message: "chat 1 reply second  chat 3",
                replyId: "3",
                seen: false
            },
            {
                _id: "9",
                senderId: "1",
                receiverId: "3",
                documents: "hello image",
                message: "chat 1 reply second  chat 1",
                replyId: "1",
                seen: false
            }
        ]
    },
    {
        _id: "1",
        chatId: "2-4",
      
        messages: [
            {
                _id: "1",
                senderId: "2",
                receiverId: "4",
                documents: "hello",
                message: "not my chat",
                replyId: "",
                seen: false
            }
        ]
    }
];
