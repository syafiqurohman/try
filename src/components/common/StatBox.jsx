import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h2" sx={{ color: colors.grey[200] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: colors.blueAccent[500] }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
