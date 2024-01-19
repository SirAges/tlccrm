export const users = [
    {
        base: "user",
        _id: "1",
        isVerified: true,
        dateJoined: "January 2008",
        username: "phestplus",
        department: ["intercessor", "sanitary", "pastor"],
        ministry: "youth",
        hidden: ["phone", "state"],
        image: require("../../assets/images/p.jpg"),
        cImage: require("../../assets/images/ch1.jpg"),
        geolocation: {
            lat: "37.7749",
            lng: "-122.4194"
        },
        onlineStatus: {
            status: true,
            timestamp: "2024-01-12T08:30:00Z"
        },
        friends: [
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3",
            "2",
            "3"
        ],
        personal: {
            fullName: "Ekele Stephen",
            email: "ekele@example.com",
            phone: "+123456789",
            about: "Passionate about intercessory prayer and hygiene.",
            country: "Country",
            state: "State",
            city: "City",
            address: "123 Main Street",
            postalCode: "12345",
            resident: {
                country: "Resident Country",
                state: "Resident State",
                city: "Resident City",
                address: "Resident Street, 456",
                postalCode: "67890"
            }
        }
    },
    {
        base: "user",
        _id: "2",
        isVerified: true,
        dateJoined: "2024-01-12",
        username: "isGrace",
        department: ["usher", "envangelist"],
        ministry: "women",
        hidden: ["phone", "about"],
        image: require("../../assets/images/ps1.jpg"),
        cImage: require("../../assets/images/ch2.png"),
        geolocation: {
            lat: "37.7749",
            lng: "-122.4194"
        },
        onlineStatus: {
            status: false,
            timestamp: "2024-01-12T08:30:00Z"
        },
        friends: ["1", "3"],
        personal: {
            fullname: "Israel grace",
            email: "ekele@example.com",
            phone: "+123456789",
            about: "Passionate about intercessory prayer and hygiene.",
            country: "Country",
            state: "State",
            city: "City",
            address: "123 Main Street",
            postalCode: "12345",
            resident: {
                country: "Resident Country",
                state: "Resident State",
                city: "Resident City",
                address: "Resident Street, 456",
                postalCode: "67890"
            }
        }
    },
    {
        base: "user",
        _id: "3",
        isVerified: true,
        dateJoined: "2024-01-12",
        username: "micheal",
        department: ["usher", "envangelist"],
        ministry: "women",
        hidden: ["resident", "state"],
        image: require("../../assets/images/ps1.jpg"),
        cImage: require("../../assets/images/ch2.png"),
        geolocation: {
            lat: "37.7749",
            lng: "-122.4194"
        },
        onlineStatus: {
            status: false,
            timestamp: "2024-01-12T08:30:00Z"
        },
        friends: ["1", "2"],
        personal: {
            fullname: "Israel grace",
            email: "ekele@example.com",
            phone: "+123456789",
            about: "Passionate about intercessory prayer and hygiene.",
            country: "Country",
            state: "State",
            city: "City",
            address: "123 Main Street",
            postalCode: "12345",
            resident: {
                country: "Resident Country",
                state: "Resident State",
                city: "Resident City",
                address: "Resident Street, 456",
                postalCode: "67890"
            }
        }
    }
];

export const testimonies = [
    {
        base: "testimony",
        _id: "6",
        title: "Healed of terible cancer that lasted 20 years",
        testifier: "Jane Doe",
        image: require("../../assets/images/ps1.jpg"),
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        program: "And the enemies submited",
        date: "2021-01-15T12:00:00Z",
        comments: [
            {
                _id: "14",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "24",
                senderId: "2",
                message: "yes",
                reply: "1"
            },
            {
                _id: "34",
                senderId: "1",
                message: "thanks",
                reply: "2"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            }
        ]
    }
];

export const devotionals = [
    {
        base: "devotion",
        _id: "1",
        _createdAt: "2024-01-14T09:45:00Z",
        text: "Start your week with gratitude and positivity.",
        theme: "Gratitude",
        memoryVerse: "Philippians 4:6",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        prayers: "Pray for peace and joy in your week."
    }
];

export const news = [
    {
        base: "news",
        _id: "94",
        _createdAt: "2024-01-15T12:00:00Z",
        title: "Exciting News!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: require("../../assets/images/psmm1.png"),
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "2",
                senderId: "1",
                message: "yes",
                reply: "1"
            },
            {
                _id: "3",
                senderId: "1",
                message: "thanks",
                reply: "2"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "chatbox"
            },
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "send"
            }
        ]
    },
    {
        base: "news",
        _id: "67",
        _createdAt: "2019-01-15T12:00:00Z",
        title: "Exciting News!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: require("../../assets/images/psmm1.png"),
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "2",
                senderId: "1",
                message: "yes",
                reply: "1"
            },
            {
                _id: "3",
                senderId: "1",
                message: "thanks",
                reply: "2"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "chatbox"
            },
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "send"
            }
        ]
    },
    {
        base: "news",
        _id: "58",
        _createdAt: "2018-01-15T12:00:00Z",
        title: "Exciting News!",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: require("../../assets/images/psmm1.png"),
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "2",
                senderId: "1",
                message: "yes",
                reply: "1"
            },
            {
                _id: "3",
                senderId: "1",
                message: "thanks",
                reply: "2"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "chatbox"
            },
            {
                senderId: "1",
                reaction: "heart"
            },
            {
                senderId: "1",
                reaction: "send"
            }
        ]
    }
];

