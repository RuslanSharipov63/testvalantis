import styles from './../css/pagintaion.module.css';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul
      className={`${styles.list} pagination`}
    >
      {pageNumbers.map((number) => {
        return (
          <li className="page-item" key={number}>
            <p
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => paginate(number)}
            >
              {number}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
