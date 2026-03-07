import {useSidebarDB} from "@/screens/sidebar/hooks/useSidebarDB";
import {useEffect, useState} from "react";
import {Option} from "@/components/ui/sharedInputs/SharedOptionPicker";

export const useSidebarProfile = () => {
    const { getGreetings } = useSidebarDB();
    const [greetings, setGreetings] = useState<Option[]>([]);

    useEffect(() => {
        getGreetings().then(data => {
            setGreetings(data.map(g => ({ label: g.phrase, value: g.id })));
        });
    }, [getGreetings]);

    return { greetings };
}