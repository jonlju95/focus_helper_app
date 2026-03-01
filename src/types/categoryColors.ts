import {Categories} from "@/types/categories";

interface CategoryColor {
    bg:   string;
    text: string;
    icon: string;  // sometimes icon color differs from text
}

export const ACTIVITY_COLORS: Record<Categories, CategoryColor> = {
    appointment: { bg: '#fde8d8', text: '#c4622d', icon: '#c4622d' },
    meeting:     { bg: '#ddeef8', text: '#3a7fc1', icon: '#3a7fc1' },
    personal:    { bg: '#e8f5e8', text: '#3a9a5a', icon: '#3a9a5a' },
    errand:      { bg: '#fdf3d8', text: '#c49028', icon: '#c49028' },
    work:        { bg: '#f0e8fd', text: '#8a3ac1', icon: '#8a3ac1' },
    note:        { bg: '#e8f0fd', text: '#3a5ac1', icon: '#3a5ac1' },
};