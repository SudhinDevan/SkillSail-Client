import DashboardCardSection from "./DashboardCardSection";
import DashboardTextContent from "./DashboardTextContent";
import RecentTransactions from "./RecentTransactions";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TeacherHome = () => {
  const axiosInstance = UseAxiosPrivate();
  const { id } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/tutor/dashboardData", {
        params: { id },
      });
      setData(response.data);
      setTableData(response.data.tableData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-full bg-gray-200 p-5 md:p-8  flex flex-col gap-0 md:gap-8">
        <DashboardTextContent text="teacher" />
        <DashboardCardSection data={data} />
        <RecentTransactions tableData={tableData} />
      </div>
    </>
  );
};

export default TeacherHome;
