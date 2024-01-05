import DashboardCardSection from "../../Components/Teachers/DashboardCardSection";
import DashboardTextContent from "../../Components/Teachers/DashboardTextContent";
import RecentTransactions from "../../Components/Teachers/RecentTransactions";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useEffect, useState } from "react";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Footer from "../../Components/Navbar/Footer";

const AdminDashboard = () => {
  const axiosInstance = UseAxiosPrivate();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/dashboardData");
      console.log(response.data);
      setData(response.data);
      setTableData(response.data.tableData);
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="w-full h-screen bg-gray-200 p-5 md:p-8  flex flex-col gap-0 md:gap-8">
        <DashboardTextContent text="Admin" />
        <DashboardCardSection data={data} />
        <RecentTransactions tableData={tableData} />
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
