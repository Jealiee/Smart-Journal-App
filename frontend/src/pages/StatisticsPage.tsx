import {
  Box,
  Typography,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material"
import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Metric = "mood" | "sleep" | "calories" | "exercise"

const mockData = [
  { date: "Mon", mood: 7, sleep: 6, calories: 2100, exercise: 30 },
  { date: "Tue", mood: 8, sleep: 7, calories: 2200, exercise: 45 },
  { date: "Wed", mood: 6, sleep: 5, calories: 2000, exercise: 20 },
  { date: "Thu", mood: 9, sleep: 8, calories: 2300, exercise: 60 },
  { date: "Fri", mood: 7, sleep: 6, calories: 2100, exercise: 25 },
  { date: "Sat", mood: 8, sleep: 7, calories: 2400, exercise: 50 },
  { date: "Sun", mood: 6, sleep: 6, calories: 1900, exercise: 15 },
]

export default function StatisticsPage() {
  const [metric, setMetric] = useState<Metric>("mood")
  const [range, setRange] = useState("7")

  const MiniChart = ({
    dataKey,
    range,
  }: {
    dataKey: Metric
    range: string
  }) => {
    // TODO: Fix that logic eventually
    const rangeLabel = range === "7" ? "7d" : 'x'

    return (
      <Card sx={{ flex: 1 }}>
        <CardContent
          sx={{
            p: 1.2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              textTransform: "capitalize",
              mb: 0.5,
            }}
          >
            {dataKey} ({rangeLabel})
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ width: "100%", height: 110 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockData}
                  margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
                >
                  <XAxis
                    dataKey="date"
                    interval={0}
                    tick={{ fontSize: 10 }}
                    axisLine={{ strokeWidth: 1 }}
                    tickLine={false}
                  />
                  <YAxis
                    width={35}
                    tick={{ fontSize: 10 }}
                    axisLine={{ strokeWidth: 1 }}
                    tickLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box
      sx={{
        p: 2,
        height: "calc(100vh - 64px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" mb={2}>
        Statistics
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 280px) 1fr",
          gap: 2,
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box display="flex" flexDirection="column" gap={1.5}>
          <MiniChart dataKey="sleep" range="7" />
          <MiniChart dataKey="calories" range="7"/>
          <MiniChart dataKey="exercise" range="7" />
        </Box>

        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1.5,
            minWidth: 0,
          }}
        >
          <Box display="flex" gap={1.5} mb={1}>
            <Select
              size="small"
              value={metric}
              onChange={(e) => setMetric(e.target.value as Metric)}
            >
              <MenuItem value="mood">Mood</MenuItem>
              <MenuItem value="sleep">Sleep</MenuItem>
              <MenuItem value="calories">Calories</MenuItem>
              <MenuItem value="exercise">Exercise</MenuItem>
            </Select>

            <Select
              size="small"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1, height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={metric} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}