import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const QueryCard = ({ contact, handleUpdate, handleDelete }) => {
  return (
    <div className="mx-auto bg-muted/50 rounded shadow-md overflow-hidden m-3 hover:shadow-lg transition-shadow w-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="uppercase tracking-wide text-sm text-neutral-300 font-semibold">
            {contact.name}
          </div>
          <span className="text-gray-500 text-sm">
            {new Date(contact.createdAt).toLocaleDateString()}
          </span>
        </div>
        <a
          href={`mailto:${contact.email}`}
          className="block mt-1 text-sm leading-tight font-medium text-neutral-500 hover:text-blue-600"
        >
          {contact.email}
        </a>
        <hr className='my-3' />
        {contact.message && (
          <p className="mt-2 text-neutral-400">
            {contact.message}
          </p>
        )}
        <hr className='my-4' />
        <div className='flex space-x-4 items-center justify-end'>
          <Label htmlFor="chkbox" className={contact.isAnswered ? 'text-green-500' : 'text-neutral-300'}>
            <Input type={'checkbox'} id="chkbox" checked={contact.isAnswered} onChange={() => handleUpdate(contact)} className={'w-3 checked:accent-green-300 '} />
            Answered
          </Label>
          <button onClick={() => handleDelete(contact._id)} type='button' className='bg-red-700/20 text-red-700/80 hover:text-red-600 hover:scale-[105%] transition-all duration-200 h-[25px] hover:shadow shadow-red-300/5 hover:cursor-pointer p-1 rounded text-sm'><RiDeleteBin5Fill /></button>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;