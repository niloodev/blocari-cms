import { motion } from 'motion/react'
import styled, { css, keyframes } from 'styled-components'

const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
    70% { box-shadow: 0 0 0 6px transparent; opacity: 0.7; }
    100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
`

export const StyledBadge = styled(motion.span)<{
    $tone: 'primary' | 'neutral' | 'dark'
}>`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    padding: 7px 15px;
    border-radius: 999px;

    font-family: var(--font-lexend);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.4px;
    white-space: nowrap;
    width: fit-content;

    ${({ $tone }) =>
        $tone === 'primary' &&
        css`
            background-color: #fef2f2;
            border: 1px solid #fac5c5;
            color: #b23636;
        `}

    ${({ $tone }) =>
        $tone === 'neutral' &&
        css`
            background-color: #f4f4f5;
            border: 1px solid #e4e4e7;
            color: #3f3f46;
        `}

    ${({ $tone }) =>
        $tone === 'dark' &&
        css`
            background-color: #18181b;
            border: 1px solid #27272a;
            color: #fafafa;
        `}

    & .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: currentColor;
        animation: ${pulse} 2s infinite;
    }
`
