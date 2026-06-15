import { motion } from 'motion/react'
import styled from 'styled-components'

export const StyledFeatureCard = styled(motion.div)<{ $accent: string }>`
    position: relative;
    box-sizing: border-box;

    width: 100%;
    max-width: 360px;
    min-height: 220px;

    padding: 32px;
    border-radius: 20px;

    background-color: #ffffff;
    border: 1px solid #f0f0f1;
    box-shadow: 0 14px 40px -24px rgba(24, 24, 27, 0.4);

    display: flex;
    flex-direction: column;
    gap: 14px;

    overflow: hidden;

    /* Linha de destaque que aparece no hover */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: ${({ $accent }) => $accent};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
    }

    &:hover::before {
        transform: scaleX(1);
    }

    & .icon-wrap {
        width: 56px;
        height: 56px;
        border-radius: 14px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: ${({ $accent }) => $accent};
        background-color: ${({ $accent }) => $accent}1a;
    }

    & .icon-wrap svg {
        width: 28px;
        height: 28px;
    }

    & h3 {
        font-family: var(--font-poppins);
        font-size: 21px;
        font-weight: 600;
        color: #18181b;
        margin: 0;
    }

    & p {
        font-family: var(--font-rubik);
        font-size: 15.5px;
        line-height: 1.6;
        color: #52525b;
        margin: 0;
    }
`
