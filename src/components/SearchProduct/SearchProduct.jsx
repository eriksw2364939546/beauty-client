"use client";
import "./SearchProduct.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchProduct = ({ initialSearch = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch || "");
  const [isTyping, setIsTyping] = useState(false);
  const initialRender = useRef(true);
  const previousSearchRef = useRef(initialSearch || "");

  // Синхронизация с URL при изменении initialSearch (из пропсов)
  useEffect(() => {
    setSearchValue(initialSearch || "");
    previousSearchRef.current = initialSearch || "";
  }, [initialSearch]);

  // Debounce для поиска
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (isTyping) {
        handleSearchDebounced();
        setIsTyping(false);
      }
    }, 500); // Задержка 500мс

    return () => clearTimeout(timer);
  }, [searchValue, isTyping]);

  const handleSearchDebounced = useCallback(() => {
    const trimmedValue = searchValue.trim();
    const currentSearchParam = searchParams.get("search") || "";

    // Если значение не изменилось - не обновляем URL
    if (trimmedValue === currentSearchParam) {
      return;
    }

    // Если предыдущее значение такое же - не обновляем URL
    if (trimmedValue === previousSearchRef.current) {
      return;
    }

    // Запоминаем текущее значение
    previousSearchRef.current = trimmedValue;

    const params = new URLSearchParams(searchParams);

    // Обработка поиска
    if (trimmedValue.length >= 2) {
      params.set("search", trimmedValue);
    } else if (trimmedValue.length === 0) {
      // Очищаем только если был поиск ранее
      if (currentSearchParam) {
        params.delete("search");
      } else {
        return; // Не было поиска, нечего очищать
      }
    } else {
      // Меньше 2 символов - не делаем запрос
      return;
    }

    // Сбрасываем страницу при новом поиске
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `/products?${queryString}` : "/products", {
      scroll: false,
    });
  }, [searchValue, searchParams, router]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsTyping(true);
  };

  const handleClear = () => {
    if (searchValue) {
      setSearchValue("");
      setIsTyping(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchDebounced();
      setIsTyping(false);
    }
  };

  return (
    <div className="search-product">
      <div className="search-product__input-wrapper">
        <input
          type="text"
          className="search-product__input"
          placeholder="Rechercher par nom ou code... (min. 2 caractères)"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Rechercher un produit"
        />

        {searchValue ? (
          <button
            type="button"
            className="search-product__clear"
            onClick={handleClear}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        ) : (
          <div className="search-product__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        )}
      </div>

      {searchValue && searchValue.trim().length < 2 && (
        <p className="search-product__hint">
          Veuillez saisir au moins 2 caractères
        </p>
      )}
    </div>
  );
};

export default SearchProduct;
