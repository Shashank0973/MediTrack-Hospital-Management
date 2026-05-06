import { useState, useEffect } from "react";

const COLORS = {
  primary: "#0a6e6e",
  primaryLight: "#e6f4f4",
  primaryDark: "#084f4f",
  accent: "#f0a500",
  accentLight: "#fff8e6",
  danger: "#d93025",
  dangerLight: "#fce8e6",
  success: "#1a7a45",
  successLight: "#e6f4ed",
  warning: "#f59e0b",
  warningLight: "#fffbeb",
  bg: "#f4f7f9",
  card: "#ffffff",
  text: "#1a2332",
  textMuted: "#6b7a8d",
  border: "#e2e8f0",
  sidebar: "#0d1f2d",
  sidebarText: "#a8b9cb",
  sidebarActive: "#1a3a4a",
};

const MOCK = {
  stats: [
    { label: "Total Patients", value: "2,847", icon: "👥", change: "+12%", up: true, color: COLORS.primary },
    { label: "Appointments Today", value: "134", icon: "📅", change: "+8%", up: true, color: COLORS.accent },
    { label: "Available Doctors", value: "48", icon: "🩺", change: "-3%", up: false, color: COLORS.success },
    { label: "Pending Reports", value: "23", icon: "📋", change: "+5%", up: true, color: COLORS.danger },
  ],
  appointments: [
    { id: "APT-001", patient: "Ravi Sharma", doctor: "Dr. Priya Nair", dept: "Cardiology", time: "09:00 AM", status: "confirmed", date: "Today" },
    { id: "APT-002", patient: "Anita Verma", doctor: "Dr. Suresh Mehta", dept: "Neurology", time: "10:30 AM", status: "pending", date: "Today" },
    { id: "APT-003", patient: "Mohit Joshi", doctor: "Dr. Kavya Reddy", dept: "Orthopedics", time: "11:00 AM", status: "confirmed", date: "Today" },
    { id: "APT-004", patient: "Sita Devi", doctor: "Dr. Arjun Pillai", dept: "Gynecology", time: "12:15 PM", status: "cancelled", date: "Today" },
    { id: "APT-005", patient: "Deepak Kumar", doctor: "Dr. Priya Nair", dept: "Cardiology", time: "02:00 PM", status: "confirmed", date: "Today" },
    { id: "APT-006", patient: "Meena Iyer", doctor: "Dr. Suresh Mehta", dept: "Neurology", time: "03:30 PM", status: "pending", date: "Today" },
    { id: "APT-007", patient: "Rajesh Gupta", doctor: "Dr. Kavya Reddy", dept: "Orthopedics", time: "04:00 PM", status: "confirmed", date: "Tomorrow" },
    { id: "APT-008", patient: "Pooja Singh", doctor: "Dr. Arjun Pillai", dept: "Gynecology", time: "09:30 AM", status: "pending", date: "Tomorrow" },
  ],
  doctors: [
    { id: "D-001", name: "Dr. Priya Nair", dept: "Cardiology", patients: 142, experience: "12 yrs", status: "available", rating: 4.9, avatar: "PN" },
    { id: "D-002", name: "Dr. Suresh Mehta", dept: "Neurology", patients: 98, experience: "8 yrs", status: "in-surgery", rating: 4.7, avatar: "SM" },
    { id: "D-003", name: "Dr. Kavya Reddy", dept: "Orthopedics", patients: 176, experience: "15 yrs", status: "available", rating: 4.8, avatar: "KR" },
    { id: "D-004", name: "Dr. Arjun Pillai", dept: "Gynecology", patients: 211, experience: "18 yrs", status: "on-leave", rating: 4.6, avatar: "AP" },
    { id: "D-005", name: "Dr. Neha Kulkarni", dept: "Pediatrics", patients: 89, experience: "6 yrs", status: "available", rating: 4.5, avatar: "NK" },
    { id: "D-006", name: "Dr. Vikram Singh", dept: "Dermatology", patients: 134, experience: "10 yrs", status: "available", rating: 4.8, avatar: "VS" },
  ],
  patients: [
    { id: "P-001", name: "Ravi Sharma", age: 45, blood: "B+", dept: "Cardiology", doctor: "Dr. Priya Nair", status: "admitted", date: "12 Apr 2026" },
    { id: "P-002", name: "Anita Verma", age: 32, blood: "A-", dept: "Neurology", doctor: "Dr. Suresh Mehta", status: "outpatient", date: "14 Apr 2026" },
    { id: "P-003", name: "Mohit Joshi", age: 58, blood: "O+", dept: "Orthopedics", doctor: "Dr. Kavya Reddy", status: "discharged", date: "10 Apr 2026" },
    { id: "P-004", name: "Sita Devi", age: 28, blood: "AB+", dept: "Gynecology", doctor: "Dr. Arjun Pillai", status: "admitted", date: "15 Apr 2026" },
    { id: "P-005", name: "Deepak Kumar", age: 67, blood: "B-", dept: "Cardiology", doctor: "Dr. Priya Nair", status: "critical", date: "16 Apr 2026" },
    { id: "P-006", name: "Meena Iyer", age: 41, blood: "A+", dept: "Neurology", doctor: "Dr. Suresh Mehta", status: "outpatient", date: "13 Apr 2026" },
  ],
  departments: [
    { name: "Cardiology", head: "Dr. Priya Nair", doctors: 8, patients: 142, beds: 30, occupied: 24 },
    { name: "Neurology", head: "Dr. Suresh Mehta", doctors: 6, patients: 98, beds: 20, occupied: 14 },
    { name: "Orthopedics", head: "Dr. Kavya Reddy", doctors: 10, patients: 176, beds: 40, occupied: 35 },
    { name: "Gynecology", head: "Dr. Arjun Pillai", doctors: 7, patients: 211, beds: 25, occupied: 20 },
    { name: "Pediatrics", head: "Dr. Neha Kulkarni", doctors: 9, patients: 89, beds: 35, occupied: 22 },
    { name: "Dermatology", head: "Dr. Vikram Singh", doctors: 5, patients: 134, beds: 15, occupied: 8 },
  ],
};

