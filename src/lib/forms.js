export const announcementForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title must not be less than 3 characters",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image must not be less than 3 characters",
        multiline: false
    },
    {
        id: "start",
        name: "",
        focused: false,
        placeholder: "start",
        type: "text",
        label: "start",
        pattern: /^.{3,}$/,
        error: "start must not be less than 3 characters",
        multiline: true
    },
    {
        id: "end",
        name: "",
        focused: false,
        placeholder: "end",
        type: "text",
        label: "end",
        pattern: /^.{3,}$/,
        error: "end must not be less than 3 characters",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "details",
        type: "text",
        label: "details",
        pattern: /^.{3,}$/,
        error: "details must not be less than 3 characters",
        multiline: false
    },
    {
        id: "link",
        name: "",
        focused: false,
        placeholder: "link",
        type: "link",
        label: "link",
        pattern: /^.{3,}$/,
        error: "must be a valid link",
        multiline: false
    }
];

export const cocForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title must not be less than 3 characters",
        multiline: false
    },

    {
        id: "text",
        name: "",
        focused: false,
        placeholder: "text",
        type: "text",
        label: "text",
        pattern: /^.{3,}$/,
        error: "details must not be less than 3 characters",
        multiline: false
    },

    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "details",
        type: "text",
        label: "details",
        pattern: /^.{3,}$/,
        error: "details must not be less than 3 characters",
        multiline: false
    }
];

export const branchForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "pastor",
        name: "",
        focused: false,
        placeholder: "pastor",
        type: "text",
        label: "pastor",
        pattern: /^.{3,}$/,
        error: "pastor",
        multiline: false
    },
    {
        id: "phone",
        name: "",
        focused: false,
        placeholder: "phone",
        type: "text",
        label: "phone",
        pattern: /^.{3,}$/,
        error: "phone",
        multiline: false
    },
    {
        id: "country",
        name: "",
        focused: false,
        placeholder: "country",
        type: "text",
        label: "country",
        pattern: /^.{3,}$/,
        error: "country",
        multiline: false
    },
    {
        id: "state",
        name: "",
        focused: false,
        placeholder: "state",
        type: "text",
        label: "state",
        pattern: /^.{3,}$/,
        error: "state",
        multiline: false
    },
    {
        id: "city",
        name: "",
        focused: false,
        placeholder: "city",
        type: "text",
        label: "city",
        pattern: /^.{3,}$/,
        error: "city",
        multiline: false
    },
    {
        id: "address",
        name: "",
        focused: false,
        placeholder: "address",
        type: "text",
        label: "address",
        pattern: /^.{3,}$/,
        error: "address",
        multiline: false
    },
    {
        id: "postalCode",
        name: "",
        focused: false,
        placeholder: "postalCode",
        type: "text",
        label: "postalCode",
        pattern: /^.{3,}$/,
        error: "postalCode",
        multiline: false
    },

    {
        id: "geoLocation",
        label: "geo location",
        obj: {
            lng: {
                id: "lng",
                name: "",
                focused: false,
                placeholder: "longitude",
                type: "text",
                label: "longitude",
                pattern: /^.{3,}$/,
                error: "longitude",
                multiline: false
            },
            lat: {
                id: "lat",
                name: "",
                focused: false,
                placeholder: "latitude",
                type: "text",
                label: "latitude",
                pattern: /^.{3,}$/,
                error: "lat",
                multiline: false
            }
        }
    }
];

export const departmentForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },

    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    },

    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    }
];

export const devotionForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "text",
        name: "",
        focused: false,
        placeholder: "text",
        type: "text",
        label: "text",
        pattern: /^.{3,}$/,
        error: "text",
        multiline: false
    },
    {
        id: "memoryVerse",
        label: "memory Verse",
        obj: {
            text: {
                id: "text",
                name: "text",
                placeholder: "text",
                type: "text",
                label: "text",
                pattern: /^.{3,}$/,
                error: "text",
                multiline: false
            },
            body: {
                id: "body",
                name: "body",
                placeholder: "verse",
                type: "text",
                label: "body",
                pattern: /^.{3,}$/,
                error: "body",
                multiline: true
            }
        }
    },

    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    },
    {
        id: "prayers",
        name: "",
        focused: false,
        placeholder: "prayers",
        type: "text",
        label: "prayers",
        pattern: /^.{3,}$/,
        error: "prayers",
        multiline: false
    }
];

