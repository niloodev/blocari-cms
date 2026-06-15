import { render, screen } from '@testing-library/react'
import { TypographyProperties } from './TypographyProperties'

vi.mock('@/modules/editor/fields', async importOriginal => {
    const actual =
        await importOriginal<typeof import('@/modules/editor/fields')>()
    return {
        ...actual,
        FieldText: () => <input type="text" placeholder="Nome" />,
        FieldFiles: () => <input type="file" placeholder="Arquivos" />,
    }
})

describe('Properties: TypographyProperties', () => {
    it('should render correctly', () => {
        render(<TypographyProperties />)

        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Arquivos')).toBeInTheDocument()
    })
})
