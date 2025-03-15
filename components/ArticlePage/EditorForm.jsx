'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import RichTextEditor from '../common/RichTextEditor'
import { uploadImage } from '@/lib/actions/image.action'
import SelectInput from '../common/SelectInput'

const EditorForm = ({ articleData, setArticleData }) => {
    async function handleImageChange(e) {
        const link = await uploadImage(e.target.files?.[0]);
        setArticleData({ ...articleData, ogImage: link });
    }

    const setLangSelected = (value) => {
        setArticleData({ ...articleData, lang: value });
    }

    const setTypeSelected = (value) => {
        setArticleData({ ...articleData, type: value });
    }
    return (
        <form action="">
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="title">Title</Label>
                    <Input type="text" id="title" placeholder="Title" value={articleData?.title || ''} onChange={(e) => setArticleData({ ...articleData, title: e.target.value })} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="slug">Slug</Label>
                    <Input type="text" id="slug" placeholder="Slug" value={articleData?.slug || ''} onChange={(e) => setArticleData({ ...articleData, slug: e.target.value })} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="metaTitle">Meta Title</Label>
                    <Input type="text" id="metaTitle" placeholder="Meta Title" value={articleData?.metaTitle || ''} onChange={(e) => setArticleData({ ...articleData, metaTitle: e.target.value })} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="keywords">Keywords</Label>
                    <Input type="text" id="keywords" placeholder="Keywords seperated with ," value={articleData?.keywords || ''} onChange={(e) => setArticleData({ ...articleData, keywords: e.target.value })} />
                </div>
                <div className="lg:col-span-2 grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="description">Meta Description</Label>
                    <Textarea placeholder="Type your description here." id="description" value={articleData?.metaDescription || ''} onChange={(e) => setArticleData({ ...articleData, metaDescription: e.target.value })} />
                </div>
                <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="grid col-span-1 w-full max-w-sm items-center gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" onChange={(e) => handleImageChange(e)} />
                </div>
                <div className="grid col-span-1 w-full max-w-sm items-center gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="picture">Article Lang</Label>
                    <SelectInput label={'Article Lang'} placeholder={'Article Lang'} options={[{ value: 'en', label: 'English' }, { value: 'pl', label: 'Polish' }]} width={'w-full'} selected={articleData.lang} setSelected={setLangSelected} />
                </div>
                <div className="grid col-span-1 w-full max-w-sm items-center gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="picture">Article Type</Label>
                    <SelectInput label={'Category'} placeholder={'Article Type'} options={[{ value: 'article', label: 'Article' }, { value: 'blog', label: 'Blog' }]} width={'w-full'} selected={articleData.type} setSelected={setTypeSelected} />
                </div>
                </div>
                <div className='lg:col-span-2'>
                    <RichTextEditor data={articleData} setData={setArticleData} />
                </div>
            </div>
        </form>
    )
}

export default EditorForm