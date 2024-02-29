import { useState } from "react";
import Push from "./Push";

const ProductList = ({ currentProduct, filterProduct }) => {
  const [statePush, setStatePush] = useState({
    existence: false,
    textPush: "",
  });

  const handleMouseEnter = (text, bol) => {
    setStatePush({
      ...statePush,
      existence: bol,
      textPush: text,
    });
  };
  return (
    <>
      {statePush.existence && <Push textPush={statePush.textPush} />}
      <div class="row row-cols-1 row-cols-md-3 g-4 m-1">
        {currentProduct.length === 0
          ? "Загрузка..."
          : currentProduct.map((item) => {
              return (
                <div className="col">
                  <div className="card h-100 p-2 text-start d-flex flex-column justify-content-between">
                    <div key={item.id} clasName="card-body">
                      <p className="card-text">
                        id товара:
                        <p>
                          <small className="text-body-secondary">
                            {" " + item.id}
                          </small>
                        </p>
                      </p>
                      <p className="card-text">
                        <strong
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() =>
                            handleMouseEnter("фильтровать по названию", true)
                          }
                          onMouseLeave={() => handleMouseEnter("", false)}
                          onClick={() =>
                            filterProduct({ product: item.product })
                          }
                        >
                          {item.product}
                        </strong>
                      </p>
                      <p className="card-text">
                        цена:
                        <strong
                          onClick={() => filterProduct({ price: item.price })}
                          onMouseEnter={() =>
                            handleMouseEnter("фильтровать по ценам", true)
                          }
                          onMouseLeave={() => handleMouseEnter("", false)}
                          style={{ cursor: "pointer" }}
                        >
                          {" " + item.price}
                        </strong>
                      </p>
                      <p className="card-text">
                        бренд:
                        <strong
                          style={{ cursor: "pointer" }}
                          onMouseEnter={() =>
                            handleMouseEnter(
                              item.brand
                                ? "фильтровать по бренду"
                                : "фильтрация невозможна",
                              true
                            )
                          }
                          onMouseLeave={() => handleMouseEnter("", false)}
                          onClick={() => {
                            if (!item.brand) return;
                            filterProduct({ brand: item.brand });
                          }}
                        >
                          {item.brand ? " " + item.brand : " нет информации"}
                        </strong>
                      </p>
                      <a href="#" className="btn btn-primary">
                        купить
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ProductList;
