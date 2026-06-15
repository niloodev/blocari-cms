import { motion } from 'motion/react'
import styled from 'styled-components'

export const StyledHero = styled.section`
    position: relative;
    width: 100%;
    padding: clamp(80px, 14vw, 160px) 5vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    background:
        radial-gradient(
            120% 90% at 50% -10%,
            #fef2f2 0%,
            #ffffff 55%,
            #ffffff 100%
        );
`

/* Glow suave atrás do conteúdo */
export const StyledGlow = styled(motion.div)`
    position: absolute;
    top: 30%;
    left: 50%;
    width: clamp(320px, 45vw, 620px);
    height: clamp(320px, 45vw, 620px);
    transform: translate(-50%, -50%);

    background: radial-gradient(
        circle,
        rgba(229, 91, 91, 0.32) 0%,
        rgba(229, 91, 91, 0) 70%
    );
    filter: blur(40px);
    z-index: 0;
    pointer-events: none;
`

/* Bloco decorativo flutuante (remete ao logo do Blocari) */
export const StyledFloatingBlock = styled(motion.div)<{
    $color: string
    $size: number
    $top: string
    $left: string
}>`
    position: absolute;
    top: ${({ $top }) => $top};
    left: ${({ $left }) => $left};
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: ${({ $size }) => $size * 0.28}px;
    background-color: ${({ $color }) => $color};
    box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.18);
    z-index: 1;
    pointer-events: none;

    @media (max-width: 768px) {
        opacity: 0.4;
    }
`

export const StyledContent = styled(motion.div)`
    position: relative;
    z-index: 5;
    max-width: 860px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`

export const StyledEyebrow = styled(motion.span)`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    padding: 8px 16px;
    border-radius: 999px;

    background-color: #fff;
    border: 1px solid #fac5c5;
    box-shadow: 0 6px 18px -10px rgba(229, 91, 91, 0.5);

    font-family: var(--font-lexend);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: #b23636;
    text-transform: uppercase;

    &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #e55b5b;
        box-shadow: 0 0 0 4px rgba(229, 91, 91, 0.18);
    }
`

export const StyledTitle = styled(motion.h1)`
    font-family: var(--font-poppins);
    font-weight: 700;
    font-size: clamp(40px, 7vw, 76px);
    line-height: 1.05;
    letter-spacing: -1.5px;
    color: #18181b;
    margin: 0;

    & span {
        color: #e55b5b;
    }
`

export const StyledSubtitle = styled(motion.p)`
    font-family: var(--font-rubik);
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.6;
    color: #52525b;
    max-width: 620px;
    margin: 0;
`

export const StyledActions = styled(motion.div)`
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
`
