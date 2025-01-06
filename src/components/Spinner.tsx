import ClipLoader from "react-spinners/ClipLoader";
import { Backdrop, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import COLORS from "../theme/colors.json";
import { useSelector } from "react-redux";

export const Spinner = () => {
  const isLoading = useSelector((state: any) => state.isLoading);
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    spinnerRoot: {
      color: theme.palette.background.default,
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    spinnerWrapper: {
      position: "fixed",
      backgroundColor: theme.palette.background.default,
      width: "100%",
      height: "100%",
      opacity: "0.5",
      zIndex: 9999,
    },
    backdrop: {
      zIndex: 10000,
      color: theme.palette.primary.main,
      backgroundColor: "#RRGGBBAA",
    },
    preLoaderSpin: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
    },
    loaderText: {
      position: "relative",
      color: theme.palette.text.primary,
      margin: "10px 0 0 0",
      "&::after": {
        content: '""',
        width: "20px",
        display: "inline-block",
        fontWeight: "bold",
        animation: "$loadingText 3s infinite",
      },
    },
    "@keyframes loadingText": {
      "0%": {
        content: '""',
      },
      "25%": {
        content: '"."',
      },
      "50%": {
        content: '".."',
      },
      "75%": {
        content: '"..."',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <div className={classes.preLoaderSpin}>
        <ClipLoader color={"#025e5e"} loading={isLoading} size={24} />
        <p className={classes.loaderText}>Loading please wait</p>
      </div>
    </Backdrop>
  );
};
