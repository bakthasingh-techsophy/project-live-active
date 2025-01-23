import { Avatar, Button, Popover, Stack, Typography } from "@mui/material";
import { AccountProps } from "@toolpad/core/Account";
import * as React from "react";
import { useState } from "react";

// eslint-disable-next-line no-empty-pattern
const Account = ({}: AccountProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle opening and closing the popover
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine if the user is logged in or not
  const isLoggedIn = false; // Replace this with your actual authentication check

  return (
    <div>
      {/* Account Preview */}
      {isLoggedIn ? (
        <div>
          <Button onClick={handleClick}>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              User
            </Typography>
          </Button>

          {/* Popover Menu */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Stack sx={{ p: 2 }}>
              <Typography variant="body2">Profile</Typography>
              <Button variant="outlined" onClick={() => alert("Sign Out")}>
                Sign Out
              </Button>
            </Stack>
          </Popover>
        </div>
      ) : (
        // If not logged in, show sign-in button
        <Button onClick={() => alert("Sign In")}>Sign In</Button>
      )}
    </div>
  );
};

export { Account };
