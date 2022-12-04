import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface IProp {
	title: string;
	type: string;
	onClick?: () => void;
	viewNormal?: () => void;
	viewGroup?: () => void
}

const ButtonComp = (props: IProp) => {
	const { title, onClick, type, viewNormal, viewGroup } = props
	const clx = useStyles()

	return (
		<Button className={clx.viewTypeButton} onClick={type == 'normal' ? viewNormal : type == 'group' ? viewGroup : onClick}>{title}</Button>
	)
}

const useStyles = makeStyles({
	viewTypeButton: {
		'&.MuiButtonBase-root, .MuiButton-root': {
			backgroundColor: 'black !important',
			color: '#fff',
			marginRight: '8px !important',
			textTransform: 'capitalize'
		}
	}
})

export default ButtonComp;
