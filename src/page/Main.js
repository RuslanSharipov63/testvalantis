import { useEffect, useState } from "react";
import { getId } from "../api/getId";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ProductList from "../components/ProductList";
import { Suspense } from "react";

const Main = () => {
  const [stateDataProduct, setStateDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    const fetchParamId = {
      action: "get_ids",
      params: { limit: 50 },
    };
    async function reqServer() {
      const productId = await getId(fetchParamId);
      if (productId) {
        const fetchParamDataProduct = {
          action: "get_items",
          params: { ids: productId },
        };
        let dataProduct = await getId(fetchParamDataProduct);
        if (dataProduct) {
          setStateDataProduct([...dataProduct]);
          return;
        }
      }
    }
    reqServer();
  }, []);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProduct = stateDataProduct.slice(
    firstProductIndex,
    lastProductIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage >= Math.ceil(stateDataProduct.length / productsPerPage))
      return;
    return setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    if (currentPage != 1) {
      return setCurrentPage((prev) => prev - 1);
    }
  };

  const filterProduct = async (param) => {
    const fetchParam = {
      action: "filter",
      params: param,
    };
    const productId = await getId(fetchParam);
    if (productId) {
      const fetchParamDataProduct = {
        action: "get_items",
        params: { ids: productId },
      };
      let dataProduct = await getId(fetchParamDataProduct);
      if (dataProduct) {
        setStateDataProduct([...dataProduct]);
        return;
      }
    }
  };

  return (
    <>
      <h1 className="text-primary text-center">Список товаров</h1>
      <Suspense fallback={<Loading />}>
        <ProductList
          currentProduct={currentProduct}
          filterProduct={filterProduct}
        />
      </Suspense>
      {stateDataProduct.length === 0 ? null : <> 
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={stateDataProduct.length}
        paginate={paginate}
      />
      <div className="d-flex justify-content-center mb-1">
        <button
          className="btn btn-primary"
          style={{ width: "7%" }}
          onClick={prevPage}
        >
          назад
        </button>
        <button
          className="btn btn-primary ms-2"
          style={{ width: "7%" }}
          onClick={nextPage}
        >
          вперед
        </button>
      </div>
      </>
      }
    </>
  );
};

export default Main;
