const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
}

const spacing = {
  xxsmall: '0.5rem', // 8px
  xsmall: '1rem', // 16px
  small: '1.5rem', // 24px
  medium: '2rem', // 32px
  large: '2.5rem', // 40px
  xlarge: '3rem', // 48px
  xxlarge: '3.5rem', // 56px
  mlarge: '4rem', // 64px
  mxlarge: '4.5rem', // 72px
  mxxlarge: '5rem', // 80px
  xxxlarge: '5.5rem' // 88px
}

const font = {
  defaultLineHeight: '1.4',

  xxsmall: {
    size: '0.875rem' // 14px
  },
  xsmall: {
    size: '1rem' // 16px,
  },
  small: {
    size: '1.125rem', // 18px
    line: '1.7'
  },
  medium: {
    size: '1.2rem' // 19.2px
  },
  large: {
    size: '1.5rem'
  },
  xlarge: {
    size: '1.625rem'
  },
  xxlarge: {
    size: '1.75rem'
  },
  mlarge: {
    size: '2rem'
  },
  mxlarge: {
    size: '2.5rem',
    lineHeight: '1.2'
  },
  mxxlarge: {
    size: '3rem',
    lineHeight: '1.2'
  }
}

const dark = {
  name: 'dark',
  colors: {
    background: '#202020',
    text: 'rgba(255, 255, 255, 0.87)',
    primary: '#6FFB7D',
    divider: 'rgba(255, 255, 255, 0.1)',
    subText: 'rgba(255, 255, 255, 0.6)',
    subTextSub: 'rgba(255, 255, 255, 0.4)',
    backgroundDiv: 'rgba(255, 255, 255, 0.07)',
    textContent: 'rgba(255, 255, 255, 0.70)',
    bold: 'rgba(255, 255, 255, 1)'
  },
  breakpoints,
  spacing,
  font
}

export const white = {
  name: 'white',
  colors: {
    background: '#FDFDFD',
    text: 'rgba(11, 21, 50, 0.87)',
    primary: '#055E03',
    divider: 'rgba(11, 21, 50, 0.1)',
    subText: 'rgba(11, 21, 50, 0.6)',
    subTextSub: 'rgba(11, 21, 50, 0.4)',
    backgroundDiv: 'rgba(11, 21, 50, 0.07)',
    textContent: 'rgba(11, 21, 50, 0.70)',
    bold: 'rgba(11, 21, 50, 1)'
  },
  breakpoints,
  spacing,
  font
}

export default dark
