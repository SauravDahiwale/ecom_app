import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import Header from './Header';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode : "dark",
    },
});
function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main> 
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
    
  )
}

export default Layout