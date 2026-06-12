import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import {
  Globe, Users, TrendingUp, Smartphone, Monitor, Tablet,
  RefreshCw, MapPin, Clock, Eye, Activity,
} from "lucide-react";

// ─── Supabase client (anon key — read only for dashboard) ───────────────────
const SUPA_URL = "https://qkjhsiemosnwozcvzfug.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFramhzaWVtb3Nud296Y3Z6ZnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDM0NTMsImV4cCI6MjA5MzY3OTQ1M30.4YVawL7O14lCZVYAF8H35xCDuBlfG340lzc66bFtCMM";
const supabase = createClient(SUPA_URL, SUPA_ANON);

interface VisitorEvent {
  id: string;
  created_at: string;
  ip: string | null;
  country: string | null;
  country_code: string | null;
  city: string | null;
  page: string | null;
  referrer: string | null;
  device_type: string | null;
  session_id: string | null;
}

const DEVICE_COLORS = { mobile: "#FAC000", desktop: "#3b82f6", tablet: "#10b981" };
const CHART_COLORS = ["#FAC000", "#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4"];

// Country flag emoji from country code
function flagEmoji(code: string | null) {
  if (!code || code.length !== 2) return "🌍";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(code.toUpperCase().charCodeAt(0) + offset) +
         String.fromCodePoint(code.toUpperCase().charCodeAt(1) + offset);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function KpiCard({ label, value, sub, icon: Icon, color }: any) {
  return (
    <div style={{
      background: "rgba(15,15,15,0.9)",
      border: "1px solid rgba(250,192,0,0.15)",
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, color: "#71717a", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: color, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "rgba(10,10,10,0.95)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: "20px 24px",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#FAC000", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export function VisitorsDashboard() {
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("visitor_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      setEvents(data || []);
    } catch {
      // table might not exist yet
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Computed stats ──────────────────────────────────────────────────────────
  const totalVisits = events.length;
  const uniqueSessions = new Set(events.map(e => e.session_id).filter(Boolean)).size;

  // Country breakdown
  const countryCounts: Record<string, { name: string; code: string | null; count: number }> = {};
  events.forEach(e => {
    const key = e.country || "Unknown";
    if (!countryCounts[key]) countryCounts[key] = { name: key, code: e.country_code, count: 0 };
    countryCounts[key].count++;
  });
  const topCountries = Object.values(countryCounts).sort((a, b) => b.count - a.count).slice(0, 8);
  const topCountry = topCountries[0];

  // Device breakdown
  const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
  events.forEach(e => {
    const d = e.device_type || "desktop";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  });
  const deviceData = Object.entries(deviceCounts).map(([k, v]) => ({ name: k, value: v }));
  const mobilePercent = totalVisits ? Math.round((deviceCounts.mobile / totalVisits) * 100) : 0;

  // Top pages
  const pageCounts: Record<string, number> = {};
  events.forEach(e => {
    const p = e.page || "Home";
    pageCounts[p] = (pageCounts[p] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // 30-day trend
  const now = new Date();
  const dayMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }
  events.forEach(e => {
    const day = e.created_at?.slice(0, 10);
    if (day && dayMap[day] !== undefined) dayMap[day]++;
  });
  const trendData = Object.entries(dayMap).map(([date, visits]) => ({
    date: date.slice(5), // MM-DD
    visits,
  }));

  // Recent visitors
  const recent = events.slice(0, 50);

  if (loading && events.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#71717a" }}>
        <div style={{ textAlign: "center" }}>
          <Activity size={32} style={{ color: "#FAC000", margin: "0 auto 12px" }} />
          <div>Loading visitor data...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 40px", fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Website Visitors</h2>
          <p style={{ color: "#71717a", fontSize: 12, margin: "4px 0 0" }}>
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(250,192,0,0.1)", border: "1px solid rgba(250,192,0,0.3)",
            color: "#FAC000", borderRadius: 8, padding: "8px 14px", cursor: "pointer",
            fontSize: 12, fontWeight: 700,
          }}
        >
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          Refresh
        </button>
      </div>

      {/* Setup notice if no data */}
      {events.length === 0 && !loading && (
        <div style={{
          background: "rgba(250,192,0,0.06)", border: "1px solid rgba(250,192,0,0.2)",
          borderRadius: 10, padding: "20px 24px", marginBottom: 24, color: "#a1a1aa", fontSize: 13,
        }}>
          <strong style={{ color: "#FAC000" }}>⚠ No visitor data yet.</strong>{" "}
          Make sure the <code style={{ color: "#FAC000" }}>visitor_events</code> table has been created in Supabase and the tracking script is active.
          Visitor data will appear here as soon as visitors land on the site.
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        <KpiCard label="Total Visits" value={totalVisits.toLocaleString()} icon={Eye} color="#FAC000" sub="All time" />
        <KpiCard label="Unique Sessions" value={uniqueSessions.toLocaleString()} icon={Users} color="#3b82f6" sub="Unique visitors" />
        <KpiCard label="Top Country" value={topCountry ? `${flagEmoji(topCountry.code)} ${topCountry.name}` : "—"} icon={Globe} color="#10b981" sub={topCountry ? `${topCountry.count} visits` : ""} />
        <KpiCard label="Mobile Traffic" value={`${mobilePercent}%`} icon={Smartphone} color="#8b5cf6" sub="of all visits" />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 16 }}>
        {/* 30-day trend */}
        <SectionCard title="30-Day Trend">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FAC000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FAC000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: "#52525b", fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fill: "#52525b", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#0a0a0a", border: "1px solid #FAC000", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#FAC000" }}
                itemStyle={{ color: "#fff" }}
              />
              <Area type="monotone" dataKey="visits" stroke="#FAC000" strokeWidth={2} fill="url(#visGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Device Breakdown */}
        <SectionCard title="Devices">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {deviceData.map((entry) => (
                  <Cell key={entry.name} fill={(DEVICE_COLORS as any)[entry.name] || "#71717a"} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #333", borderRadius: 8, fontSize: 12 }} />
              <Legend
                formatter={(value) => <span style={{ color: "#a1a1aa", fontSize: 11, textTransform: "capitalize" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Top Countries */}
        <SectionCard title="Top Countries">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topCountries} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" tick={{ fill: "#52525b", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={90}
                tickFormatter={(v) => v.length > 12 ? v.slice(0, 11) + "…" : v}
              />
              <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #333", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {topCountries.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Top Pages */}
        <SectionCard title="Top Pages">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topPages.length === 0 && <div style={{ color: "#52525b", fontSize: 12 }}>No data yet</div>}
            {topPages.map(([page, count], i) => (
              <div key={page} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, background: `${CHART_COLORS[i % CHART_COLORS.length]}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, color: CHART_COLORS[i % CHART_COLORS.length], flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "#d4d4d8", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{page}</div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginTop: 4 }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      background: CHART_COLORS[i % CHART_COLORS.length],
                      width: `${Math.round((count / (topPages[0][1] || 1)) * 100)}%`,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#71717a", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{count}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Recent Visitors Table */}
      <SectionCard title={`Recent Visitors (last ${Math.min(recent.length, 50)})`}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["When", "Country", "City", "Page", "Device", "IP"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: "#52525b", fontWeight: 700, textTransform: "uppercase", fontSize: 10, letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "#52525b" }}>No visitors recorded yet</td>
                </tr>
              ) : recent.map(e => (
                <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "8px 10px", color: "#71717a", whiteSpace: "nowrap" }}>{timeAgo(e.created_at)}</td>
                  <td style={{ padding: "8px 10px", color: "#d4d4d8" }}>
                    {flagEmoji(e.country_code)} {e.country || "—"}
                  </td>
                  <td style={{ padding: "8px 10px", color: "#71717a" }}>{e.city || "—"}</td>
                  <td style={{ padding: "8px 10px", color: "#a1a1aa", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.page || "Home"}
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      padding: "2px 8px", borderRadius: 4, fontSize: 11,
                      background: e.device_type === "mobile" ? "rgba(250,192,0,0.1)" : e.device_type === "tablet" ? "rgba(16,185,129,0.1)" : "rgba(59,130,246,0.1)",
                      color: e.device_type === "mobile" ? "#FAC000" : e.device_type === "tablet" ? "#10b981" : "#60a5fa",
                      textTransform: "capitalize",
                    }}>
                      {e.device_type === "mobile" ? <Smartphone size={10} /> : e.device_type === "tablet" ? <Tablet size={10} /> : <Monitor size={10} />}
                      {e.device_type || "desktop"}
                    </span>
                  </td>
                  <td style={{ padding: "8px 10px", color: "#52525b", fontFamily: "monospace" }}>{e.ip || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
