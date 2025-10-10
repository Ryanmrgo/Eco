import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import StatsOverview from '../../../components/admin/StatsOverview';
import RecentOrders from '../../../components/admin/RecentOrders';
import RecentWasteReports from '../../../components/admin/RecentWasteReports';
import UserOverview from '../../../components/admin/UserOverview';

export default function AdminDashboard() {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminHeader />
				<main className="p-6 space-y-6">
					<StatsOverview />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<RecentOrders />
						<RecentWasteReports />
					</div>
					<UserOverview />
				</main>
			</div>
		</div>
	);
}
