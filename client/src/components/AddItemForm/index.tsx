import { FormEventHandler, useState } from 'react';
import { useApi } from '../../contexts/ApiProvider';

type AddItemFormProps = {
  isPendingRequest: (isLoading: boolean) => void
}

function AddItemForm ({ isPendingRequest }: AddItemFormProps) {
  const apiClient = useApi();
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    isPendingRequest(true);
    await apiClient.post('/todo', {text: value});
    isPendingRequest(false);
  };

  return (
    <div className="add-item-form">
      <form onSubmit={handleSubmit}>
        <span>New ToDo: </span>
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddItemForm;