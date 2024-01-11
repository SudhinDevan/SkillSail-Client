import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import TransactionChartUserSide from "../../Components/Transaction/TransactionChartUserSide";

const TransactionHistory = () => {
  return (
    <>
      <UserNavbar />
      <TransactionChartUserSide />
      <Footer />
    </>
  );
};

export default TransactionHistory;
