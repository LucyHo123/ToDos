import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableHeader from '../components/TableHeader';
import { Link } from 'react-router-dom';
import ButtonComp from '../components/ButtonComp';

interface Data {
	id: number;
	userId: number;
	title: string;
	action: number;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: false,
		label: 'ID',
	},
	{
		id: 'userId',
		numeric: true,
		label: 'UserId',
	},
	{
		id: 'title',
		numeric: true,
		label: 'Title',
	},
	{
		id: 'action',
		numeric: true,
		label: 'Action',
	},
];

const headCellGroup: readonly HeadCell[] = [
	{
		id: 'userId',
		numeric: true,
		label: 'UserId',
	},
	{
		id: 'title',
		numeric: true,
		label: 'Title',
	},
];

interface IButton {
	title: string;
	type: string;
}

const button: readonly IButton[] = [
	{ title: 'View normal', type: 'normal' },
	{ title: 'View Group By User ID', type: 'group' },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	id: keyof Data;
	label: string;
	numeric: boolean;
}

function HomePage() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [currentData, setCurrentData] = useState([]);
	const [isViewNormal, setViewNormal] = useState(true);
	const [groupData, setGroupData] = useState({})

	useEffect(() => {
		const getData = async () => {
			await axios.get(`https://jsonplaceholder.typicode.com/todos`).then((res: any) => setCurrentData(res.data))
		}
		getData()
	}, []);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const viewNormal = () => {
		setViewNormal(true)
	}

	const viewGroup = () => {
		setViewNormal(false);
		const groupByUserId = currentData.reduce((group: {
			[key: number]: []
		}, item) => {
			const { userId } = item;
			group[userId] = group[userId] ?? [];
			group[userId].push(item);
			return group;
		}, {});
		setGroupData(groupByUserId)
	}

	return (
		<Box sx={{ padding: 2 }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
					{
						button.map(item => <ButtonComp title={item.title} viewNormal={viewNormal} viewGroup={viewGroup} type={item.type} />)
					}
				</Toolbar>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<TableHeader
							order={order}
							orderBy={orderBy}
							headCells={isViewNormal ? headCells : headCellGroup}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{isViewNormal ? stableSort(currentData, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row: any, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow
											hover
											tabIndex={-1}
											key={row.title}
										>
											<TableCell align="center">{row.id}</TableCell>
											<TableCell align="center">{row.userId}</TableCell>
											<TableCell component="th" scope="row" padding="normal">
												{row.title}
											</TableCell>
											<TableCell align="left">
												<Link to={`/detail/${row.id}`}><RemoveRedEyeIcon /></Link>
											</TableCell>
										</TableRow>
									);
								}) :
								Object.values(groupData).map((item: any, index) => {
									return (
										<TableRow hover tabIndex={-1} key={index} >
											<TableCell align="right">{index + 1}</TableCell>
											<TableCell align="left">
												{
													item.map((subItem: any) => {
														return (
															<li style={{ padding: '8px 16px' }}>{subItem.title}</li>
														)
													})
												}
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={currentData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

export default HomePage;

