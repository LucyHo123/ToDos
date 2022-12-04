import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ButtonComp from '../components/ButtonComp';

interface DataDetailProp {
	completed: boolean,
	id: number,
	title: string,
	userId: number
}

const TodoDetail = () => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [detailData, setDetailData] = useState<DataDetailProp>()
	const clx = useStyles()

	useEffect(() => {
		const getData = async () => {
			await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res: any) => setDetailData(res.data))
		}
		getData()
	}, [])

	const goBack = () => {
		navigate('/');
	}
	return (
		<Box className={clx.container}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography>Detail Page</Typography>
				<ButtonComp title={'Back'} onClick={goBack} type={'back'} />
			</Box>
			<Box className={clx.content}>
				<Box sx={{ display: 'flex' }}>
					<Typography>ID:</Typography>
					<Typography>{detailData?.id}</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Typography>User ID:</Typography>
					<Typography>{detailData?.userId}</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Typography>Status:</Typography>
					<Typography>{detailData?.completed ? 'Completed' : 'Not completed'}</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Typography>Title:</Typography>
					<Typography>{detailData?.title}</Typography>
				</Box>
			</Box>
		</Box>
	)
}

const useStyles = makeStyles({
	container: {
		backgroundColor: '#EDEAE9',
		maxWidth: 300,
		minHeight: 300,
		margin: 'auto',
		alignItem: 'center',
		justifyContent: 'center',
		padding: 20,
		marginTop: 30,
		borderRadius: 8
	},
	content: {
		marginTop: 20,
		padding: '10px 20px',
	}
})

export default TodoDetail;
