import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';


interface TableProps {
	order: any;
	orderBy: string;
	headCells: any;
	onRequestSort: any
}

export default function TableHeader(props: TableProps) {
	const { order, orderBy, headCells, onRequestSort } = props;

	const createSortHandler =
		(property: any) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell: any) => (
					<TableCell
						key={headCell.id}
						align={'left'}
						padding={'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ fontWeight: 'bold' }}
					>
						<TableSortLabel
							active={headCell.id === 'id' || headCell.id === 'action' ? false : true}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id && (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							)}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}