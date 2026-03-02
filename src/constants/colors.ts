const colors = {
    primary: '#c4622d',
    primaryLight: '#fde8d8',
    primaryDark: '#d4793d',

    bgApp: '#e8e0d5',
    bgScreen: '#faf7f2',
    bgCard: '#ffffff',
    bgMuted: '#efe9df',
    bgInput: '#faf7f2',

    textPrimary: '#2a2420',
    textSecondary: '#5a4a3a',
    textMuted: '#b0a090',
    textWarm: '#7a6a5a',

    border: '#ede8e0',
    borderWarm: '#f0c8a0',

    urgent: '#c4622d',
    urgentLight: '#fdd8c8',
    warning: '#c49028',
    warningLight: '#fdefc8',
    success: '#3a9a5a',
    successLight: '#e8f5e8',
    info: '#3a7fc1',
    infoLight: '#ddeef8',
    purple: '#8a3ac1',
    purpleLight: '#f0e8fd',

    dark: '#2a2420',

    categories: {
        groceries: {bg: '#e8f5e8', text: '#3a9a5a'},
        foodAndDrink: {bg: '#fde8d8', text: '#c4622d'},
        transport: {bg: '#ddeef8', text: '#3a7fc1'},
        health: {bg: '#fde8f8', text: '#c13a9a'},
        subscriptions: {bg: '#f0e8fd', text: '#8a3ac1'},
        home: {bg: '#fdf3d8', text: '#c49028'},
        other: {bg: '#ede8e0', text: '#7a6a5a'},
    },
} as const;

export default colors;