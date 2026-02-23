import React from 'react';

// The original full logo
const WebstarLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 -5 280 50" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* W - Overlapping Vs */}
            <path d="M0,0 L12,40 L24,0" />
            <path d="M12,0 L24,40 L36,0" />

            {/* E */}
            <path d="M52,0 L52,40" />
            <path d="M52,0 L76,0" />
            <path d="M52,20 L72,20" />
            <path d="M52,40 L76,40" />

            {/* B */}
            <path d="M92,0 L92,40" />
            <path d="M92,0 L108,0 Q116,0 116,10 Q116,20 108,20 L92,20" />
            <path d="M92,20 L108,20 Q116,20 116,30 Q116,40 108,40 L92,40" />

            {/* S */}
            <path d="M156,0 L142,0 Q132,0 132,10 Q132,20 142,20 L146,20 Q156,20 156,30 Q156,40 142,40 L132,40" />

            {/* T */}
            <path d="M172,0 L196,0" />
            <path d="M184,0 L184,40" />

            {/* A - Inverted V */}
            <path d="M212,40 L224,0 L236,40" />

            {/* R */}
            <path d="M252,0 L252,40" />
            <path d="M252,0 L266,0 Q276,0 276,10 Q276,20 266,20 L252,20" />
            <path d="M260,20 L276,40" />
        </svg>
    );
};

export const WebLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 -5 125 50" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* W */}
        <path d="M0,0 L12,40 L24,0" />
        <path d="M12,0 L24,40 L36,0" />
        {/* E */}
        <path d="M52,0 L52,40" />
        <path d="M52,0 L76,0" />
        <path d="M52,20 L72,20" />
        <path d="M52,40 L76,40" />
        {/* B */}
        <path d="M92,0 L92,40" />
        <path d="M92,0 L108,0 Q116,0 116,10 Q116,20 108,20 L92,20" />
        <path d="M92,20 L108,20 Q116,20 116,30 Q116,40 108,40 L92,40" />
    </svg>
);

export const StarLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="130 -5 150 50" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* S */}
        <path d="M156,0 L142,0 Q132,0 132,10 Q132,20 142,20 L146,20 Q156,20 156,30 Q156,40 142,40 L132,40" />
        {/* T */}
        <path d="M172,0 L196,0" />
        <path d="M184,0 L184,40" />
        {/* A */}
        <path d="M212,40 L224,0 L236,40" />
        {/* R */}
        <path d="M252,0 L252,40" />
        <path d="M252,0 L266,0 Q276,0 276,10 Q276,20 266,20 L252,20" />
        <path d="M260,20 L276,40" />
    </svg>
);

export default WebstarLogo;
