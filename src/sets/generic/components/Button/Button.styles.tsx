import { NextLink } from '@/shared/components/atoms'
import styled, { css } from 'styled-components'

export const StyledButton = styled(NextLink)<{
    $variant: 'primary' | 'secondary' | 'ghost'
    $size: 'md' | 'lg'
}>`
    all: unset;
    box-sizing: border-box;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    width: fit-content;

    font-family: var(--font-poppins);
    font-weight: 600;
    letter-spacing: 0.2px;
    white-space: nowrap;

    border-radius: 12px;
    cursor: pointer;

    transition:
        transform 0.18s ease,
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0) scale(0.97);
    }

    /* Faz o ícone "seta" deslizar no hover */
    &:hover svg[data-icon='arrow'] {
        transform: translateX(4px);
    }

    & svg {
        width: 1.15em;
        height: 1.15em;
        flex-shrink: 0;
        transition: transform 0.18s ease;
    }

    /* Tamanhos */
    ${({ $size }) =>
        $size === 'lg'
            ? css`
                  padding: 16px 28px;
                  font-size: 17px;
              `
            : css`
                  padding: 12px 22px;
                  font-size: 15px;
              `}

    /* Variantes */
    ${({ $variant }) =>
        $variant === 'primary' &&
        css`
            background-color: #e55b5b;
            color: #fff;
            box-shadow: 0 8px 20px -8px rgba(229, 91, 91, 0.7);

            &:hover {
                background-color: #d44444;
                box-shadow: 0 16px 30px -10px rgba(229, 91, 91, 0.85);
            }
        `}

    ${({ $variant }) =>
        $variant === 'secondary' &&
        css`
            background-color: #fff;
            color: #b23636;
            border: 2px solid #f4a0a0;

            &:hover {
                border-color: #e55b5b;
                background-color: #fef2f2;
            }
        `}

    ${({ $variant }) =>
        $variant === 'ghost' &&
        css`
            background-color: transparent;
            color: #1a1a1a;
            border: 2px solid transparent;

            &:hover {
                background-color: #f4f4f5;
            }
        `}
`
