import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

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
    <Box p={3}>
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        mb={4}
      >
        {stats.map((stat) => (
          <Card key={stat.label} sx={{ flex: '1 1 18%', minWidth: 140 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {stat.label}
              </Typography>
              <Typography variant="h5">{stat.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sleep Trend (Past Week)
              </Typography>
              <Box
                height={150}
                bgcolor="#f0f0f0"
                borderRadius={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color="textSecondary">Graph goes here</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Calories / Macros (Past Week)
              </Typography>
              <Box
                height={150}
                bgcolor="#f0f0f0"
                borderRadius={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color="textSecondary">Graph goes here</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
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
        </Grid>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Daily Prompt
              </Typography>
              <Typography>“What’s one thing you’re grateful for today?”</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}