const NAV = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "appointments", icon: "📅", label: "Appointments" },
  { id: "doctors", icon: "🩺", label: "Doctors" },
  { id: "patients", icon: "👥", label: "Patients" },
  { id: "departments", icon: "🏥", label: "Departments" },
  { id: "messages", icon: "💬", label: "Messages" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const Badge = ({ status }) => {
  const map = {
    confirmed: { bg: "#e6f4ed", color: "#1a7a45", label: "Confirmed" },
    pending: { bg: "#fffbeb", color: "#b45309", label: "Pending" },
    cancelled: { bg: "#fce8e6", color: "#d93025", label: "Cancelled" },
    available: { bg: "#e6f4ed", color: "#1a7a45", label: "Available" },
    "in-surgery": { bg: "#fce8e6", color: "#d93025", label: "In Surgery" },
    "on-leave": { bg: "#f3f4f6", color: "#6b7280", label: "On Leave" },
    admitted: { bg: "#e6f0ff", color: "#1d4ed8", label: "Admitted" },
    outpatient: { bg: "#e6f4ed", color: "#1a7a45", label: "Outpatient" },
    discharged: { bg: "#f3f4f6", color: "#6b7280", label: "Discharged" },
    critical: { bg: "#fce8e6", color: "#d93025", label: "Critical" },
  };
  const s = map[status] || { bg: "#f3f4f6", color: "#6b7280", label: status };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 0.2 }}>
      {s.label}
    </span>
  );
};

const Avatar = ({ initials, color = COLORS.primary, size = 36 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0 }}>
    {initials}
  </div>
);

const StatCard = ({ label, value, icon, change, up, color }) => (
  <div style={{ background: COLORS.card, borderRadius: 14, padding: "20px 22px", border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: up ? COLORS.success : COLORS.danger, background: up ? COLORS.successLight : COLORS.dangerLight, padding: "2px 8px", borderRadius: 999 }}>
        {change}
      </span>
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text }}>{value}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{label}</div>
    </div>
    <div style={{ height: 3, borderRadius: 2, background: COLORS.border }}>
      <div style={{ height: 3, borderRadius: 2, background: color, width: "65%" }} />
    </div>
  </div>
);

// Mini bar chart for dashboard
const MiniChart = ({ label }) => {
  const bars = [40, 65, 52, 78, 60, 88, 73, 55, 90, 68, 82, 95];
  return (
    <div style={{ background: COLORS.card, borderRadius: 14, padding: "20px 22px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 14, marginBottom: 4 }}>{label}</div>
      <div style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 16 }}>Monthly patient admissions</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 80 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: "100%", height: h * 0.75, background: i === bars.length - 1 ? COLORS.primary : COLORS.primaryLight, borderRadius: "3px 3px 0 0", transition: "all 0.3s" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
          <span key={i} style={{ fontSize: 10, color: COLORS.textMuted }}>{m}</span>
        ))}
      </div>
    </div>
  );
};

