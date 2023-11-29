import DashboardCardSection from "./DashboardCardSection"
import DashboardTextContent from "./DashboardTextContent"
import RecentTransactions from "./RecentTransactions"

const TeacherHome = () => {
    return (
    //   <div className='w-screen h-screen+50 md:h-screen overflow-x-hidden'>
        <div className='w-full h-full bg-gray-200 p-5 md:p-8  flex flex-col gap-0 md:gap-8'>
            <DashboardTextContent text="teacher" />
            <DashboardCardSection />
            <RecentTransactions />
        </div>
    //   </div>
    )
  }
  
  export default TeacherHome