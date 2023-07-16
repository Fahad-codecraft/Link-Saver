import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import LinkPage from "./scenes/LinkPage";
import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme"
import { LinkProvider } from "./context/LinkContext";



function App() {
  const theme = useMemo(() => createTheme(themeSettings()), [])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LinkProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/link/:id"
                element={isAuth ? <LinkPage /> : <Navigate to="/" />}
              />
            </Routes>
          </LinkProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