export const doctrineForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "text",
        name: "",
        focused: false,
        placeholder: "text",
        type: "text",
        label: "text",
        pattern: /^.{3,}$/,
        error: "text",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    }
];

export const giveForm = [
    {
        id: "name",
        name: "",
        focused: false,
        placeholder: "name",
        type: "text",
        label: "name",
        pattern: /^.{3,}$/,
        error: "name",
        multiline: false
    },
    {
        id: "amount",
        name: "",
        focused: false,
        placeholder: "amount",
        type: "text",
        label: "amount",
        pattern: /^.{3,}$/,
        error: "amount",
        multiline: false
    },
    {
        id: "purpose",
        name: "",
        focused: false,
        placeholder: "offering, tithe, seed",
        type: "text",
        label: "purpose",
        pattern: /^.{3,}$/,
        isSelect: ["offering", "tithe", "seed", "partnership", "convenant"],
        error: "purpose",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "note",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    }
];
export const bankAccountForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "bankName",
        name: "",
        focused: false,
        placeholder: "bank Name",
        type: "text",
        label: "bank Name",
        pattern: /^.{3,}$/,
        error: "bankName",
        multiline: false
    },
    {
        id: "accountName",
        name: "",
        focused: false,
        placeholder: "account Name",
        type: "text",
        label: "account Name",
        pattern: /^.{3,}$/,
        error: "accountName",
        multiline: false
    },
    {
        id: "accountNumber",
        name: "",
        focused: false,
        placeholder: "account Number",
        type: "text",
        label: "account Number",
        pattern: /^.{3,}$/,
        error: "accountNumber",
        multiline: false
    },
    {
        id: "routing",
        name: "",
        focused: false,
        placeholder: "routing",
        type: "text",
        label: "routing",
        pattern: /^.{3,}$/,
        error: "routing",
        multiline: false
    },
    {
        id: "swiftCode",
        name: "",
        focused: false,
        placeholder: "swift Code",
        type: "text",
        label: "swift Code",
        pattern: /^.{3,}$/,
        error: "swiftCode",
        multiline: false
    },
    {
        id: "iban",
        name: "",
        focused: false,
        placeholder: "iban",
        type: "text",
        label: "iban",
        pattern: /^.{3,}$/,
        error: "iban",
        multiline: false
    }
];

export const hymnForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "index",
        name: "",
        focused: false,
        placeholder: "index",
        type: "text",
        label: "index",
        pattern: /^.{3,}$/,
        error: "index",
        multiline: false
    },
    {
        id: "audio",
        name: "",
        focused: false,
        placeholder: "audio",
        type: "text",
        label: "audio",
        pattern: /^.{3,}$/,
        error: "audio",
        multiline: false
    },
    {
        id: "chorus",
        name: "",
        focused: false,
        placeholder: "chorus",
        type: "text",
        label: "chorus",
        pattern: /^.{3,}$/,
        error: "chorus",
        multiline: true
    },
    {
        id: "body",
        name: "",
        focused: false,
        label: "Add unique Verse",
        array: [
            {
                id: "verse",
                name: "verse",
                placeholder: "verse",
                type: "text",
                label: "verse",
                pattern: /^.{3,}$/,
                error: "verse",
                multiline: true
            },

            {
                id: "chorus",
                name: "",
                focused: false,
                placeholder: "chorus",
                type: "text",
                label: "chorus",
                pattern: /^.{3,}$/,
                error: "chorus",
                multiline: true
            }
        ]
    },
    {
        id: "author",
        name: "",
        focused: false,
        placeholder: "author",
        type: "text",
        label: "author",
        pattern: /^.{3,}$/,
        error: "author",
        multiline: false
    },
    {
        id: "history",
        name: "",
        focused: false,
        placeholder: "history",
        type: "text",
        label: "history",
        pattern: /^.{3,}$/,
        error: "history",
        multiline: true
    }
];

export const ministryForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },

    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    },

    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    }
];

export const newsForm = [
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },

    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    }
];

