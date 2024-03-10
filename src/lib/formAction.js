import { useApiFunctions } from "./imports";

export const useFormAction = (contextValues) => {
    const {
        setApiAction,
        setApiLoading,
        setApiIsSuccess,
        setApiError,
        setApiIsError,
        
    } = contextValues;

    const { useAddNewAnnouncementMutation, useUpdateAnnouncementMutation } =
        useApiFunctions();

    const formAction = async (name, action) => {
        let create = "create";
        let edit = "edit";

        if (action === create) {
            if (name === "Announcement") {
                const [
                    addNewAnnouncement,
                    { isLoading, isSuccess, isError, error }
                ] = await useAddNewAnnouncementMutation();

                setApiLoading(isLoading);
                setApiIsSuccess(isSuccess);
                setApiError(error);
                setApiIsError(isError);
                setApiAction(addNewAnnouncement);
                return true;
            }
        }

        if (action === edit) {
            if (name === "Announcement") {
                const [
                    updateAnnouncement,
                    { isLoading, isSuccess, isError, error }
                ] = await useUpdateAnnouncementMutation();

                setApiLoading(isLoading);
                setApiIsSuccess(isSuccess);
                setApiError(error);
                setApiIsError(isError);
                setApiAction(updateAnnouncement);
                console.log("second", apiAction);
                return true;
            }
        }
    };

    return formAction;
};
