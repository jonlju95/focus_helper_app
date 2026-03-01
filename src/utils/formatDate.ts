export const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        month:   'long',
        day:     'numeric',
    });
};