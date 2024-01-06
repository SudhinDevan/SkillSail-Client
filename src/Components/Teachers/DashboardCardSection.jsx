import { FaRedhat, FaUser } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { TbBooks } from "react-icons/tb";
import DashboardCard from "./DashboardCard";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardCardSection = ({ data }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  return (
    <div className="h-2/5 md:h-1/4 w-full flex flex-col md:flex-row justify-between gap-5 md:gap-0">
      <DashboardCard
        className={"hover:-translate-y-2 duration-300"}
        onClick={
          role === 3000
            ? () => navigate("/tutor/students")
            : () => navigate("/admin/users")
        }
        text="Total Enrollments"
        value={data ? data?.studentCount : "loading..."}
        Icon={<FaUser color="white" className="text-xl md:text-veryLarge" />}
      />
      <DashboardCard
        className={"hover:-translate-y-2 duration-300"}
        onClick={
          role === 3000
            ? () => navigate("/tutor/runningCourse")
            : () => navigate("/admin/courses")
        }
        text="Total Course"
        value={data ? data?.courseCount : "loading..."}
        Icon={<TbBooks color="white" className="text-xl md:text-veryLarge" />}
      />
      <DashboardCard
        className={"hover:-translate-y-2 duration-300"}
        onClick={role === 3000 && (() => navigate("/tutor/publicCourses"))}
        text="Public Course"
        value={data ? data?.publicCourseCount : "loading..."}
        Icon={<FaRedhat color="white" className="text-xl md:text-veryLarge" />}
      />
      <DashboardCard
        className={"hover:-translate-y-2 duration-300"}
        onClick={
          role === 3000
            ? () => navigate("/tutor/students")
            : () => navigate("/admin/transactions")
        }
        text="Total revenue"
        value={data ? `₹ ${Math.floor(data?.totalRevenue * 0.9)}` : "loading..."}
        Icon={<GoTrophy color="white" className="text-xl md:text-veryLarge" />}
      />
    </div>
  );
};

DashboardCardSection.propTypes = {
  data: PropTypes.any,
};

export default DashboardCardSection;
