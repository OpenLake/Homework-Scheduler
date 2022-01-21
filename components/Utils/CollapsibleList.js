import { useState } from 'react';

import {
	List,
	Collapse,
	ListItemButton,
	ListItemText,
	Typography,
	Icon,
	Chip,
	Stack,
} from '@mui/material';

const CollapsibleList = ({ title, titleColor, list, listItem, showCount }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (list.length > 0) {
			setOpen(!open);
		}
	};

	return (
		<>
			<ListItemButton onClick={handleOpen}>
				<ListItemText
					primary={
						<Typography variant="h5" color={titleColor}>
							{title}
						</Typography>
					}
				/>
				<Stack direction="row" spacing={1}>
					{showCount && <Chip label={list.length} color="info" size="small" />}
					<Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
				</Stack>
			</ListItemButton>
			<Collapse in={open}>
				<List>{list.map(listItem)}</List>
			</Collapse>
		</>
	);
};

export default CollapsibleList;
