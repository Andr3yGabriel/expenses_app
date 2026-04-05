// src/App.tsx
import { useState } from 'react'
import { Box, CssBaseline, Drawer, List, ListItemButton,
         ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, Tooltip, ThemeProvider } from '@mui/material'
import PeopleIcon      from '@mui/icons-material/People'
import CategoryIcon    from '@mui/icons-material/Category'
import ReceiptIcon     from '@mui/icons-material/Receipt'
import BarChartIcon    from '@mui/icons-material/BarChart'
import LightModeIcon   from '@mui/icons-material/LightMode'
import DarkModeIcon    from '@mui/icons-material/DarkMode'
import PersonsPage     from './pages/Persons/PersonsPage'
import CategoriesPage  from './pages/Categories/CategoriesPage'
import TransactionsPage from './pages/Transactions/TransactionsPage'
import TotalsPage      from './pages/Totals/TotalsPage'
import { useAppTheme } from './theme/useAppTheme'

const DRAWER_WIDTH = 240

const navItems = [
  { label: 'Pessoas',     icon: <PeopleIcon />,   page: 'persons'      },
  { label: 'Categorias',  icon: <CategoryIcon />, page: 'categories'   },
  { label: 'Transações',  icon: <ReceiptIcon />,  page: 'transactions' },
  { label: 'Totais',      icon: <BarChartIcon />, page: 'totals'       },
] as const

type Page = typeof navItems[number]['page']

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('persons')
  const { theme, mode, toggleMode } = useAppTheme()

  const renderPage = () => {
    switch (currentPage) {
      case 'persons':      return <PersonsPage />
      case 'categories':   return <CategoriesPage />
      case 'transactions': return <TransactionsPage />
      case 'totals':       return <TotalsPage />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex">
        <CssBaseline />

        {/* Topbar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar className='flex justify-between'>
            <Typography variant="h6" noWrap>
              Controle de Gastos Residenciais
            </Typography>

            <Tooltip title={mode === 'light' ? 'Modo escuro' : 'Modo claro'}>
              <IconButton color="inherit" onClick={toggleMode}>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
        >
          <Toolbar /> {/* empurra o conteúdo para baixo da AppBar */}
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.page}
                selected={currentPage === item.page}
                onClick={() => setCurrentPage(item.page)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        {/* Conteúdo principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* espaço para a AppBar */}
          {renderPage()}
        </Box>
      </Box>
    </ThemeProvider>
  )
}