import {ActivityTypes} from "@/types/activityTypes";
import {ExpenseTypes} from "@/types/expenseTypes";

interface CategoryColor {
    bg: string;
    text: string;
    icon: string;  // sometimes icon color differs from text
}

// Colors for activity types
export const ACTIVITY_COLORS: Record<ActivityTypes, CategoryColor> = {
    appointment: {bg: '#fde8d8', text: '#c4622d', icon: '#c4622d'},
    meeting: {bg: '#ddeef8', text: '#3a7fc1', icon: '#3a7fc1'},
    personal: {bg: '#e8f5e8', text: '#3a9a5a', icon: '#3a9a5a'},
    errand: {bg: '#fdf3d8', text: '#c49028', icon: '#c49028'},
    work: {bg: '#f0e8fd', text: '#8a3ac1', icon: '#8a3ac1'},
    note: {bg: '#e8f0fd', text: '#3a5ac1', icon: '#3a5ac1'},
};

// Colors for expense categories
export const CATEGORY_COLORS: Record<ExpenseTypes, CategoryColor> = {
    groceries: {bg: '#E8F5E8', text: '#3A9A5A', icon: '#3A9A5A'},
    "food&drink": {bg: '#FDE8D8', text: '#C4622D', icon: '#C4622D'},
    transport: {bg: '#DDEEF8', text: '#3A7FC1', icon: '#3A7FC1'},
    health: {bg: '#FDE8F8', text: '#C13A9A', icon: '#C13A9A'},
    subscriptions: {bg: '#F0E8FD', text: '#8A3AC1', icon: '#8A3AC1'},
    home: {bg: '#FDF3D8', text: '#C49028', icon: '#C49028'},
    other: {bg: '#EDE8E0', text: '#7A6A5A', icon: '#7A6A5A'},
}