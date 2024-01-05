import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentTransactions = ({ tableData }) => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="h-2/5 md:h-2/4 w-full flex flex-col justify-center">
      <div className="h-1/6 text-2xl text-black font-semibold">
        <span
          className="group inline-flex items-center hover:text-blue-700 cursor-pointer"
          onClick={
            role === 3000
              ? () => navigate("/tutor/students")
              : () => navigate("/admin/transactions")
          }
        >
          Recent Transactions
        </span>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-100 uppercase bg-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Course Price
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData?.length > 0 ? (
              tableData.map((data, i) => (
                <tr
                  key={i}
                  className=" border-b bg-gray-800 dark:border-gray-700 text-white"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {data?.user?.name}
                  </th>
                  <td className="px-6 py-4">{data?.course?.courseName}</td>
                  <td className="px-6 py-4">₹ {data?.price}</td>
                </tr>
              ))
            ) : (
              <tr className=" border-b bg-gray-800 dark:border-gray-700 text-white">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  Loading Data...
                </th>
                <td className="px-6 py-4">Loading Data...</td>
                <td className="px-6 py-4">Loading Data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RecentTransactions.propTypes = {
  tableData: PropTypes.any,
};

export default RecentTransactions;
