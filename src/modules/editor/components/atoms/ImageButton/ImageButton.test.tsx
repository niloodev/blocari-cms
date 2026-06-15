import { render, screen } from '@testing-library/react'
import { ImageButton } from './'

describe('Atoms: ImageButton', () => {
    it('should render correctly with props', () => {
        render(
            <ImageButton
                name="Test"
                image={{
                    src: 'https://placehold.co/150.png',
                    width: 150,
                    height: 150,
                }}
            />,
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('width', '150')
        expect(screen.getByRole('img')).toHaveAttribute('height', '150')
    })

    it('should render correctly with selected prop', () => {
        render(
            <ImageButton
                name="Test"
                image={{
                    src: 'https://placehold.co/150.png',
                    width: 150,
                    height: 150,
                }}
                selected
            />,
        )

        expect(screen.getByRole('img')).toHaveClass(
            'rounded-[8px] border-primary-300 border-solid border-[2px]',
        )
    })
})
