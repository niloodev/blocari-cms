import { motion } from 'motion/react'
import styled from 'styled-components'

export const StyledSectionHeader = styled(motion.div)<{
    $align: 'left' | 'center'
}>`
    box-sizing: border-box;
    width: 90%;
    max-width: 760px;
    margin: 0 auto;
    padding: 24px 0;

    display: flex;
    flex-direction: column;
    gap: 16px;

    text-align: ${({ $align }) => $align};
    align-items: ${({ $align }) =>
        $align === 'center' ? 'center' : 'flex-start'};

    & .eyebrow {
        font-family: var(--font-lexend);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #e55b5b;
    }

    & h2 {
        font-family: var(--font-poppins);
        font-size: clamp(30px, 5vw, 46px);
        font-weight: 700;
        line-height: 1.12;
        letter-spacing: -1px;
        color: #18181b;
        margin: 0;
    }

    & p {
        font-family: var(--font-rubik);
        font-size: clamp(16px, 2vw, 19px);
        line-height: 1.6;
        color: #52525b;
        margin: 0;
        max-width: 620px;
    }
`
