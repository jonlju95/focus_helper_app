import {db} from "@/db/database";

export const useSidebarDB = () => {

    const getUserSettings = () => {
        return db.query.user_settings.findFirst();
    }

    const getGreetings = async () => {
        return db.query.greetings.findMany();
    }

    const getGreeting = async (id: string) => {
        return db.query.greetings.findFirst({
            where: (greetings, {eq}) => eq(greetings.id, id)
        })
    }

    return {
        getUserSettings,
        getGreetings,
        getGreeting
    }
}