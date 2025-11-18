import { useRef } from "react";
import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const queryValue = formData.get("query");
    const query = typeof queryValue === "string" ? queryValue.trim() : "";

    if (!query) {
      toast("Please enter your search query.");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {}
        <form className={styles.form} action="#" ref={formRef}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button
            className={styles.button}
            type="submit"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
