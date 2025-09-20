'use client';

import { useState, useMemo } from 'react';

// Типы данных (пример — вы можете заменить на свои)
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// Пропсы таблицы
interface DataTableProps {
  data?: User[];
}

export default function DataTable({
  data = [
    {
      id: 1,
      name: 'Алексей',
      email: 'alex@example.com',
      role: 'admin',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Мария',
      email: 'maria@example.com',
      role: 'user',
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      name: 'Иван',
      email: 'ivan@example.com',
      role: 'moderator',
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      name: 'Елена',
      email: 'elena@example.com',
      role: 'user',
      createdAt: '2024-04-05'
    },
    {
      id: 5,
      name: 'Сергей',
      email: 'sergey@example.com',
      role: 'admin',
      createdAt: '2024-05-12'
    },
    {
      id: 6,
      name: 'Ольга',
      email: 'olga@example.com',
      role: 'user',
      createdAt: '2024-06-18'
    },
    {
      id: 7,
      name: 'Дмитрий',
      email: 'dmitry@example.com',
      role: 'moderator',
      createdAt: '2024-07-22'
    },
    {
      id: 8,
      name: 'Наталья',
      email: 'natalia@example.com',
      role: 'user',
      createdAt: '2024-08-30'
    }
  ]
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Фильтрация
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Сортировка
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Пагинация
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  // Обработчик сортировки
  const handleSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Сброс страницы при изменении фильтра
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Генерация заголовков
  const headers: { key: keyof User; label: string }[] = [
    { key: 'name', label: 'Имя' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Роль' },
    { key: 'createdAt', label: 'Дата создания' }
  ];

  return (
    <div className='rounded-lg bg-white p-4 shadow'>
      {/* Поиск */}
      <div className='mb-4 flex items-center justify-between'>
        <input
          type='text'
          placeholder='Поиск по таблице...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className='ml-4 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
        >
          {[5, 10, 25, 50].map((size) => (
            <option key={size} value={size}>
              {size} / страница
            </option>
          ))}
        </select>
      </div>

      {/* Таблица */}
      <div className='overflow-x-auto'>
        <table className='min-w-full rounded-lg border border-gray-200 bg-white'>
          <thead>
            <tr className='bg-gray-50'>
              {headers.map((header) => (
                <th
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  className='cursor-pointer px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase transition hover:bg-gray-100'
                >
                  <div className='flex items-center'>
                    {header.label}
                    {sortConfig?.key === header.key && (
                      <span className='ml-1'>
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className='transition hover:bg-gray-50'>
                  <td className='px-4 py-3 text-sm text-gray-900'>
                    {row.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-900'>
                    {row.email}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-900'>
                    {row.role}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-900'>
                    {row.createdAt}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className='px-4 py-6 text-center text-gray-500'
                >
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      <div className='mt-4 flex items-center justify-between'>
        <p className='text-sm text-gray-700'>
          Страница {currentPage} из {totalPages || 1}
        </p>
        <div className='flex space-x-2'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Назад
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className='rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
}
