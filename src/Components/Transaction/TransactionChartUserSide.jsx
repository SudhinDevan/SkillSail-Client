import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { SyncLoader } from "react-spinners";
import Pagination from "../Utilities/Pagination";
import { useSelector } from "react-redux";

const TransactionChartUserSide = () => {
  const { id } = useSelector((state) => state.user);
  const axiosPrivate = UseAxiosPrivate();
  const [transactions, setTransactions] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTransactionDatas, setFilterTransactionDatas] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.get("/user/transactions", {
        params: { id },
      });
      setTransactions(res.data.paymentHistory);
      setFilterTransactionDatas(res.data.paymentHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filterPaymentFunction = (val) => {
    setSearch(val);
    const filteredTransaction = transactions?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.transactionId.razorpay_payment_id.toLowerCase().includes(val);
    });

    setFilterTransactionDatas(filteredTransaction);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filterTransactionDatas?.slice(
    firstPostIndex,
    lastPostIndex
  );
  return (
    <>
      <div className="my-8">
        <div className="md:max-w-xl md:mx-auto p-3">
          <div className="relative flex border border-gray-300 items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm pl-3 text-gray-700 pr-2 placeholder:pl-5"
              type="text"
              id="search"
              onChange={(e) => {
                filterPaymentFunction(e.target.value);
              }}
              placeholder="Search TransactionId..."
            />
          </div>
        </div>
        {/* ///////////////////////////// */}
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Index
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Tutor Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Id
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {index + 1 + currentPage * postPerPage - postPerPage}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {transaction?.course?.courseName}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {transaction?.tutor?.email}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {transaction?.price}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {transaction?.transactionId?.razorpay_payment_id}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap">
                      {formatDate(transaction?.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center items-center">
              <h1 className="text-2xl p-5">
                No transactions found for the Search Keyword{" "}
                <span className="text-blue-400">&#39;{search}&#39;</span>
              </h1>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <SyncLoader
              color="#004787" // Dark blue color
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <div className="text-center justify-center p-5">
          <Pagination
            totalPosts={filterTransactionDatas?.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default TransactionChartUserSide;
