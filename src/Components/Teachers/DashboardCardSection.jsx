import { FaRedhat, FaUser } from 'react-icons/fa'
import { GoTrophy } from 'react-icons/go'
import { TbBooks } from 'react-icons/tb'
import DashboardCard from './DashboardCard'

const DashboardCardSection = () => {
  return (
    <div className='h-2/5 md:h-1/4 w-full flex flex-col md:flex-row justify-between gap-5 md:gap-0'>
      <DashboardCard text="Total student" value={4} Icon={<FaUser color='white' className='text-xl md:text-veryLarge' /> } />
      <DashboardCard text="total course" value={6} Icon={<TbBooks color='white' className='text-xl md:text-veryLarge' /> }/>
      <DashboardCard text="Course completed" value={3} Icon={<FaRedhat color='white' className='text-xl md:text-veryLarge' /> }/>
      <DashboardCard text="Total revenue" value={5000} Icon={<GoTrophy color='white' className='text-xl md:text-veryLarge' /> }/>
    </div>
  )
}

export default DashboardCardSection