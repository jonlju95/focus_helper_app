// Typography constants matching the Nunito / Nunito Sans design system.
// In React Native, font weights are strings, not numbers.

const typography = {

    // ── Font families ───────────────────────────────────────
    // After installing fonts (see note below), reference them here.
    // For now these fall back to system fonts that match the feel.
    fonts: {
        heading: 'Nunito',       // bold headings
        body: 'NunitoSans',   // body text, labels
    },

    // ── Font sizes ──────────────────────────────────────────
    sizes: {
        xs: 10,   // badges, version text
        sm: 11,   // section labels, caps
        base: 12,   // meta text, timestamps
        md: 13,   // small labels, chips
        lg: 14,   // body text, list items
        xl: 15,   // card titles
        '2xl': 18,  // form amounts
        '3xl': 22,  // card headings, detail titles
        '4xl': 26,  // page titles
        '5xl': 32,  // hero amounts
    },

    // ── Font weights ────────────────────────────────────────
    // React Native uses string weights
    weights: {
        regular: '400' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
        black: '900' as const,
    },

    // ── Line heights ────────────────────────────────────────
    lineHeights: {
        tight: 1.1,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.7,
    },

    // ── Letter spacing ──────────────────────────────────────
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1.0,
        widest: 1.2,   // uppercase section labels
    },

    // ── Prebuilt text styles ─────────────────────────────────
    // Use these directly in components for consistency
    styles: {
        pageTitle: {
            fontSize: 26,
            fontWeight: '900' as const,
            color: '#2a2420',
            lineHeight: 28.6,   // fontSize * lineHeight.tight
        },
        cardTitle: {
            fontSize: 15,
            fontWeight: '800' as const,
            color: '#2a2420',
        },
        detailTitle: {
            fontSize: 22,
            fontWeight: '900' as const,
            color: '#2a2420',
        },
        sectionLabel: {
            fontSize: 11,
            fontWeight: '800' as const,
            color: '#b0a090',
            letterSpacing: 1.2,
            textTransform: 'uppercase' as const,
        },
        bodyText: {
            fontSize: 14,
            fontWeight: '600' as const,
            color: '#3a3530',
            lineHeight: 23.8,   // fontSize * lineHeight.relaxed
        },
        metaText: {
            fontSize: 12,
            fontWeight: '600' as const,
            color: '#b0a090',
        },
        label: {
            fontSize: 11,
            fontWeight: '800' as const,
            color: '#c4622d',
            letterSpacing: 0.5,
        },
        amount: {
            fontSize: 22,
            fontWeight: '900' as const,
            color: '#2a2420',
        },
        heroAmount: {
            fontSize: 32,
            fontWeight: '900' as const,
            color: '#ffffff',
        },
    },
} as const;

export default typography;