export const sermonForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "text",
        name: "",
        focused: false,
        placeholder: "text",
        type: "text",
        label: "text",
        pattern: /^.{3,}$/,
        error: "text",
        multiline: false
    },

    {
        id: "program",
        name: "",
        focused: false,
        placeholder: "program",
        type: "text",
        label: "program",
        pattern: /^.{3,}$/,
        error: "program",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "introduction",
        name: "",
        focused: false,
        placeholder: "introduction",
        type: "text",
        label: "introduction",
        pattern: /^.{3,}$/,
        error: "introduction",
        multiline: true
    },
    {
        id: "body",
        label: "add points",
        array: [
            {
                id: "point",
                name: "",
                focused: false,
                placeholder: "point",
                type: "text",
                label: "point",
                pattern: /^.{3,}$/,
                error: "point",
                multiline: false
            },

            {
                id: "title",
                name: "",
                focused: false,
                placeholder: "title",
                type: "text",
                label: "title",
                pattern: /^.{3,}$/,
                error: "title",
                multiline: false
            },
            {
                id: "text",
                name: "",
                focused: false,
                placeholder: "text",
                type: "text",
                label: "text",
                pattern: /^.{3,}$/,
                error: "text",
                multiline: false
            },
            {
                id: "body",
                name: "",
                focused: false,
                placeholder: "body",
                type: "text",
                label: "body",
                pattern: /^.{3,}$/,
                error: "body",
                multiline: true
            }
        ]
    }
];

export const testimonyForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /.{3,}/,
        error: "title must not be less than three characters long",
        multiline: false
    },
    {
        id: "testifier",
        name: "",
        focused: false,
        placeholder: "testifier",
        type: "text",
        label: "testifier",
        pattern: /^.{3,}$/,
        error: "testifier",
        multiline: false
    },

    {
        id: "program",
        name: "",
        focused: false,
        placeholder: "program",
        type: "text",
        label: "program",
        pattern: /^.{3,}$/,
        error: "program",
        multiline: false
    },
    {
        id: "date",
        name: "",
        focused: false,
        placeholder: "date",
        type: "text",
        label: "date",
        pattern: /^.{3,}$/,
        error: "date",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    }
];

export const feedForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "image",
        name: "image",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: true
    }
];
export const loginForm = [
    {
        id: "username",
        name: "",
        focused: false,
        placeholder: "username",
        type: "text",
        label: "username",
        pattern: /^.{3,}$/,
        error: "username",
        multiline: false
    },
    {
        id: "password",
        name: "",
        focused: false,
        placeholder: "password",
        type: "text",
        label: "password",
        pattern: /^.{3,}$/,
        error: "password",
        multiline: false
    }
];
export const registerForm = [
    {
        id: "username",
        name: "",
        focused: false,
        placeholder: "username",
        type: "text",
        label: "username",
        pattern: /^.{3,}$/,
        error: "username",
        multiline: false
    },
    {
        id: "password",
        name: "",
        focused: false,
        placeholder: "password",
        type: "text",
        label: "password",
        pattern: /^.{3,}$/,
        error: "password",
        multiline: false
    },
    {
        id: "cpassword",
        name: "",
        focused: false,
        placeholder: "comfirm password",
        type: "text",
        label: "comfirm password",
        pattern: /^.{3,}$/,
        error: "comfirm password",
        multiline: false
    }
];

export const eventForm = [
    {
        id: "title",
        name: "",
        focused: false,
        placeholder: "title",
        type: "text",
        label: "title",
        pattern: /^.{3,}$/,
        error: "title",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    },
    {
        id: "date",
        name: "",
        focused: false,
        placeholder: "date",
        type: "text",
        label: "date",
        pattern: /^.{3,}$/,
        error: "date",
        multiline: false
    },
    {
        id: "body",
        name: "body",
        focused: false,
        placeholder: "venue",
        type: "text",
        label: "venue",
        pattern: /^.{3,}$/,
        error: "venue",
        multiline: false
    }
];
export const quoteForm = [
    {
        id: "text",
        name: "",
        focused: false,
        placeholder: "text",
        type: "text",
        label: "text",
        pattern: /^.{3,}$/,
        error: "text",
        multiline: false
    },
    {
        id: "author",
        name: "",
        focused: false,
        placeholder: "author",
        type: "text",
        label: "author",
        pattern: /^.{3,}$/,
        error: "author",
        multiline: false
    },
    {
        id: "body",
        name: "",
        focused: false,
        placeholder: "body",
        type: "text",
        label: "body",
        pattern: /^.{3,}$/,
        error: "body",
        multiline: false
    },
    {
        id: "image",
        name: "",
        focused: false,
        placeholder: "image",
        type: "text",
        label: "image",
        pattern: /^.{3,}$/,
        error: "image",
        multiline: false
    }
];
