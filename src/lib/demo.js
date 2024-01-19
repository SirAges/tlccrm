
export const users = [
    {
        _id: "1",
        isVerified: true,
        dateJoined: "2024-01-12",
        username: "john_doe",
        department: ["engineering", "marketing"],
        image: require("../../assets/images/p.jpg"),
        cImage: require("../../assets/images/ps1.jpg"),
        geolocation: {
            lat: "37.7749",
            lng: "-122.4194"
        },
        onlinestatus: {
            status: true,
            timestamp: "2024-01-12T12:30:00Z"
        },
        personal: {
            fullname: "John Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            about: "Passionate about technology and marketing.",
            country: "United States",
            state: "California",
            city: "San Francisco",
            address: "123 Main Street",
            postalCode: "94105",
            resident: {
                country: "United States",
                state: "California",
                city: "San Francisco",
                address: "456 Resident Street",
                postalCode: "94110"
            }
        }
    }
];

export const testimonies = [
    {
        _id: "1",
        title: "Amazing Experience",
        testifier: "John Doe",
        image: require("../../assets/images/ch1.jpg"),
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        program: "Special Event",
        date: "2024-01-13",
        comments: ["id1", "id2", "id3"],
        replies: ["id4", "id5", "id6"]
    }
];

export const comments = [
    {
        _id: "id1",
        fieldId: "1",
        senderId: "2",
        comment: "Great content!"
    }
];

export const replies = [
    {
        _id: "id4",
        senderId: "3",
        commentId: "id1",
        reply: "Thanks!"
    }
];

// Similar modifications for other arrays...

export const drawerMenu = [
    {
        _id: "1",
        title: "Home",
        name: "home",
        outline: "home-outline",
        screen: "DashboardScreen"
    },
    {
        _id: "2",
        title: "Profile",
        name: "profile",
        outline: "person-outline",
        screen: "ProfileScreen"
    },
    {
        _id: "3",
        title: "Testimonies",
        name: "testimonies",
        outline: "star-outline",
        screen: "TestimoniesScreen"
    },
    {
        _id: "4",
        title: "Comments",
        name: "comments",
        outline: "chatbox-outline",
        screen: "CommentsScreen"
    },
    {
        _id: "5",
        title: "Devotionals",
        name: "devotionals",
        outline: "book-outline",
        screen: "DevotionalsScreen"
    }
];
