import SellerRequests from "../SellerRequests";

export default function AdminDashboard() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h3">Admin Dashboard</h1>
        <p className="text-muted">Manage seller requests and monitor activities</p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <SellerRequests />
      </div>
    </div>
  );
}
