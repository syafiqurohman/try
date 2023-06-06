import React from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = ({
  name,
  control,
  label,
  rules,
  defaultValue,
  variant = "outlined",
  helperText = "",
  options = [],
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Autocomplete
          {...rest}
          options={options}
          getOptionLabel={(option) => option.name}
          onBlur={onBlur}
          onChange={(e, newValue) => onChange(newValue)}
          value={value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label={`${label} ${rules["required"] ? "*" : ""}`}
              variant={variant}
              error={error !== undefined}
              helperText={error ? error.message : helperText}
            />
          )}
        />
      )}
    />
  );
};

export default AutoComplete;