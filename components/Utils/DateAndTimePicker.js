import DateAdapter from '@mui/lab/AdapterDateFns';

import { TextField, Tooltip } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import { LocalizationProvider, DateTimePicker, PickersDay } from '@mui/lab';

const hightlightedDays = [13, 22, 5];

const RenderDay = ({ day, DayComponentProps }) => {
	const disabled = DayComponentProps.disabled;
	const highFreq = hightlightedDays.includes(day.getDate());
	const color =
		!DayComponentProps.outsideCurrentMonth &&
		!DayComponentProps.disabled &&
		highFreq
			? red[200]
			: grey[200];

	if (!disabled) {
		return (
			<Tooltip title={highFreq ? '5 assignments' : ''} placement="right" arrow>
				<PickersDay
					{...DayComponentProps}
					sx={{ bgcolor: color, '&:hover': { bgcolor: color } }}
				/>
			</Tooltip>
		);
	} else {
		return <PickersDay {...DayComponentProps} />;
	}
};

const Picker = ({ date, onChange, label }) => {
	const handleDateChange = newDate => {
		onChange(newDate);
	};

	return (
		<LocalizationProvider dateAdapter={DateAdapter}>
			<DateTimePicker
				value={date}
				onChange={handleDateChange}
				renderInput={props => <TextField {...props} fullWidth />}
				label={label || 'Date and time picker'}
				minDate={new Date()}
				renderDay={(day, _value, DayComponentProps) => (
					<RenderDay
						day={day}
						DayComponentProps={DayComponentProps}
						key={day.getDate()}
					/>
				)}
				desktopModeMediaQuery="@media (min-width:600px)"
			/>
		</LocalizationProvider>
	);
};

export default Picker;
