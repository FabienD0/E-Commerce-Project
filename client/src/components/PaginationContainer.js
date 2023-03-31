import React, { useState } from 'react'
import styled from 'styled-components';
import { Pagination } from "@mui/material";

const PaginationContainer = ({items, perPage}) => {
	const [page, setPage] = useState(1);
	const count = Math.floor(items.length / perPage);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(perPage);

  const handleChange = (e, value) => {
		setPage(value);
		if(page === value) return;

		if(page < value) {
			setStart(end);
			setEnd(end + perPage);
		} else {
			setStart(start - perPage);
			setEnd(end - perPage);
		}
	}

  return (
		<ContainerCenter>
			<ItemsContainer>
				{items.slice(start, end)}
			</ItemsContainer>
			<Margin>
				<Pagination color="primary" count={count} page={page} onChange={handleChange} />
			</Margin>
		</ContainerCenter>
  )
}


const ContainerCenter = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items:center;
`;

const Margin = styled.div`
margin: 4em 0;
`;

const ItemsContainer = styled.div`
	display:flex;
	flex-wrap: wrap;
	gap: 20px;
	width: 100%;
	justify-content: center;

	& > * {
		margin-right: 1em;
	}
`;

export default PaginationContainer