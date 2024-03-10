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
        phone: "123456789",
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

export const users = [
    {
        base: "user",
        _id: "1",
        isVerified: true,
        dateJoined: "January 2008",
        username: "john",
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
            phone: "64874664466666",
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
            phone: "07055691743",
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
            status: true,
            timestamp: "2024-01-12T08:30:00Z"
        },
        friends: ["1", "2"],
        personal: {
            fullname: "Israel grace",
            email: "ekele@example.com",
            phone: "09049142839",
            about: "Passionate about intercessory prayer and hygiene.",
            country: "Country",
            state: "State",
            city: "City",
            address: "123 Main Street",
            postalCode: "12345",
            resident: {
                ///
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
        _createdAt: "2001-06-15T12:00:00Z",
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
        text: "Matthew 18: 21-35",
        title: "UNFORGIVENESS CAN RUIN YOUR JOY",
        memoryVerse: {
            text: "Hebrews 12:14-15",
            body: "Follow peace with all men, and holiness, without which **no man shall** see the Lord:  15  Looking diligently lest any man fail of the grace of God; lest any root of bitterness springing up trouble you, and thereby many be defiled."
        },
        body: "If you are truly desirous of having total joy in your heart this month, it means you must avoid *anything that can make you to feel* perpetually pained or aggrieved. One of such things is **UNFORGIVENESS**. It is the attitude of continuously harbouring or bearing grudges in the mind against those who have offended us at one time or the other. Whenever we remember such things, our hearts bleed and we become agitated and angry. Unforgiveness drains us psychologically and emotionally, and saps us of both spiritual and physical energy.##Unforgiveness closes our channel of communication with God in heaven. God therefore admonishes us to follow peace with all men, and holiness, without which no eye shall see the Lord. A person with an unforgiving heart is covered by spiritual darkness. Unfortunately, many people today habour ***unforgiveness*** in their hearts against others who offended them. Their animosity towards **those** people burn inside and make them feel like exploding *from* inside. Unforgiveness is a terrible malady. Unforgiveness poses a great danger against the human soul since it has the capacity to transport one’s soul unhindered to hell fire.##The cost of unforgiveness is colossal. God therefore advocates that we follow peace with all men and holiness, without which no man shall see the Lord. It is impossible to make heaven with an unforgiving heart. Unforgiveness is a trap which the devil uses to ensnare many Christians by making them to feel justified. Maybe you have been offended in so many unimaginable ways. It is true that such undeserving attitude can be extremely painful and difficult to forgive especially when they are caused by those we trusted and loved. Nevertheless, not forgiving them will be to the detriment of your soul. Therefore, no matter how pained and aggrieved you feel about those who offended you, find a place in your heart to forgive.",
        prayers:
            "Lord, give me the mind of Christ to forgive even those people that offended me, in Jesus name. #1Any spirit of unforgiveness dwelling in me, vacate by fire, in ***Jesus*** name.#2Lord, let your peace and joy that surpasses human understanding *envelop* my heart, in Jesus name.#3Lord, give our G. O more and more **grace to continue** forgiving those that offend him, in Jesus name."
    },
    {
        base: "devotion",
        _id: "2",
        _createdAt: "2023-07-19T09:45:00Z",
        text: "Matthew 5:23",
        title: " your week with gratitude and positivity.",
        memoryVerse: {
            text: "john 4:6",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        body: "Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
        prayers: "Pray for peace and joy in your week."
    },
    {
        base: "devotion",
        _id: "3",
        _createdAt: "2024-01-24T09:45:00Z",
        text: "luke 5:23",
        title: "Start  week with   positivity.",
        memoryVerse: {
            text: "Philippians 4:6",
            body: "aorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        body: "Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
        prayers: "Pray for peace and joy in your week."
    },
    {
        base: "devotion",
        _id: "4",
        _createdAt: "2027-12-28T09:45:00Z",
        text: "amos 5:23",
        title: "Start your week with gratitude and positivity.",
        memoryVerse: {
            text: "isaiah 4:6",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        body: "ygff ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
        prayers: "Pray for peace and joy in your week."
    }
];

export const news = [
    {
        base: "news",
        _id: "94",
        _createdAt: "2002-06-15T12:00:00Z",
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
        _createdAt: "2006-01-15T12:00:00Z",
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
        _createdAt: "2004-01-15T12:00:00Z",
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
        _createdAt: "2007-01-16T14:30:00Z",
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
        _createdAt: "2005-01-16T14:30:00Z",
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
        _createdAt: "2003-08-16T14:30:00Z",
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
        title: "City of Grace Church",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        phone: "+2349876543",
        bankAccount:
            "Bank name: Fidelity bank ##acount number: 987654321 ##Account name :tlccrmofficial",
        country: "Nigeria",
        _createdAt: "2024-01-16T14:30:00Z",
        state: "Lagos",
        city: "Ikeja",
        geoLocation: {
            lng: 7.419161,
            lat: 5.970324
        },
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
        screen: "AnnouncementNavigator"
    },
    {
        _id: "3",
        title: "Branches",
        name: "location",
        outline: "location-outline",
        screen: "BranchNavigator"
    },

    {
        _id: "4",
        title: "Devotional Guide",
        name: "book",
        outline: "book-outline",
        screen: "DevotionalNavigator"
    },
    {
        _id: "12",
        title: "Events",
        name: "book",
        outline: "book-outline",
        screen: "EventNavigator"
    },
    {
        _id: "5",
        title: "Chosen School",
        name: "school",
        outline: "school-outline",
        screen: "ChosenSchoolScreen"
    },
    {
        _id: "6",
        title: "More Grace",
        name: "book",
        outline: "book-outline",
        screen: "MoreGraceScreen"
    },
    {
        _id: "7",
        title: "Give",
        name: "school",
        outline: "school-outline",
        screen: "GiveNavigator"
    },
    {
        _id: "8",
        title: "What we believe",
        name: "book",
        outline: "book-outline",
        screen: "DoctrineNavigator"
    },

    {
        _id: "9",
        title: "Hymns",
        name: "book",
        outline: "book-outline",
        screen: "HymnNavigator"
    },
    {
        _id: "10",
        title: "Ministries",
        name: "school",
        outline: "school-outline",
        screen: "MinistryNavigator"
    },
    {
        _id: "11",
        title: "Departments",
        name: "Departments",
        outline: "book-outline",
        screen: "DepartmentNavigator"
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
        image: require("../../assets/images/ch3.jpg"),
        date: "2024-03-8T6:30:00Z",
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

export const usersChat = [
    {
        _id: "1",
        chatId: "1-1",
        messages: [
            {
                _id: "4",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "1",
                message: "hello",
                replyId: "2",
                seen: true
            },
            {
                _id: "7",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "1",
                message: "hello",
                replyId: "1",
                seen: false
            },
            {
                _id: "6",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "1",
                message: "hello",
                replyId: "2",
                seen: false
            }
        ]
    },
    {
        _id: "13",
        chatId: "1-3",
        messages: [
            {
                _id: "31",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "3",
                receiverId: "1",
                message:
                    "image Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                replyId: "3",
                seen: false
            },
            {
                _id: "43",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "3",
                message:
                    "audio Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                replyId: "3",
                seen: false
            },
            {
                _id: "56",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "3",
                receiverId: "1",
                message: "video Lorem",
                replyId: "3",
                seen: false
            },
            {
                _id: "65",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "3",
                message:
                    "upload Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                replyId: "3",
                seen: false
            },
            {
                _id: "74",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "3",
                receiverId: "1",
                message:
                    "normal Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                replyId: "3",
                seen: false
            }
        ]
    },
    {
        _id: "54",
        chatId: "1-2",
        messages: [
            {
                _id: "4",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "2",
                message: "hello",
                replyId: "2",
                seen: true
            },
            {
                _id: "7",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "2",
                receiverId: "1",
                message: "hello",
                replyId: "2",
                seen: true
            },
            {
                _id: "6",
                _createdAt: "2024-01-16T14:34:00Z",
                senderId: "1",
                receiverId: "2",
                message: "hello",
                replyId: "2",
                seen: false
            }
        ]
    }
];

export const visions = [
    {
        _id: "1",
        title: "Grass root revival all over the world (Mk 16:15-17).",
        body: "Mark 16:15 says, “And he said unto them, Go ye into all the world, and preach the gospel to every creature.” This first vision is in fulfillment of the Lord’s commandment to the apostles to go into the world and preach the gospel. This commission is the foundational element that would establish the Lordship and Kingship of Jesus Christ upon all mankind. And the church, as a result-embarked on an unlimited outreach programme that will bring revival all over the world. Within few months of inception of the church (and in confirmation of the evidence of the calling by God,) the continent of Africa and beyond has perceived the wave of The Lord’s Chosen Charismatic Revival church"
    },

    {
        _id: "2",
        title: "Revival of the apostolic christian experiences among the body of Christ (1 Pet. 2:9-10).",
        body: "Acts 2:17 says, “And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams:” In the Bible days, the apostles enjoyed wonderful experiences of grace such as: faith, love, holiness, humility, perseverance, hope, zeal, commitment and gifts of the Holy Spirit. These are the bedrock of our Christian faith. And through these experiences, God demonstrated inexplicable signs and wonders, using the apostles as instrument to touch the lives of many. Thus, healings and deliverances were wrought by God through the apostles.####In Matthew 10:7-8, Jesus says, “And as ye go, preach, saying, the kingdom of heaven is at hand. Heal the sick, cleanse the lepers, raise the dead, cast out devils: freely ye have received, freely give”. This is a mandate that has been neglected. However, these experiences that were ordained to be a continuous exercise, have become very cold among the body of Christ in our generation. Hence, God has by His grace and mercy, raised the Lord’s Chosen Charismatic Revival church as an instrument in His hand to revive and restore these experiences among the body of Christ all over the world. The manifestations of these experiences are the startling and inexplicable testimonies of salvation, sanctification, breakthroughs, deliverances and healings of incurable diseases such as HIV, cancer, diabetes etc. Few of these testimonies are what we have highlighted in this website for your spiritual upliftment."
    },

    {
        _id: "3",
        title: "Revival of Heavenly Consciousness in the Body of Christ (Heaven at last (Matt. 6:33)).",
        body: "This is the last hope of every believer and for this purpose Jesus Christ came to restore the lost kingdom of God by Adam, back to man. The aspiration of every believer is that he/she will be in heaven at last. It is a primary truth that no one lives in this planet forever. Every one must one day die to pave way for the real personality, the soul to live forever The Lord’s Chosen has been divinely endowed to awaken the conscience of human race towards the realization of this vital grace of God, which enables us to make heaven at last. John 14:1-3 says, “Let not your heart be troubled: ye believe in God, believe also in me. In my Father’s house are many mansions: if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.”"
    }
];

export const announcements = [
    {
        _id: "1",
        _createdAt: "2025-01-16T14:34:00Z",
        title: "heaven conscience divinely endowed to awaken the  of human race towards the realization of this vital grace of God, which enables us to make ",
        image: require("../../assets/images/ps1.jpg"),
        start: "2024-01-11T14:34:00Z",
        end: "2024-01-16T14:34:00Z",
        body: "I will come again, and receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        link: ""
    },
    {
        _id: "2",
        _createdAt: "2024-01-16T14:34:00Z",
        title: "awaken realization divinely endowed to  the conscience of human race towards the  of this vital grace of God, which enables us to make heavenof human race towards the  of this vital grace of God, which enables us to make heaven",
        image: require("../../assets/images/ps1.jpg"),
        start: "2021-01-16T14:34:00Z",
        end: "2024-02-16T14:34:00Z",
        body: "I will come again, and receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        link: ""
    },
    {
        _id: "3",
        _createdAt: "2024-01-16T14:34:00Z",
        title: "endowed to awaken the conscience of human race",
        image: require("../../assets/images/ps1.jpg"),
        start: "2024-01-10T14:34:00Z",
        end: "2021-01-16T14:34:00Z",
        body: "I will come again, and receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        link: ""
    }
];

export const services = [
    {
        _id: "51",
        title: "Worship and study",
        day: "sunday",
        time: "8:00 am",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "82",
        title: "house care fellowship",
        day: "sunday",
        time: "5:00 pm - 6:00pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "53",
        title: "pastors and leaders vigil ",
        day: "monday",
        time: "11:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "49",
        title: "revival hour  ",
        day: "tuesday",
        time: "4:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "54",
        title: "workers vigil ",
        day: "wednessday",
        time: "11:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "65",
        title: "counselling and deliverance ",
        day: "thursday",
        time: "4:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "75",
        title: "power night",
        day: "friday",
        time: "11:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "58",
        title: "bible study / workers meating",
        day: "saturday",
        time: "12:00 pm",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    }
];

export const bankAccounts = [
    {
        _id: "1",
        title: "dollar account",
        bankName: "ZENITH BANK",
        accountName: "",
        accountNumber: "5070571267",
        swiftCode: "ZEIBNGLA",
        iban: "GB80CITI18500810407941",
        routing: ""
    },
    {
        _id: "2",
        title: "dollar account",
        bankName: "UBA",
        accountName: "",
        accountNumber: "36320321",
        swiftCode: "UNAFNGLA",
        iban: "",
        routing: "021000089"
    },

    {
        _id: "3",
        title: "pound account",
        bankName: "ZENITH BANK",
        accountName: "",
        accountNumber: "5060149483",
        swiftCode: "ZEIBNGLA",
        iban: "GB22CITI18500805527945",
        routing: ""
    },
    {
        _id: "4",
        title: "pound account",
        bankName: "UBA",
        accountName: "",
        accountNumber: "13664090",
        swiftCode: "CODEUNAFNGLA",
        iban: "GB07CITI18500813664090",
        routing: ""
    },

    {
        _id: "5",
        title: "euro account",
        bankName: "UBA",
        accountName: "",
        accountNumber: "13664082",
        swiftCode: "UNAFNGLA",
        iban: "GB29CITI18500813664082",
        routing: ""
    },

    {
        _id: "6",
        title: "naira account",
        bankName: "ZENITH BANK",
        accountName: "THE LORD’S CHOSEN",
        accountNumber: "1014510259",
        swiftCode: "",
        iban: "",
        routing: ""
    },
    {
        _id: "7",
        title: "naira account",
        bankName: "UBA",
        accountName: "THE LORD’S CHOSEN",
        accountNumber: "100364838",
        swiftCode: "",
        iban: "",
        routing: ""
    },

    {
        _id: "8",
        title: "parnership account",
        bankName: "ACCESS BANK",
        accountName: "THE LORD’S CHOSEN",
        accountNumber: "0770340148",
        swiftCode: "",
        iban: "",
        routing: ""
    }
];

export const doctrines = [
    {
        _id: "1",
        title: "we believe in God",
        text: "luke 5:34",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "2",
        title: "we believe in the trinity",
        text: "mark 8:34",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    },
    {
        _id: "3",
        title: "we believe there is a heaven and hell",
        text: "john 6:34",
        body: "receive you unto myself; that where I am, there ye may be also.” Matthew 6:33 said, “But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."
    }
];

export const hymns = [
    {
        _id: "1",
        index: "1",
        title: "trust and obey",
        audio: require("../../assets/audios/amazing2.mp3"),
        chorus: "Trust and obey, For there's no other way To be happy in Jesus, But to trust and obey.",
        body: [
            {
                _id: "1",
                number: "1",
                verse: "When we walk with the Lord In the light of His Word, What a glory He sheds on our way! While we do His good will, He abides with us still, And with all who will trust and obey.",
                chorus: ""
            },
            {
                _id: "2",
                number: "2",
                verse: "Not a shadow can rise, Not a cloud in the skies, But His smile quickly drives it away; Not a doubt or a fear, Not a sigh or a tear, Can abide while we trust and obey.",
                chorus: ""
            },
            {
                _id: "3",
                number: "3",
                verse: "Not a burden we bear, Not a sorrow we share, But our toil He doth richly repay; Not a grief or a loss, Not a frown or a cross, But is blessed if we trust and obey.",
                chorus: ""
            },
            {
                _id: "4",
                number: "4",
                verse: "But we never can prove The delights of His love Until all on the altar we lay; For the favor He shows, And the joy He bestows, Are for those who will trust and obey.",
                chorus: ""
            },
            {
                _id: "5",
                number: "5",
                verse: "Then in fellowship sweet We will sit at His feet, Or we'll walk by His side in the way; What He says we will do, Where He sends we will go, Never fear, only trust and obey.",
                chorus: ""
            }
        ],
        author: "John H. Sammis",
        history:
            "**Trust and Obey** is a Christian hymn written by John H. Sammis in 1887. The hymn's origins are associated with a sermon by evangelist D.L. Moody, where the emphasis was on trusting and obeying God. Inspired by this message, Sammis crafted the lyrics to capture the essence of the call for a deeper faith and a closer relationship with God.#### The lyrics reflect a personal commitment to walking with the Lord, finding joy in obedience, and trusting in His guidance. **Trust and Obey** has endured as a powerful expression of Christian devotion, emphasizing the timeless importance of faith and obedience in the Christian journey. The hymn remains a cherished part of worship traditions across various Christian denominations."
    },

    {
        _id: "2",
        index: "245",
        title: "holy holy holy holy holy ",
        chorus: "",
        audio: require("../../assets/audios/amazing2.mp3"),
        body: [
            {
                _id: "1",
                number: "1",
                verse: "Holy, Holy, Holy! Lord God Almighty!##Early in the morning our song shall rise to Thee; ##Holy, Holy, Holy! Merciful and Mighty! ##God in Three Persons, blessed Trinity!",
                chorus: ""
            },
            {
                _id: "2",
                number: "2",
                verse: "Holy, Holy, Holy! All the saints adore Thee,##Casting down their golden crowns around the glassy sea;##Cherubim and Seraphim falling down before Thee,##Which wert and art and evermore shalt be.",
                chorus: ""
            },
            {
                _id: "3",
                number: "3",
                verse: "Holy, Holy, Holy! Though the darkness hide Thee,##Though the eye of sinful man Thy glory may not see;##Only Thou art holy; there is none beside Thee,##Perfect in power, in love, and purity.",
                chorus: ""
            },
            {
                _id: "4",
                number: "4",
                verse: "Holy, Holy, Holy! Lord God Almighty!##All Thy works shall praise Thy name, in earth, and sky, and sea;##Holy, Holy, Holy! Merciful and Mighty!##God in Three Persons, blessed Trinity!",
                chorus: ""
            }
        ],
        author: "John H. Sammis",
        history:
            "**Trust and Obey** is a Christian hymn written by John H. Sammis in 1887. The hymn's origins are associated with a sermon by evangelist D.L. Moody, where the emphasis was on trusting and obeying God. Inspired by this message, Sammis crafted the lyrics to capture the essence of the call for a deeper faith and a closer relationship with God.#### The lyrics reflect a personal commitment to walking with the Lord, finding joy in obedience, and trusting in His guidance. **Trust and Obey** has endured as a powerful expression of Christian devotion, emphasizing the timeless importance of faith and obedience in the Christian journey. The hymn remains a cherished part of worship traditions across various Christian denominations."
    }
];
export const emojiReactions = [
    "\u{1F602}", // 😂
    "\u{2764}\u{FE0F}", // ❤️
    "\u{1F44D}", // 👍
    "\u{1F60D}", // 😍
    "\u{1F60A}" // 😊
];

export const ministries = [
    {
        _id: "1",
        announcements: [
            {
                _createdAt: "2023-06-16T14:34:00Z",
                _id: "1",
                title: "Important Announcement",
                image: require("../../assets/images/ch1.jpg"),
                start: "2023-06-16T14:34:00Z",
                end: "2023-08-19T14:34:00Z",
                body: "This is a crucial announcement.",
                link: "https://example.com"
            },
            {
                _createdAt: "2024-01-11T14:34:00Z",
                _id: "2",
                title: "Event Reminder",
                image: require("../../assets/images/ch2.png"),
                start: "2024-01-11T14:34:00Z",
                end: "2024-02-17T14:34:00Z",
                body: "Don't forget about our upcoming event.",
                link: "https://events.example.com/event123"
            }
        ],
        title: "youth Ministry",
        members: ["1", "2", "3"],
        body: "Description of the sample ministry. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: require("../../assets/images/ch3.jpg"),
        feeds: [
            {
                _id: "1",
                _createdAt: "2024-01-11T14:34:00Z",
                title: "Latest Feed",
                image: require("../../assets/images/ch1.jpg"),
                body: "This is the latest feed update.",
                timestamp: "2024-02-01T08:30:00.000Z",
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
            },
            {
                _id: "2",
                _createdAt: "2023-01-11T14:34:00Z",
                title: "Community Spotlight",
                image: require("../../assets/images/ch3.jpg"),
                body: "Highlighting outstanding contributions from our community members.",
                timestamp: "2024-01-30T15:45:00.000Z",
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
        ],
        cocs: [
            {
                _id: "1",
                title: "Code of Conduct",
                text: "matt 4:6",
                body: "Our community follows a set of rules for respectful interactions."
            },
            {
                _id: "2",
                title: "Updated Code of Conduct",
                text: "mark 2:2",
                body: "We have revised our Code of Conduct to better reflect our community values."
            }
        ]
    }
];
export const departments = [
    {
        _id: "1",
        announcements: [
            {
                _id: "1",
                title: "Important Announcement",
                image: require("../../assets/images/ch1.jpg"),
                start: "2024-02-01T12:00:00.000Z",
                end: "2024-02-10T12:00:00.000Z",
                body: "This is a crucial announcement.",
                link: "https://example.com"
            },
            {
                _id: "2",
                title: "Event Reminder",
                image: require("../../assets/images/ch2.png"),
                start: "2024-02-15T18:00:00.000Z",
                end: "2024-02-15T21:00:00.000Z",
                body: "Don't forget about our upcoming event.",
                link: "https://events.example.com/event123"
            }
        ],
        title: "youth Ministry",
        members: ["1", "2", "3"],
        body: "Description of the sample ministry. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: require("../../assets/images/ch3.jpg"),
        feeds: [
            {
                _id: "1",
                _createdAt: "1",
                title: "Latest Feed",
                image: require("../../assets/images/ch1.jpg"),
                body: "This is the latest feed update.",
                timestamp: "2024-02-01T08:30:00.000Z",
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
            },
            {
                _id: "2",
                _createdAt: "2",
                title: "Community Spotlight",
                image: require("../../assets/images/ch3.jpg"),
                body: "Highlighting outstanding contributions from our community members.",
                timestamp: "2024-01-30T15:45:00.000Z",
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
        ],
        cocs: [
            {
                title: "Code of Conduct",
                body: "Our community follows a set of rules for respectful interactions."
            },
            {
                title: "Updated Code of Conduct",
                body: "We have revised our Code of Conduct to better reflect our community values."
            }
        ]
    }
];

export const markMyWords = [
    {
        title: "You shall rise again",
        image: require("../../assets/images/p.jpg")
    },
    {
        title: "You can not be deceived you are a chosen",
        image: require("../../assets/images/ch1.jpg")
    }
];
