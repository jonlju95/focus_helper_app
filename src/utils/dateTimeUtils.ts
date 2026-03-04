export const getRangeStart = (range: 'week' | 'month' | 'all'): string | null => {
    const now = new Date();

    if (range === 'all') return null;  // no lower bound

    if (range === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return weekAgo.toISOString().split('T')[0];
    }

    if (range === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return monthAgo.toISOString().split('T')[0];
    }

    return null;
};

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