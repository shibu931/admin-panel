import QueryPage from '@/components/QueriesPage/QueryPage';
import { getAllQueries } from '@/lib/actions/contact.action'
import React from 'react'

const page = async () => {
  const data = await  getAllQueries();
  let queries=null;
  if(data.success) queries = data.queries
  return (
    <QueryPage contacts={queries}/>
  )
}

export default page