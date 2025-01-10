import React from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface VideoBackgroundProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  containerStyles?: SxProps<Theme>;
  videoStyles?: React.CSSProperties;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  containerStyles,
  videoStyles,
}) => {
  const defaultContainerStyles: SxProps<Theme> = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    ...containerStyles,
  };

  const defaultVideoStyles: React.CSSProperties = {
    objectFit: "cover",
    objectPosition: "top",
    width: "100%",
    height: "100%",
    ...videoStyles,
  };

  return (
    <Box sx={defaultContainerStyles}>
      <video
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        style={defaultVideoStyles}
      />
    </Box>
  );
};

export default VideoBackground;
