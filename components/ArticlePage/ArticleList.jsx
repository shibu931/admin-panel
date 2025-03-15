'use client'
import Link from 'next/link'
import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const ArticleList = ({ articleList, handleDeleteClick, handleEditClick }) => {
    return (
        <ul className='max-h-[550px] overflow-y-auto pe-1'>
            {articleList.map((article, index) => (
                <ArticleListCard key={article.slug} article={article} index={index} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />
            ))}
        </ul>
    )
}

export default ArticleList

const ArticleListCard = ({ article, index, handleDeleteClick, handleEditClick }) => {

    return (
        <li className='hover:shadow-md shadow-neutral-800/25 transition-all duration-200 py-4 last:mb-1 border-b last:border-b-0 border-neutral-900 flex space-x-3 px-1'>
            <div className="p-1 w-12 h-12 bg-muted/50 rounded flex items-center justify-center text-neutral-500 text-lg font-semibold">
                {++index}
            </div>
            <div>
                <h3 className='text-sm text-neutral-300 tracking-wide line-clamp-1' title={article.title}>{article.title}</h3>
                <span className='text-xs text-neutral-600'>SLUG: <Link className='hover:underline hover:text-neutral-400 transition-all duration-200' href={article.slug}>{article.slug}</Link></span>
            </div>
            <div className='h-full flex flex-col ms-auto space-y-1'>
                <button onClick={()=>handleDeleteClick(article._id)} type='button' className='bg-red-700/20 text-red-700/80 hover:text-red-600 hover:scale-[105%] transition-all duration-200 hover:shadow shadow-red-300/5 hover:cursor-pointer p-1 rounded text-sm'><RiDeleteBin5Fill /></button>
                <button onClick={()=>handleEditClick(article.slug,article.lang)} type='button' className='bg-blue-700/20 text-blue-700/80 hover:text-blue-600 hover:scale-[105%] transition-all duration-200 hover:shadow shadow-blue-300/5 hover:cursor-pointer p-1 rounded text-sm'><FaRegEdit /></button>
            </div>
        </li>
    )
}