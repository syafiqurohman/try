import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="-15px 0 15px 0">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Typography variant="h6" color={colors.blueAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;