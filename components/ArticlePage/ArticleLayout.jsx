'use client'
import ArticleList from './ArticleList'
import React, { Suspense, useEffect, useState } from 'react'
import SelectInput from '../common/SelectInput'
import ArticleEditorLayout from './ArticleEditorLayout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteArticle } from '@/lib/actions/article.action'

const ArticleLayout = ({ articles }) => {
    const [selected, setSelected] = useState('all')
    const [selectedLang, setSelectedLang] = useState(null)
    const [articleList, setArticleList] = useState(articles)
    const options = [{ value: 'all', label: 'All' }, { value: 'blog', label: 'Blog' }, { value: 'article', label: 'Article' }]
    const langOptions = [{ value: null, label: 'All' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'French' }]
    const router = useRouter()
    async function handleDeleteClick(id){
        try {
            const result = await deleteArticle(id)
            if(result.success){
                toast.success('Success',{description:'Successfuly deleted article'})
                setArticleList((prevArticles) => prevArticles.filter((article) => article.id !== id))
            }else{
                toast.error('Error',{description:'Error deleteing article'})
            }
        } catch (error) {
            console.log(error)
            toast.error('Error',{description:'Error deleteing article'})
        }
    }
    function handleEditClick(articleSlug,lang){
        router.push(`/articles?editArticle=true&slug=${articleSlug}&lang=${lang}`)
    }
    useEffect(() => {
        let filteredArticles = articles
        
        if (selected !== 'all') filteredArticles = filteredArticles.filter((article) => article.type === selected)
        if (selectedLang !== null) filteredArticles = filteredArticles.filter((article) => article.lang === selectedLang)

        setArticleList(filteredArticles)
    }, [selected, selectedLang, articles])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-10 p-4 gap-4'>
            <div className="lg:col-span-3">
                <div className="border rounded py-4 ps-2 pe-1">
                    <div className="pe-1 pb-3 border-b border-neutral-700 flex items-center justify-between h-12">
                        <h5 className='text-neutral-300 uppercase font-medium'>All Articles</h5>
                        <div className='space-x-2 flex'>
                            <SelectInput options={langOptions} selected={selectedLang} setSelected={setSelectedLang} placeholder='Article Type' label='Language' width='w-[100px]' />
                            <SelectInput options={options} selected={selected} setSelected={setSelected} placeholder='Article Type' label='Types' width='w-[100px]' />
                        </div>
                    </div>
                    <ArticleList articleList={articleList} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
                </div>
            </div>
            <div className="lg:col-span-7 border rounded py-4 px-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <ArticleEditorLayout articleList={articleList} setArticleList={setArticleList}/>
                </Suspense>
            </div>
        </div>
    )
}

export default ArticleLayout