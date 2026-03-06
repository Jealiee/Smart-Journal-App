import { AppBar, Toolbar, Typography, Box, IconButton, useTheme } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

type TopbarProps = {
    toggleMode: () => void
}
function Topbar({ toggleMode }: TopbarProps): JSX.Element {

    const theme = useTheme()
    const isDark = theme.palette.mode === 'dark'

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: theme.layout.topbar.bg,
                color: theme.layout.topbar.text
            }}>
            <Toolbar sx={{ position: 'relative' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                    Smart Journal
                </Typography>
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                    <IconButton color='inherit'>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton color='inherit' onClick={toggleMode}>
                        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Topbar