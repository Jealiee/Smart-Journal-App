import { Box, TextField, Typography, Card, List, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { Fab } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"

type Entry = {
    date: string
    content: string
}

export default function JournalPage() {

    const [entries] = useState<Entry[]>([
        { date: "March 7, 2026", content: "" },
        { date: "March 6, 2026", content: "" },
        { date: "March 5, 2026", content: "" },
        { date: "March 4, 2026", content: "" },
        { date: "March 3, 2026", content: "" }
    ])

    const [search, setSearch] = useState("")
    const [selectedEntry, setSelectedEntry] = useState(entries[0])

    const filteredEntries = entries.filter((entry) =>
        entry.date.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Box sx={{ display: "flex", height: "100%", width: '100%' }}>

            {/* ENTRY LIST */}
            <Box
                sx={{
                    width: 260,
                    borderRight: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* Search */}
                <Box sx={{ p: 2 }}>
                    <TextField
                        label="Search entries"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                {/* List */}
                <List sx={{ overflowY: "auto", flexGrow: 1 }}>

                    {filteredEntries.map((entry, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedEntry.date === entry.date}
                            onClick={() => setSelectedEntry(entry)}
                        >
                            <ListItemText
                                primary={entry.date}
                                primaryTypographyProps={{
                                    fontWeight: index === 0 ? "bold" : "normal"
                                }}
                            />
                        </ListItemButton>
                    ))}

                </List>
            </Box>

            {/* Editor */}
            <Box sx={{
                flex: 7,
                p: 4,
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    {selectedEntry.date}
                </Typography>

                <Card sx={{
                    flex: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    position: 'relative'
                }}>
                    <TextField
                        multiline
                        fullWidth
                        placeholder="Write your thoughts..."
                        defaultValue={selectedEntry.content}
                        InputProps={{
                            sx: {
                                height: "100%",
                                alignItems: "stretch"
                            }
                        }}
                        sx={{
                            flex: 1,
                            "& .MuiInputBase-root": {
                                height: "100%"
                            },
                            "& textarea": {
                                height: "100% !important",
                                overflow: "auto",
                                fontSize: "1.05rem",
                                lineHeight: 1.7,
                                padding: "12px"
                            }
                        }}
                    />
                    <Fab
                        color="primary"
                        size="medium"
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            boxshadow: 3
                        }}
                    >
                        <SaveIcon />
                    </Fab>
                </Card>
            </Box>

            <Box sx={{
                flex: 3,
                borderLeft: "1px solid",
                borderColor: "divider",
                p: 3
            }}>
                <Typography variant="h6">
                    Insights
                </Typography>
            </Box>

        </Box>
    )
}