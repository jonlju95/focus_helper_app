export const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        month:   'long',
        day:     'numeric',
    });
};

export const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
        month: 'long',
    })
}

export const parseTime = (time: string, date?: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const base = date ? new Date(date) : new Date();
    base.setHours(hours, minutes, 0, 0);
    return base;
}