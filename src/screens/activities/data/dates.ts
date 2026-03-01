import {Option} from "@/components/ui/OptionPicker";

export const months: Option[] = [
    {label: 'January', value: '0'},
    {label: 'February', value: '1'},
    {label: 'March', value: '2'},
    {label: 'April', value: '3'},
    {label: 'May', value: '4'},
    {label: 'June', value: '5'},
    {label: 'July', value: '6'},
    {label: 'August', value: '7'},
    {label: 'September', value: '8'},
    {label: 'October', value: '9'},
    {label: 'November', value: '10'},
    {label: 'December', value: '11'},
];

export const years: Option[] = [
    {label: (new Date().getFullYear()-1).toString(), value:  (new Date().getFullYear()-1).toString()},
    {label: (new Date().getFullYear()).toString(), value:  (new Date().getFullYear()).toString()},
    {label: (new Date().getFullYear()+1).toString(), value:  (new Date().getFullYear()+1).toString()},
]