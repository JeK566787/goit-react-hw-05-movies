import css from './Form.module.css';

const Form = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements.searchQuery.value);

    e.target.elements.searchQuery.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input className={css.formInput} type={'text'} name="searchQuery" />
      </label>
      <button className={css.formButton} type="submit">
        SEARCH
      </button>
    </form>
  );
};
export default Form;
