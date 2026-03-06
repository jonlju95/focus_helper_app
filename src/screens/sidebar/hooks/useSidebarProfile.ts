import {useSidebarDB} from "@/screens/sidebar/hooks/useSidebarDB";
import {useEffect, useState} from "react";
import {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";

export const useSidebarProfile = () => {
    const {getUserSettings, getGreetings} = useSidebarDB();

    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('499ed04d-bd73-433b-98a1-aabfdd39a6c7');
    const [greetings, setGreetings] = useState<Option[]>([]);

    useEffect(() => {
        getUserSettings().then((settings) => {
            setUsername(settings?.username ?? 'User');
            setGreeting(settings?.user_greeting_id ?? '');
            getGreetings().then(greetings => {
                const options: Option[] = [];
                greetings.map(g => {
                    options.push({
                        label: g.phrase,
                        value: g.id
                    })
                })
                setGreetings(options);
            })
        })
    }, []);

    return {username, greeting, greetings};
}