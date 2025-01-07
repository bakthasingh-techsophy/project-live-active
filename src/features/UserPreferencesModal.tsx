import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Modal,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  interface UserPreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  
  const preferencesData = [
    {
      id: "gymAndWellness",
      title: "Gym & Wellness",
      image:
        "https://img.freepik.com/free-photo/group-people-exercising-together-outdoors_23-2151061449.jpg?t=st=1736241962~exp=1736245562~hmac=3a04566aca9a0e8e053e316ee6eb371397039e3ea0a209d1e9819f1d360b8baa&w=1380",
    },
    {
      id: "yoga",
      title: "Yoga",
      image:
        "https://img.freepik.com/free-photo/people-doing-yoga-sunset_23-2150847953.jpg?t=st=1736242651~exp=1736246251~hmac=ed33fd4a07d68820b128de82f33b5e4ea65dcfba87e6b3f9a8a140349e77a323&w=1380",
    },
    {
      id: "meditation",
      title: "Meditation",
      image:
        "https://img.freepik.com/free-photo/group-young-yogi-people-sitting-sukhasana-exercise_1163-4945.jpg?t=st=1736241977~exp=1736245577~hmac=019255c62cd36da8aaa2ec08aa58220e849725d8daf096f4fc646e180896934d&w=1380",
    },
    {
      id: "nutrition",
      title: "Nutrition",
      image:
        "https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg?t=st=1736242103~exp=1736245703~hmac=853e209d49206781d213043f6801dcc0abb9122ca5ad5a5ac5d050e0e3f91e29&w=1380",
    },
  
    {
      id: "equipment",
      title: "Equipment",
      image:
        "https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114220.jpg?t=st=1736242140~exp=1736245740~hmac=a1a60e0590c81739fbf1ec6ce9b7b39d6e1096c47d64cadb7f2e1f8bdcff7990&w=996",
    },
  ];
  
  const UserPreferencesModal = ({ open, setOpen }: UserPreferencesModalProps) => {
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  
    const handleCardClick = (id: string) => {
      setSelectedPreferences((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };
  
    const handleSave = () => {
      console.log("Selected Preferences:", selectedPreferences);
      setOpen(false);
    };
  
    return (
      <Modal
        open={open}
        onClose={(e: any) => e.preventDefault()}
        disableAutoFocus
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              lg: "60%",
              sm: "60%",
              md: "60%",
              xs: "95%",
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "auto",
            p: 4,
            maxHeight: '90%'
          }}
        >
          <Typography variant="h4" mb={2} textAlign="center" color="text.secondary">
            Select Preferences
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {preferencesData.map((preference) => (
              <Card
                key={preference.id}
                sx={{
                  width: {
                    lg: "30%",
                    md: "30%",
                    sm: "40%",
                    xs: "100%",
                  },
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  border: selectedPreferences.includes(preference.id)
                    ? "3px solid primary.main"
                    : "none",
                  boxShadow: selectedPreferences.includes(preference.id)
                    ? "0 0 10px 2px rgba(0, 0, 0, 0.2)"
                    : "none",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(preference.id)}>
                  <CardContent
                    sx={{
                      height: 150,
                      backgroundImage: `url(${preference.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                      }}
                    />
                    <Typography
                      variant="h6"
                      textAlign="center"
                      sx={{ zIndex: 2 }}
                    >
                      {preference.title}
                    </Typography>
                    {selectedPreferences.includes(preference.id) && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 2,
                          color: "#000",
                        }}
                      >
                        ✓
                      </Box>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ width: "200px" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default UserPreferencesModal;
  