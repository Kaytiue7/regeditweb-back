import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Hoş Geldiniz</h2>
          <p className="text-gray-600">Regedit Web Yönetim Paneline hoş geldiniz.</p>
        </div>
      </div>
    </div>
  );
}
