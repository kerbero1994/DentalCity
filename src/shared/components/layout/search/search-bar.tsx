"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import styles from "./search-bar.module.css";

type Props = {
  action?: string;
  initialQuery?: string;
  ariaLabel?: string;
  placeholder?: string;
  name?: string;
  className?: string;
};

export function SearchBar({
  action = "/buscar",
  initialQuery = "",
  ariaLabel = "Buscar en el sitio",
  placeholder = "Buscar…",
  name = "q",
  className,
}: Props) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  return (
    <form
      role="search"
      aria-label={ariaLabel}
      className={`${styles.form} ${className ?? ""}`}
      action={action}
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams({ [name]: value });
        router.push(`${action}?${params.toString()}`);
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        {ariaLabel}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id="site-search"
          className={styles.input}
          type="search"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
        />
        <SearchIcon className={styles.searchIcon} aria-hidden />
      </div>
    </form>
  );
}
