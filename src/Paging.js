import React from "react";

const Paging = ({ postPerPage, totalPost, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="d-flex justify-content-center">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Paging;