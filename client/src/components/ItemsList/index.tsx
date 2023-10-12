import { useState, ChangeEventHandler, KeyboardEventHandler, useEffect } from 'react';
import { useApi } from '../../contexts/ApiProvider';
import Pagination from '../Pagination';

type ItemsListProps = {
  isPendingRequest: (isLoading: boolean) => void
}
type TodoItem = {
  _id: string;
  text: string;
}
type PaginationInfo = {
  limit: number;
  skip: number;
  total: number;
}

function ItemsList({ isPendingRequest }: ItemsListProps) {
  const apiClient = useApi();

  const [todoList, setTodoList] = useState<TodoItem[] | null>(null);
  const [value, setValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await apiClient.get('/todo');
      if (response.ok) {
        setTodoList(response.body.data);
        setPaginationInfo(response.body.pagination)
      }
      else {
        setTodoList(null);
        setPaginationInfo(null);
      }
    })();
  }, [apiClient]);

  const handleSelect = (item: TodoItem) => {
    setSelectedItemId(item._id);
    setValue(item.text);
  }

  const handleEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      isPendingRequest(true);
      const response = await apiClient.patch(`/todo/${selectedItemId}`, {text: value});
      if (response.ok) {
        setSelectedItemId(null);
      }
      isPendingRequest(false);
    }
  }

  const handleDelete = async (id: string) => {
    isPendingRequest(true);
    await apiClient.delete(`/todo/${id}`);
    isPendingRequest(false);
  }

  const handlePageChange = async (page: number) => {
    const response = await apiClient.get(`/todo?page=${page}`);
    if (response.ok) {
      setTodoList(response.body.data);
      setPaginationInfo(response.body.pagination);
      setCurrentPage(page);
    }
    else {
      setTodoList(null);
      setPaginationInfo(null);
      setCurrentPage(1);
    }

  }

  return (
    <div className='items-list'>
      <ul>
        {todoList &&
          todoList.map((item =>
              <li key={item._id}>
                {item._id === selectedItemId
                  ?
                  <input value={value} onKeyDown={handleEnter} onChange={handleEdit} />
                  :
                  <>
                    <span onClick={() => {handleSelect(item)}}>
                      {item.text}
                    </span>
                    <strong className='delete-btn' onClick={async () => {await handleDelete(item._id)}}> X</strong>
                  </>
                }
              </li>
          ))}
      </ul>
      {paginationInfo &&
        <Pagination
          currentPage={currentPage}
          totalCount={paginationInfo.total}
          pageSize={5}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
}

export default ItemsList;
