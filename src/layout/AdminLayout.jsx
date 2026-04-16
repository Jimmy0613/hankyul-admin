import Sidebar from "../components/Sidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}