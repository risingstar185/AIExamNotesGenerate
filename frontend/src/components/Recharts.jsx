import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFF",
  "#FF6699",
  "#33CCFF",
  "#FF4444"
];

const Recharts = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <div key={index}>
          <h4 className="font-semibold mb-2">{chart.title}</h4>

          <ResponsiveContainer width="100%" height={300}>
            <>
              {/* BAR CHART */}
              {chart.type === "bar" && (
                <BarChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE CHART */}
              {chart.type === "line" && (
                <LineChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {/* PIE CHART */}
              {chart.type === "pie" && (
                <PieChart>
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default Recharts;
