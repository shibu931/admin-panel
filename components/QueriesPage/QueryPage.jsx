'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import QueryCard from './QueryCard';
import { deleteQuery, updateQuery } from '@/lib/actions/contact.action';
import SelectInput from '../common/SelectInput';

const QueryPage = ({ contacts }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFilter,setSelectedFilter] = useState('all')
  const [sortBy,setSortBy] = useState('new')
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const filterOpt = [{ value: 'all', label: 'All' }, { value: 'unreplied', label: 'UnReplied' }, { value: 'replied', label: 'Replied' }]
  const sortByOpt = [{ value: 'new', label: 'New' }, { value: 'old', label: 'Oldest' }]

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setFilteredContacts(contacts);
    } else if (filter === 'unreplied') {
      setFilteredContacts(contacts.filter(contact => !contact.isAnswered));
    } else if (filter === 'replied') {
      setFilteredContacts(contacts.filter(contact => contact.isAnswered));
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Are you sure you want to delete this query?');
    if (!confirm) return;
    setLoading(true);
    setError('');
    try {
      const result = await deleteQuery(id);
      if (result.success) {
        setError(result.error || 'Failed to delete query');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(updatedContact) {
    setLoading(true);
    setError('');
    try {
      const result = await updateQuery({ ...updatedContact, isAnswered: true });
      if (!result.success) {
        setError(result.error || 'Failed to update query');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let sortedContacts = [...filteredContacts];
    if (sortBy === 'new') {
      sortedContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'old') {
      sortedContacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setFilteredContacts(sortedContacts);
  }, [contacts, sortBy,]);

  useEffect(() => {
    handleFilterChange(selectedFilter);
  }, [selectedFilter, contacts]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex space-x-4 h-8 items-center'>
          <h1 className="text-xl font-semibold text-neutral-200 uppercase">Queries</h1>
          <Separator orientation="vertical" />
          <SelectInput options={filterOpt} selected={selectedFilter} setSelected={setSelectedFilter} placeholder='Query Filter' label='Status' width='w-[100px]' />
          <Separator orientation="vertical" />
          <SelectInput options={sortByOpt} selected={sortBy} setSelected={setSortBy} placeholder='Sort By' label='Sort By' width='w-[100px]' />
        </div>

        <hr className='my-4' />

        {error && (
          <div className="mb-4 p-4 bg-muted/50 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 p-4 bg-muted/50 text-blue-700 rounded-lg">
            Processing...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <QueryCard
              key={contact._id}
              contact={contact}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              disabled={loading}
            />
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No contact messages found
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryPage;