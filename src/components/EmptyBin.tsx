import { emptyBinPic } from "@assets/index";
import { Box, Typography, Button } from "@mui/material";

interface EmptyBinProps {
  setSelectedEvent: any;
  onClick: () => void;
  isShowButton: boolean;
  buttonText: string;
}
const EmptyBin = ({
  setSelectedEvent,
  onClick: handleOpenModal,
  isShowButton,
  buttonText,
}: EmptyBinProps): React.ReactNode => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <img
          src={emptyBinPic}
          alt="No Events"
          style={{ maxWidth: "300px", width: "100%", height: "auto" }}
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        No Events Yet
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        It looks like you don't have any events at the moment. To get started,
        create your first event by clicking the button below.
      </Typography>
      {isShowButton && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            setSelectedEvent(null);
            handleOpenModal();
          }}
          sx={{
            marginTop: "20px",
            padding: "15px 30px",
            fontSize: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};
export default EmptyBin;
