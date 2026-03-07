import {createContext, ReactNode, useCallback, useContext} from "react";
import {useSetting} from "@/hooks/useSetting";

const UserSettingsContext = createContext<{
    username: string;
    greetingId: string;
    refetch: () => void;
}>({
    username: '',
    greetingId: '',
    refetch: () => {},
});

export function UserSettingsProvider({ children }: { children: ReactNode }) {
    const { value: username, refetch: refetchUsername } = useSetting('USER_NAME');
    const { value: greetingId, refetch: refetchGreeting } = useSetting('USER_GREETING');

    const refetch = useCallback(() => {
        refetchUsername();
        refetchGreeting();
    }, [refetchUsername, refetchGreeting]);

    return (
        <UserSettingsContext.Provider value={{ username, greetingId, refetch }}>
            {children}
        </UserSettingsContext.Provider>
    );
}

export const useUserSettings = () => useContext(UserSettingsContext);