const DeptBedUsage = ({ dept, occupied, beds }) => {
  const pct = Math.round((occupied / beds) * 100);
  const color = pct > 80 ? COLORS.danger : pct > 60 ? COLORS.warning : COLORS.success;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ width: 100, fontSize: 12, color: COLORS.text, fontWeight: 500 }}>{dept}</div>
      <div style={{ flex: 1, height: 6, background: COLORS.border, borderRadius: 3 }}>
        <div style={{ width: `${pct}%`, height: 6, background: color, borderRadius: 3 }} />
      </div>
      <div style={{ width: 50, textAlign: "right", fontSize: 12, color: COLORS.textMuted }}>{occupied}/{beds}</div>
      <div style={{ width: 36, textAlign: "right", fontSize: 11, fontWeight: 700, color }}>{pct}%</div>
    </div>
  );
};

// ─── VIEWS ──────────────────────────────────────────────────────────────────

function DashboardView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome */}
      <div style={{ background: `linear-gradient(120deg, ${COLORS.primaryDark}, ${COLORS.primary})`, borderRadius: 16, padding: "22px 28px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Good morning, Admin 👋</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>MediCare Hospital Management System — April 26, 2026</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>System Status</div>
          <span style={{ background: "#22c55e33", color: "#86efac", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>● All Systems Operational</span>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {MOCK.stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        <MiniChart label="Patient Admissions" />
        <div style={{ background: COLORS.card, borderRadius: 14, padding: "20px 22px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 14, marginBottom: 4 }}>Bed Occupancy</div>
          <div style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 14 }}>By department</div>
          {MOCK.departments.map((d, i) => (
            <DeptBedUsage key={i} dept={d.name.slice(0, 8)} occupied={d.occupied} beds={d.beds} />
          ))}
        </div>
      </div>

      {/* Recent appointments */}
      <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 600, color: COLORS.text }}>Today's Appointments</div>
          <span style={{ fontSize: 12, color: COLORS.primary, cursor: "pointer", fontWeight: 500 }}>View All →</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Patient", "Doctor", "Department", "Time", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK.appointments.slice(0, 5).map((a, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: COLORS.text }}>{a.patient}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.textMuted }}>{a.doctor}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.textMuted }}>{a.dept}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.textMuted }}>{a.time}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsView() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = MOCK.appointments.filter(a =>
    (filter === "all" || a.status === filter) &&
    (a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Appointments</div>
        <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ New Appointment</button>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          placeholder="Search patient or doctor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", color: COLORS.text }}
        />
        {["all", "confirmed", "pending", "cancelled"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${filter === f ? COLORS.primary : COLORS.border}`, background: filter === f ? COLORS.primaryLight : "#fff", color: filter === f ? COLORS.primary : COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["ID", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.textMuted, fontFamily: "monospace" }}>{a.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500, color: COLORS.text }}>{a.patient}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{a.doctor}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{a.dept}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{a.date}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{a.time}</td>
                <td style={{ padding: "12px 14px" }}><Badge status={a.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", fontSize: 11, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", color: COLORS.textMuted }}>Edit</button>
                    <button style={{ padding: "4px 10px", fontSize: 11, borderRadius: 6, border: `1px solid ${COLORS.dangerLight}`, background: COLORS.dangerLight, cursor: "pointer", color: COLORS.danger }}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No appointments found</div>
        )}
      </div>
    </div>
  );
}

function DoctorsView() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", dept: "", experience: "", email: "" });

  const filtered = MOCK.doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.dept.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = { available: COLORS.success, "in-surgery": COLORS.danger, "on-leave": "#9ca3af" };
  const deptColors = { Cardiology: "#6366f1", Neurology: "#8b5cf6", Orthopedics: "#0891b2", Gynecology: "#db2777", Pediatrics: "#16a34a", Dermatology: "#d97706" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Doctors</div>
        <button onClick={() => setShowAdd(true)} style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Doctor</button>
      </div>

      {showAdd && (
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 16 }}>Add New Doctor</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Full Name", "name"], ["Department", "dept"], ["Experience (yrs)", "experience"], ["Email", "email"]].map(([label, key]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: COLORS.textMuted, display: "block", marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Doctor</button>
            <button onClick={() => setShowAdd(false)} style={{ background: "#fff", color: COLORS.textMuted, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <input placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)}
        style={{ padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", color: COLORS.text, width: 280 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((d, i) => (
          <div key={i} style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={d.avatar} color={deptColors[d.dept] || COLORS.primary} size={44} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.dept}</div>
                </div>
              </div>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor[d.status] || "#9ca3af", marginTop: 4 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["Patients", d.patients], ["Experience", d.experience]].map(([k, v]) => (
                <div key={k} style={{ background: COLORS.bg, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: COLORS.textMuted }}>⭐ {d.rating}</span>
              <Badge status={d.status} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1px solid ${COLORS.primary}`, background: COLORS.primaryLight, color: COLORS.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Profile</button>
              <button style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "#fff", color: COLORS.textMuted, fontSize: 12, cursor: "pointer" }}>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientsView() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const filtered = MOCK.patients.filter(p =>
    (filterStatus === "all" || p.status === filterStatus) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const bloodColors = { "A+": "#6366f1", "A-": "#8b5cf6", "B+": "#0891b2", "B-": "#db2777", "O+": "#16a34a", "O-": "#d97706", "AB+": "#ef4444", "AB-": "#6b7280" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Patients</div>
        <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Register Patient</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none" }} />
        {["all", "admitted", "outpatient", "discharged", "critical"].map(f => (
          <button key={f} onClick={() => setFilterStatus(f)} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${filterStatus === f ? COLORS.primary : COLORS.border}`, background: filterStatus === f ? COLORS.primaryLight : "#fff", color: filterStatus === f ? COLORS.primary : COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
        ))}
      </div>
      <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["ID", "Patient", "Age", "Blood", "Department", "Doctor", "Admitted", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.textMuted, fontFamily: "monospace" }}>{p.id}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={p.name.split(" ").map(n => n[0]).join("")} color={COLORS.primary} size={30} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{p.age}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: (bloodColors[p.blood] || "#6b7280") + "18", color: bloodColors[p.blood] || "#6b7280", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{p.blood}</span>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{p.dept}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.textMuted }}>{p.doctor}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.textMuted }}>{p.date}</td>
                <td style={{ padding: "12px 14px" }}><Badge status={p.status} /></td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", fontSize: 11, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", color: COLORS.textMuted }}>View</button>
                    <button style={{ padding: "4px 10px", fontSize: 11, borderRadius: 6, border: `1px solid ${COLORS.primaryLight}`, background: COLORS.primaryLight, cursor: "pointer", color: COLORS.primary }}>Report</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DepartmentsView() {
  const deptIcons = { Cardiology: "❤️", Neurology: "🧠", Orthopedics: "🦴", Gynecology: "🏥", Pediatrics: "👶", Dermatology: "🧴" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Departments</div>
        <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Department</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {MOCK.departments.map((d, i) => {
          const pct = Math.round((d.occupied / d.beds) * 100);
          const barColor = pct > 80 ? COLORS.danger : pct > 60 ? COLORS.warning : COLORS.success;
          return (
            <div key={i} style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{deptIcons[d.name]}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{d.head}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[["Doctors", d.doctors], ["Patients", d.patients], ["Beds", d.beds]].map(([k, v]) => (
                  <div key={k} style={{ background: COLORS.bg, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{v}</div>
                    <div style={{ fontSize: 10, color: COLORS.textMuted }}>{k}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>
                  <span>Bed Occupancy</span>
                  <span style={{ fontWeight: 600, color: barColor }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: COLORS.border, borderRadius: 3 }}>
                  <div style={{ width: `${pct}%`, height: 6, background: barColor, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{d.occupied} / {d.beds} beds occupied</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessagesView() {
  const messages = [
    { from: "Dr. Priya Nair", msg: "Please update the appointment slots for next week.", time: "10:30 AM", unread: true },
    { from: "Dr. Suresh Mehta", msg: "Patient Anita Verma needs to be rescheduled.", time: "09:45 AM", unread: true },
    { from: "Reception", msg: "3 new walk-in patients registered today.", time: "08:20 AM", unread: false },
    { from: "Lab Department", msg: "Blood test reports are ready for Deepak Kumar.", time: "Yesterday", unread: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Messages</div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 14, height: 500 }}>
        <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ padding: "14px 16px", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer", background: i === 0 ? COLORS.primaryLight : "transparent" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: COLORS.text }}>{m.from}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.msg}</div>
              {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, marginTop: 4 }} />}
            </div>
          ))}
        </div>
        <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 4 }}>Dr. Priya Nair</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 24 }}>Cardiology Department</div>
            <div style={{ background: COLORS.primaryLight, borderRadius: 12, padding: "12px 16px", fontSize: 13, color: COLORS.text, maxWidth: "80%", marginBottom: 12 }}>
              Please update the appointment slots for next week.
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ background: COLORS.bg, borderRadius: 12, padding: "12px 16px", fontSize: 13, color: COLORS.text, display: "inline-block" }}>
                Done. Slots have been updated for next week. Let me know if any changes are needed.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none" }} />
            <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const [settings, setSettings] = useState({ hospitalName: "MediCare Hospital", email: "admin@medicare.com", phone: "+91-9876543210", address: "123 Health Avenue, Varanasi, UP", timezone: "Asia/Kolkata", notifications: true, darkMode: false, twoFactor: true });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>Settings</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text, marginBottom: 16 }}>Hospital Information</div>
          {[["Hospital Name", "hospitalName"], ["Admin Email", "email"], ["Phone", "phone"], ["Address", "address"]].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: COLORS.textMuted, display: "block", marginBottom: 4 }}>{label}</label>
              <input value={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Save Changes</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text, marginBottom: 16 }}>Preferences</div>
            {[["Email Notifications", "notifications"], ["Dark Mode", "darkMode"], ["Two-Factor Auth", "twoFactor"]].map(([label, key]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ fontSize: 13, color: COLORS.text }}>{label}</span>
                <div onClick={() => setSettings({ ...settings, [key]: !settings[key] })}
                  style={{ width: 40, height: 22, borderRadius: 11, background: settings[key] ? COLORS.primary : COLORS.border, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                  <div style={{ position: "absolute", top: 2, left: settings[key] ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.border}`, padding: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text, marginBottom: 4 }}>System Info</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 14 }}>MediCare HMS v2.0.0</div>
            {[["Last Backup", "Today, 3:00 AM"], ["Database", "MongoDB v7.0"], ["Server", "Node.js v22.x"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12 }}>
                <span style={{ color: COLORS.textMuted }}>{k}</span>
                <span style={{ color: COLORS.text, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function HospitalAdmin() {
  const [active, setActive] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);

  const views = { dashboard: <DashboardView />, appointments: <AppointmentsView />, doctors: <DoctorsView />, patients: <PatientsView />, departments: <DepartmentsView />, messages: <MessagesView />, settings: <SettingsView /> };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: COLORS.bg, color: COLORS.text }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: COLORS.sidebar, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #1e3448" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>MediCare</div>
              <div style={{ color: COLORS.sidebarText, fontSize: 10 }}>HMS Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {NAV.map(item => (
            <div key={item.id} onClick={() => setActive(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 2, cursor: "pointer", background: active === item.id ? COLORS.sidebarActive : "transparent", color: active === item.id ? "#fff" : COLORS.sidebarText, transition: "all 0.15s" }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
              {item.id === "messages" && notifications > 0 && (
                <span style={{ marginLeft: "auto", background: COLORS.danger, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "1px 6px" }}>{notifications}</span>
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "16px 14px", borderTop: "1px solid #1e3448" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>A</div>
            <div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Admin User</div>
              <div style={{ color: COLORS.sidebarText, fontSize: 10 }}>Super Admin</div>
            </div>
            <span style={{ marginLeft: "auto", color: COLORS.sidebarText, fontSize: 14, cursor: "pointer" }}>⇥</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, textTransform: "capitalize" }}>{active}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>MediCare Hospital Management</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifications(0)}>
              <span style={{ fontSize: 20 }}>🔔</span>
              {notifications > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: COLORS.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 999, padding: "1px 4px" }}>{notifications}</span>}
            </div>
            <div style={{ width: 1, height: 24, background: COLORS.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials="A" color={COLORS.primary} size={32} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>Admin</div>
                <div style={{ fontSize: 10, color: COLORS.textMuted }}>Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {views[active]}
        </div>
      </div>
    </div>
  );
}
