"use client";
import "./MastersPage.scss";
import MasterCard from "@/components/MasterCard/MasterCard";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const MastersPage = ({
  initialMasters,
  initialMeta,
  initialPage,
  initialSearch,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    const queryString = params.toString();

    // scroll: false - не скроллим вверх
    router.push(queryString ? `/masters?${queryString}` : "/masters", {
      scroll: false,
    });
  };

  const handleSearch = (searchValue) => {
    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    // Сбрасываем страницу при поиске
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `/masters?${queryString}` : "/masters", {
      scroll: false,
    });
  };

  return (
    <main className="masters-page">
      <div className="container">
        <h1>Nos maîtres</h1>

        {/* Можно добавить поиск если нужно */}
        {/* <div className="masters-page__search">
                    <input 
                        type="text" 
                        placeholder="Rechercher un maître..."
                        defaultValue={initialSearch}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.target.value);
                            }
                        }}
                    />
                </div> */}

        <div className="masters-page__info">
          <p>
            Total: <span>{initialMeta.total}</span> maîtres
          </p>
        </div>

        <div className="masters-page__list">
          {initialMasters.length > 0 ? (
            initialMasters.map((master) => (
              <MasterCard key={master._id} master={master} />
            ))
          ) : (
            <div className="masters-page__empty">
              <p>Aucun maître trouvé</p>
            </div>
          )}
        </div>

        {initialMeta.pages > 1 && (
          <Pagination
            currentPage={initialPage}
            totalPages={initialMeta.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default MastersPage;
