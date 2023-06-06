import React from 'react'
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const Select = (props) => {

    const { name, control, label, options, rules, defaultValue, disabled = false, size = 'medium', ...rest } = props;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <FormControl
                    disabled={disabled}
                    fullWidth
                    size={size}
                    {...rest}
                    {...(error && { error: true })}>
                    <InputLabel>{`${label} ${rules['required'] ? '*' : ''}`}</InputLabel>
                    <MuiSelect
                        {...field}
                        label={`${label} ${rules['required'] ? '*' : ''}`} >
                        <MenuItem value="" disabled>Pilih {label}</MenuItem>
                        {
                            options.length &&
                            options.map(
                                item => (<MenuItem key={item.id} value={item.id} disabled={item.disabled ? item.disabled : false}>{item.name}</MenuItem>)
                            )
                        }
                    </MuiSelect>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

export default Select;