import {
  Container
} from "@mui/material";
import React from "react";
import NavigationSidebar from "./NavigationSidebar";

const EventManagement: React.FC = () => {


  return (
    <Container maxWidth={false}>
      <NavigationSidebar />
    </Container>
  );
};

export default EventManagement;
