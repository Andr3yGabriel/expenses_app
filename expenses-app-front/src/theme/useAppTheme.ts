import { useState, useMemo, useEffect } from 'react'
import { createTheme } from '@mui/material'

// Recupera o tema salvo no localStorage ou usa 'light' como padrão
const getStoredMode = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('themeMode')
  return stored === 'dark' ? 'dark' : 'light'
}

export function useAppTheme() {
  const [mode, setMode] = useState<'light' | 'dark'>(getStoredMode)

  // Persiste a preferência do usuário sempre que o modo mudar
  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  // Recria o tema apenas quando o modo muda — evita re-renders desnecessários
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            background: {
              default: '#121212',
              paper:   '#1e1e1e',
            },
          }),
        },
      }),
    [mode]
  )

  return { theme, mode, toggleMode }
}