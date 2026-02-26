const colors = {
    // ── Brand ──────────────────────────────────────────────
    primary: '#c4622d',   // terracotta — main accent
    primaryLight: '#fde8d8',   // light tint for backgrounds
    primaryDark: '#d4793d',   // gradient end

    // ── Backgrounds ────────────────────────────────────────
    bgApp: '#e8e0d5',   // outer app background
    bgScreen: '#faf7f2',   // main screen background
    bgCard: '#ffffff',   // card background
    bgMuted: '#efe9df',   // muted elements (pills, buttons)
    bgInput: '#faf7f2',   // form input background

    // ── Text ───────────────────────────────────────────────
    textPrimary: '#2a2420',   // headings, important text
    textSecondary: '#5a4a3a',   // body text
    textMuted: '#b0a090',   // placeholders, labels, meta
    textWarm: '#7a6a5a',   // secondary labels

    // ── Borders ────────────────────────────────────────────
    border: '#ede8e0',   // card/input borders
    borderWarm: '#f0c8a0',   // warm alert borders

    // ── Status ─────────────────────────────────────────────
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

    // ── Dark card (budget) ──────────────────────────────────
    dark: '#2a2420',

    // ── Category colors ─────────────────────────────────────
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