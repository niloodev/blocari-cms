import { motion } from 'motion/react'
import styled from 'styled-components'

export const StyledShowcase = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: clamp(48px, 8vw, 88px) 5vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
`

export const StyledStage = styled.div`
    position: relative;
    width: clamp(200px, 32vw, 280px);
    aspect-ratio: 1 / 1;

    /* brilho de fundo */
    &::after {
        content: '';
        position: absolute;
        inset: -20%;
        background: radial-gradient(
            circle,
            rgba(229, 91, 91, 0.18) 0%,
            rgba(229, 91, 91, 0) 70%
        );
        filter: blur(20px);
        z-index: 0;
    }
`

export const StyledBlock = styled(motion.div)<{
    $color: string
    $x: number
    $y: number
    $w: number
    $h: number
}>`
    position: absolute;
    left: ${({ $x }) => $x}%;
    top: ${({ $y }) => $y}%;
    width: ${({ $w }) => $w}%;
    height: ${({ $h }) => $h}%;
    border-radius: 14%;
    background-color: ${({ $color }) => $color};
    box-shadow: 0 18px 36px -18px rgba(184, 54, 54, 0.6);
    z-index: 1;
`

export const StyledCaption = styled(motion.p)`
    font-family: var(--font-poppins);
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 500;
    color: #18181b;
    text-align: center;
    margin: 0;
`
