import { render, screen } from '@testing-library/react'
import React from 'react'
import { CustomThemeProvider } from 'src/context/theme'
import Author from './index'

const renderComponent = () =>
  render(
    <CustomThemeProvider>
      <Author />
    </CustomThemeProvider>
  )

describe('<Author/>', () => {
  it('should render childrens', () => {
    renderComponent()

    const h1 = screen.getByText(/Matheus Felipe/i)
    const img = screen.getByAltText(/Imagem preto e branca do autor do blog/i)

    expect(h1).toBeInTheDocument()
    expect(img).toBeInTheDocument()
  })
})
