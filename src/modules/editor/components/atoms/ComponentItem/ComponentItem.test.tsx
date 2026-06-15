import { render, screen } from '@testing-library/react'
import { ComponentItem } from './ComponentItem'
import { sets } from '@/sets'

describe('Atoms: ComponentItem', () => {
    it('should accept a name prop correctly', () => {
        render(<ComponentItem name={Object.keys(sets)[0]} />)

        expect(
            screen.getByText(
                sets[Object.keys(sets)[0]]?.label ?? Object.keys(sets)[0],
            ),
        ).toBeInTheDocument()
    })

    it('should render key when label not exists', () => {
        render(<ComponentItem name="test" />)

        expect(screen.getByText('test')).toBeInTheDocument()
    })
})
