import {useSidebarDB} from "@/screens/sidebar/hooks/useSidebarDB";
import {useEffect, useState} from "react";

export const useSidebarAbout = () => {
    const {getUserSettings} = useSidebarDB();

    const [username, setUsername] = useState('');

    useEffect(() => {
        getUserSettings().then((settings) => {
            // setUsername(settings?.username ?? 'User');
        })
    }, []);

    return {username};
}