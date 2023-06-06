import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateInput = ({ name, control, label, rules, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={null}
            render={
                ({ field: { name, value, onChange }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            {...rest}
                            name={name}
                            value={value}
                            onChange={onChange}
                            label={`${label} ${rules['required'] ? '*' : ''}`}
                            slotProps={{ textField: { variant: 'outlined', error: error !== undefined, helperText: error ? error.message : '', fullWidth: true } }}
                        />
                    </LocalizationProvider>
                )}
        />
    )
}

export default DateInput