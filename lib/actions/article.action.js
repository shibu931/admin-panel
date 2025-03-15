"use server";
import { revalidatePath } from 'next/cache';
import connectToDB from '../db/dbConnect';
import Article from '../db/models/article.model';
import {getSimplifiedArticle, revalidatePage} from '@/lib/utils'

export async function getAllArticles() {
  try {
    await connectToDB();
    const articles = await Article.find({},'_id title slug lang type').lean();
    return { success: true, articles:JSON.parse(JSON.stringify(articles))};
  } catch (error) {
    console.error('Error fetching all articles:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getArticle(slug, lang) {
  try {
    await connectToDB();
    const article = await Article.findOne({ slug, lang });
    if (!article) {
      return { success: false, error: 'Article not found' };
    }
    const simplifiedArticle = getSimplifiedArticle(article);
    return { success: true, article: simplifiedArticle };
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id) {
  try {
    await connectToDB();
    const deletedArticle = await Article.findByIdAndDelete(id);
    console.log(deletedArticle);
    
    if (!deletedArticle) {
      return { success: false, error: 'Article not found' };
    }
    revalidatePath('/articles')
    await revalidatePage('/blogs')
    return { success: true, message: 'Article deleted successfully' };
  } catch (error) {
    console.error(`Error deleting article ${id}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function getByArticlesType(lang,type) {
  try {
    await connectToDB();
    let articles;
    if(!lang) articles = await Article.find({ type });
    else if(lang && type) articles = await Article.find({ lang ,type });
    else if(!type) articles = await Article.find({ lang });
    return { success: true, articles };
  } catch (error) {
    console.error(`Error fetching articles of type ${type}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function saveArticle(articleData) {
  try {
    await connectToDB();
    const existingArticle = await Article.find({ slug: articleData.slug });
    if (existingArticle.length > 0) {
      await Article.updateOne({ slug: articleData.slug }, articleData);
      const updatedArticle = await Article.find({ slug: articleData.slug });
      const simplifiedArticle = getSimplifiedArticle(updatedArticle[0]);
      revalidatePath('/articles')
      await revalidatePage('/blogs')
      return { success: true, simplifiedArticle };
    } else {
      const article = await Article.create(articleData);
      const simplifiedArticle = getSimplifiedArticle(article);
      revalidatePath('/articles')
      await revalidatePage('/blogs')
      return { success: true, simplifiedArticle };
    }
  } catch (error) {
    console.error('Error saving article:', error.message);
    return { success: false, error: error.message };
  }
}

export async function editArticle(slug, articleData) {
  try {
    await connectToDB();
    const updatedArticle = await Article.findOneAndUpdate({ slug }, articleData, {
      new: true,
    });
    if (!updatedArticle) {
      return { success: false, error: 'Article not found or update failed' };
    }
    return { success: true, article: updatedArticle };
  } catch (error) {
    console.error(`Error updating article with slug ${slug}:`, error.message);
    return { success: false, error: error.message };
  }
}