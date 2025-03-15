import ArticleLayout from '@/components/ArticlePage/ArticleLayout'
import { getAllArticles } from '@/lib/actions/article.action';
import React from 'react'

const page = async () => {
  const {articles} = await getAllArticles()
  return (
    <ArticleLayout articles={articles}/>
  )
}

export default page