import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";

export default function Paginate(props) {
  const { path, label, totalPage = 10, page } = props;
  const navigate = useNavigate();
  const handlePageChange = (event) => {
    const target = Number(event.target.innerText);
    if (target) navigate(`/${path}/page/${target}`);
  };

  return (
    <Pagination onClick={handlePageChange}>
      {label && (
        <>
          <Pagination.First href={`1`} disabled={page === 1} />
          <Pagination.Prev href={`${page - 1}`} disabled={page === 1} />
        </>
      )}

      {page < 3 && (
        <>
          <Pagination.Item active={page === 1}>{1}</Pagination.Item>
          <Pagination.Item active={page === 2}>{2}</Pagination.Item>
          <Pagination.Item active={page === 3}>{3}</Pagination.Item>
          <Pagination.Ellipsis href={`4`} />
          <Pagination.Item>{totalPage}</Pagination.Item>
        </>
      )}
      {page >= 3 && page <= totalPage - 2 && (
        <>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis href={`${page - 2}`} />
          <Pagination.Item>{page - 1}</Pagination.Item>
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Item>{page + 1}</Pagination.Item>
          <Pagination.Ellipsis href={`${page + 2}`} />
          <Pagination.Item active={page === totalPage}>
            {totalPage}
          </Pagination.Item>
        </>
      )}

      {page > totalPage - 2 && (
        <>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis href={`${totalPage - 2}`} />
          <Pagination.Item active={page === totalPage - 1}>
            {totalPage - 1}
          </Pagination.Item>
          <Pagination.Item active={page === totalPage}>
            {totalPage}
          </Pagination.Item>
        </>
      )}

      {label && (
        <>
          <Pagination.Next href={`${page + 1}`} disabled={page === totalPage} />
          <Pagination.Last
            href={`${totalPage}`}
            disabled={page === totalPage}
          />
        </>
      )}
    </Pagination>
  );
}
