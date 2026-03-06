import { Box, Typography, useTheme } from "@mui/material"
import EditNoteIcon from "@mui/icons-material/EditNote"
import ChecklistIcon from "@mui/icons-material/Checklist"
import BarChartIcon from "@mui/icons-material/BarChart"
import PersonIcon from "@mui/icons-material/Person"
import FeedbackIcon from "@mui/icons-material/Feedback"
import HomeIcon from "@mui/icons-material/Home"
import { useState } from "react"

function Sidebar() {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)
    const mode = theme.palette.mode

    const items = [
        { label: 'Homepage', icon: <HomeIcon /> },
        { label: "Journal", icon: <EditNoteIcon /> },
        { label: "Habits", icon: <ChecklistIcon /> },
        { label: "Statistics", icon: <BarChartIcon /> },
        { label: "Account", icon: <PersonIcon /> },
    ]

    return (
        <Box
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            sx={{
                width: isExpanded ? 220 : 80,
                bgcolor: theme.layout.sidebar.bg,
                py: 4,
                px: isExpanded ? 3 : 0,
                display: "flex",
                flexDirection: "column",
                alignItems: isExpanded ? "flex-start" : "center",
                gap: 3,
                borderRight: "1px solid rgba(0,0,0,0.25)",
                transition: "width 0.3s ease, padding 0.3s ease, align-items 0.3s ease",
            }}
        >
            {items.map((item) => (
                <Box
                    key={item.label}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        justifyContent: isExpanded ? "flex-start" : "center",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        "&:hover": {
                            bgcolor:
                                mode === "light"
                                    ? "rgba(122,158,126,0.18)"
                                    : "rgba(160,214,180,0.18)",
                            transform: "translateX(2px)",
                        },
                    }}
                >
                    {item.icon}
                    {isExpanded && (
                        <Typography
                            sx={{
                                ml: 1,
                                fontSize: 15,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                            }}
                        >
                            {item.label}
                        </Typography>
                    )}
                </Box>
            ))}

            <Box sx={{ mt: "auto", mb: 2, width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isExpanded ? "flex-start" : "center",
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "rgba(79,111,82,0.25)" },
                    }}
                >
                    <FeedbackIcon />
                    {isExpanded && (
                        <Typography sx={{ ml: 2, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden" }}>
                            Give Feedback
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar