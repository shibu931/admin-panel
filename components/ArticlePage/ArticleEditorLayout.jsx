'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import EditorForm from './EditorForm'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import {getArticle, saveArticle} from '@/lib/actions/article.action'
import FormSkeleton from '../LoadingSkeletons/FormSkeleton'

const initialData = {
    title: '',
    type: 'article',
    lang:'en',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
}

const ArticleEditorLayout = ({articleList,setArticleList}) => {
    const params = useSearchParams()
    const isEdit = params.get('editArticle')
    const slug = params.get('slug')
    const lang = params.get('lang')
    const [loading,setLoading] = useState(false)
    const [articleData, setArticleData] = useState(initialData);

    async function handleSaveArticle() {
        try {
          setLoading(true);
          const result = await saveArticle(articleData);
          if (result.success) {
            toast.success('Success', {
              description: 'Article saved successfully'
            });
            if (isEdit) {
              setArticleList(prevArticles => {
                return prevArticles.map(article => {
                  if (article.slug === slug) {
                    return result.simplifiedArticle;
                  }
                  return article;
                });
              });
            } else {
              setArticleList(prevArticles => [...prevArticles, result.simplifiedArticle]);
            }
          } else if (result.error) {
            toast.error('Error', {
              description: result.error
            });
          }
        } catch (error) {
          console.error('Save article failed:', error);
          toast.error('Error', {
            description: 'Failed to save article'
          });
        } finally {
          setLoading(false)
        }
    }
    useEffect(()=>{
        async function fetchArticle(){
            try {
                setLoading(true)
                const result = await getArticle(slug,lang)
                if(result.success){
                    setArticleData(result.article)                    
                }else{
                    toast.error('Error',{
                        description:result.error
                    })
                }
            } catch (error) {
                console.error('Something went wrong: ',error)
                toast.error('Error',{
                    description:error
                })
            }finally{
                setLoading(false)
            }
        }
        if(slug) fetchArticle()
    },[slug])

    return (
        <div className='relative h-full min-h-[600px] pb-12'>
            <div className="pe-1 pb-3 border-b border-neutral-700 flex items-center justify-between h-12">
                <h5 className='text-neutral-300 uppercase font-medium'>{isEdit ? 'Update' : 'New'} Article</h5>
                {isEdit && <Button asChild variant='outline'><Link href={'/articles'}>New Article</Link></Button>}
            </div>
            <div className='p-4 max-h-[500px] overflow-y-auto relative'>
                {loading ? <FormSkeleton/> : <EditorForm articleData={articleData} setArticleData={setArticleData} />}
            </div>
            <div className="absolute bottom-0 w-full pe-1 pt-3 border-t border-neutral-700 flex justify-end space-x-2 h-12">
                <Button onClick={()=>setArticleData(initialData)} variant="destructive" className={'rounded btn-sm'}>
                    Clear
                </Button>
                <Button onClick={() => {handleSaveArticle()}} className={'rounded btn-sm bg-blue-700 hover:bg-blue-800 text-white'}>
                    {isEdit ? 'Update' : loading ? 'Loading':'Save'}
                </Button>
            </div>
        </div>
    )
}

export default ArticleEditorLayout