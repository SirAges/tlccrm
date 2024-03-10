import * as AnnouncementApi from "../redux/announcement/announcementApiSlice";

export const useApiFunctions = () => {
    return {
        ...AnnouncementApi
    };
};
