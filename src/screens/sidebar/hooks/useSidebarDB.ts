import {db} from "@/db/database";

export const useSidebarDB = () => {

    const getUserSettings = () => {
        return db.query.user_settings.findFirst();
    }

    const getGreetings = async () => {
        return db.query.greetings.findMany();
    }

    return {
        getUserSettings,
        getGreetings
    }
}