export const sermons = [
    {
        base: "sermon",
        _id: "1",
        _createdAt: "2021-01-16T14:30:00Z",
        image: require("../../assets/images/ch3.jpg"),
        program: "tuesday Service",
        title: "Amend your ways",
        text: "Matthew 6:33",
        introduction:
            "ahggh ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        body: [
            {
                _id: "1",
                point: "1",
                title: "Love Yourself",
                text: "john 3:3",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        ],
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "2",
                senderId: "1",
                message: "yes",
                reply: "1"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            }
        ]
    },
    {
        base: "sermon",
        _id: "2",
        _createdAt: "2024-01-16T14:30:00Z",
        image: require("../../assets/images/ch3.jpg"),
        program: "Sunday Service",
        title: "where is my Love",
        text: "Matthew 6:33",
        introduction:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        body: [
            {
                _id: "1",
                point: "1",
                title: "Love Yourself",
                text: "john 3:3",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        ],
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            },
            {
                _id: "2",
                senderId: "1",
                message: "yes",
                reply: "1"
            },
            {
                _id: "3",
                senderId: "1",
                message: "thanks",
                reply: "2"
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            }
        ]
    },
    {
        base: "sermon",
        _id: "3",
        _createdAt: "2024-01-16T14:30:00Z",
        image: require("../../assets/images/ch3.jpg"),
        program: "Sunday Service",
        title: "amend now is my Love",
        text: "Matthew 6:33",
        introduction:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        body: [
            {
                _id: "1",
                point: "1",
                title: "Love Yourself",
                text: "john 3:3",
                body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        ],
        comments: [
            {
                _id: "1",
                senderId: "1",
                message: "amen",
                reply: ""
            }
        ],
        reactions: [
            {
                senderId: "1",
                reaction: "heart"
            }
        ]
    }
];

export const branches = [
    {
        base: "branch",
        _id: "1",
        name: "City of Grace Church",
        phone: "+2349876543",
        bankAccount: "987654321",
        country: "Nigeria",
        state: "Lagos",
        city: "Ikeja",
        address: "789 Miracle Avenue",
        postalCode: "100003",
        image: require("../../assets/images/ch3.jpg"),
        pastor: "Pastor David Adeoye"
    }
];

export const drawerMenu = [
    {
        base: "dmenu",
        _id: "1",
        title: "About Us",
        name: "information-circle",
        outline: "information-circle-outline",
        screen: "AboutScreen"
    },
    {
        _id: "2",
        title: "Anouncements",
        name: "megaphone",
        outline: "megaphone-outline",
        screen: "AnnouncementScreen"
    },
    {
        _id: "3",
        title: "Branches",
        name: "location",
        outline: "location-outline",
        screen: "BranchesScreen"
    },
    {
        _id: "4",
        title: "Chosen School",
        name: "school",
        outline: "school-outline",
        screen: "ChosenSchoolScreen"
    },
    {
        _id: "5",
        title: "Devotional Guide",
        name: "book",
        outline: "book-outline",
        screen: "DevotionalScreen"
    }
];

export const fonts = {
    extraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    extraBoldItalic: require("../../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    extraLight: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    extraLightItalic: require("../../assets/fonts/Poppins-ExtraLightItalic.ttf"),

    semiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    semiBoldItalic: require("../../assets/fonts/Poppins-SemiBoldItalic.ttf")
};

export const upcomingEvents = [
    {
        _id: "1",
        title: "FROM SORROW TO JOY 2024",
        date: "2024-01-28T14:30:00Z",
        time: "14:30:00",

        image: require("../../assets/images/ch3.jpg"),
        venue: "Chosen Revival Ground 10 Odofin Park Estate, Along Oshodi-Apapa Express Way, Ijesha, Lagos, Nigeria"
    }
];
export const socialmedia = [
    {
        _id: "1",
        name: "facebook",
        link: "https://facebook.com/tlccrmofficial",
        icon: "logo-facebook"
    },
    {
        _id: "2",
        name: "twitter",
        link: "https://www.twitter.com/tlccrmofficial",
        icon: "logo-twitter"
    },
    {
        _id: "3",
        name: "instagram",
        link: "https://www.instagram.com/tlccrmofficial/",
        icon: "logo-instagram"
    },
    {
        _id: "4",
        name: "youtube",
        link: "https://www.youtube.com/channel/UCTpSz18J4PkEN6a2_HsZsSw",
        icon: "logo-youtube"
    },
    {
        _id: "5",
        name: "zoom",
        link: "https://us02web.zoom.us/j/6944015274?pwd=Y2lLZm8xbWZHM2lsUXkzdWt0RU8wUT09",
        icon: "videocam"
    }
];
export const reactions = [
    { id: "1", reaction: "heart-outline" },
    { id: "2", reaction: "thumbs-up-outline" },
    { id: "3", reaction: "chatbox-outline" },
    { id: "4", reaction: "send-outline" }
];
export const currentUser = {
    base: "user",
    _id: "1",
    isVerified: true,
    dateJoined: "2024-01-12",
    username: "phestplus",
    department: ["intercessor", "sanitary"],
    ministry: "youth",
    image: require("../../assets/images/p.jpg"),
    cImage: require("../../assets/images/ch1.jpg"),
    geolocation: {
        lat: "37.7749",
        lng: "-122.4194"
    },
    onlinestatus: {
        status: false,
        timestamp: "2024-01-12T08:30:00Z"
    },
    personal: {
        fullname: "Ekele Stephen",
        email: "ekele@example.com",
        phone: "+123456789",
        about: "Passionate about intercessory prayer and hygiene.",
        country: "Country",
        state: "State",
        city: "City",
        address: "123 Main Street",
        postalCode: "12345",
        resident: {
            country: "Resident Country",
            state: "Resident State",
            city: "Resident City",
            address: "Resident Street, 456",
            postalCode: "67890"
        }
    }
};
