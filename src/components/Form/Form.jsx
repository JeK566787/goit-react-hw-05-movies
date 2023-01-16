import { useSearchParams } from 'react-router-dom';

const Form = () => {
  const [, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    e.preventDefault();

    setSearchParams({ q: e.target.elements.searchQuery.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type={'text'} name="searchQuery" />
      </label>
      <button type="submit">SEARCH</button>
    </form>
  );
};
export default Form;
