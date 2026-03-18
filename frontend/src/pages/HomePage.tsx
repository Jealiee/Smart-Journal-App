import { Box, Card, CardContent, Typography } from "@mui/material";

const stats = [
  { label: "Entries This Week", value: 5 },
  { label: "Avg Sleep", value: "7.2h" },
  { label: "Calories", value: 2100 },
  { label: "Mood Trend", value: " " },
  { label: "Streak", value: "4d" },
];

const insights = [
  "You tend to sleep better on days you exercised.",
  "Logging meals consistently improves mood.",
];

export default function Homepage() {
  return (
    <Box
      sx={{
        width: "98%",
        maxWidth: "1600px",
        mx: "auto",
        px: 1,
        py: 3,
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
        }}
        gap={1.5}
        mb={4}
      >
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h5">{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          md: "repeat(3, 1fr)",
        }}
        gap={2}
        mb={4}
      >
        {["Sleep Trend", "Calories", "Exercise"].map((title) => (
          <Card key={title} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {title} (Past Week)
              </Typography>
              <Box
                height={160}
                bgcolor="#f5f5f5"
                borderRadius={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Graph goes here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          md: "2fr 1fr",
        }}
        gap={2}
      >
        {/* Can change later or add that to backenf */}
        <Card> 
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              AI Insights
            </Typography>
            {insights.map((tip, idx) => (
              <Typography key={idx} sx={{ mb: 1 }}>
                • {tip}
              </Typography>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Daily Prompt
            </Typography>
            <Typography>
              “What’s one thing you’re grateful for today?”
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}