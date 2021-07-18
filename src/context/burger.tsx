import { FC, createContext, useState, useContext } from 'react'

interface BurgerMenuCTX {
  openBurger: boolean
  setBurger: (value?: boolean) => void
}

const BurgerContext = createContext<BurgerMenuCTX>({} as BurgerMenuCTX)

const BurgerProvider: FC = ({ children }) => {
  const [openBurger, setBurger] = useState(false)

  return (
    <BurgerContext.Provider
      value={{
        openBurger,
        setBurger
      }}
    >
      {children}
    </BurgerContext.Provider>
  )
}

export default BurgerProvider

export function useBurger(): BurgerMenuCTX {
  const context = useContext(BurgerContext)
  if (!context)
    throw new Error('useBurger must be used within a BurgerProvider')
  const { openBurger, setBurger } = context
  return { openBurger, setBurger }
}
