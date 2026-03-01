const typography = {

    fonts: {
        heading: 'Nunito',       // bold headings
        body: 'NunitoSans',   // body text, labels
    },

    sizes: {
        xs: 10,   // badges, version text
        sm: 11,   // section labels, caps
        base: 12,   // meta text, timestamps
        md: 13,   // small labels, chips
        lg: 14,   // body text, list items
        xl: 15,   // card titles
        '2xl': 18,  // form amounts
        '3xl': 22,  // card headings, detail titles
        '4xl': 28,  // page titles
        '5xl': 32,  // hero amounts,
        '6xl': 38,
    },

    lineHeights: {
        tight: 1.1,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.7,
    },

    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1.0,
        widest: 1.2,   // uppercase section labels
    },

    styles: {
        pageTitle: {
            fontSize: 26,
            fontFamily: `Nunito_900`,
            color: '#2a2420',
            lineHeight: 28.6,   // fontSize * lineHeight.tight
        },
        cardTitle: {
            fontSize: 15,
            fontFamily: `Nunito_800`,
            color: '#2a2420',
        },
        detailTitle: {
            fontSize: 22,
            fontFamily: `Nunito_900`,
            color: '#2a2420',
        },
        sectionLabel: {
            fontSize: 11,
            fontFamily: `Nunito_800`,
            color: '#b0a090',
            letterSpacing: 1.2,
            textTransform: 'uppercase' as const,
        },
        bodyText: {
            fontSize: 14,
            fontFamily: `Nunito_600`,
            color: '#3a3530',
            lineHeight: 23.8,   // fontSize * lineHeight.relaxed
        },
        metaText: {
            fontSize: 12,
            fontFamily: `Nunito_600`,
            color: '#b0a090',
        },
        label: {
            fontSize: 11,
            fontFamily: `Nunito_800`,
            color: '#c4622d',
            letterSpacing: 0.5,
        },
        amount: {
            fontSize: 22,
            fontFamily: `Nunito_900`,
            color: '#2a2420',
        },
        heroAmount: {
            fontSize: 32,
            fontFamily: `Nunito_900`,
            color: '#ffffff',
        },
        badgeText: {
            fontSize: 11,
            fontFamily: `Nunito_700`,
        }
    },
} as const;

export default typography;
