import { redirect } from 'next/navigation.js';
import { auth } from '../auth.js'
import Link from "next/link"
import { FiExternalLink } from "react-icons/fi";
import { countNewOrders, getSalesChartData } from '@/lib/actions/orders.action.js';
import { Chart } from '@/components/Home/Chart.jsx';

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/login')
  const { ordersCount } = await countNewOrders()
  const {data} = await getSalesChartData()
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl p-5">
          <div className='flex justify-between items-end'>
            <h2 className='text-green-500/75 tracking-widest'>New Orders</h2>
            <ViewBtn slug={'/sales'} />
          </div>
          <hr className='my-4' />
          <div className="text-center">
            <span className='md:text-6xl lg:text-8xl font-bold text-green-500/75'>{ordersCount > 9 ? ordersCount : `0${ordersCount}`}</span>
          </div>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <div className='flex justify-between items-end'>
                <h2 className='text-orange-400/75 tracking-widest'>Unverified Reviews</h2>
                <ViewBtn slug={'/reviews'} />
              </div>
              <hr className='my-4' />
              <div className="text-center">
                <span className='md:text-6xl lg:text-8xl font-bold text-orange-400/75'>{ordersCount > 9 ? ordersCount : `0${ordersCount}`}</span>
              </div>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl p-5">
          <div className='flex justify-between items-end'>
            <h2 className='text-blue-500/75 tracking-widest'>Non-Resolved Queries</h2>
            <ViewBtn slug={'/queries'} />
          </div>
          <hr className='my-4' />
          <div className="text-center">
            <span className='md:text-6xl lg:text-8xl font-bold text-blue-500/75'>{ordersCount > 9 ? ordersCount : `0${ordersCount}`}</span>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <Chart chartData={data}/>
      </div>
    </div>
  );
}

function ViewBtn({slug}) {
  return (
    <Link href={slug} className='text-xs bg-blue-800/10 border-blue-600/50 border text-blue-600 p-1 rounded flex items-center transition-all hover:scale-[104%] duration-200'>View <FiExternalLink className='w-4 ms-1' /></Link>
  )
}