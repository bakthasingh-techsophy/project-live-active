import { laLogo } from "@assets/index";
import { Box, Divider, Link, Typography, useTheme } from "@mui/material";

const staticStyles = (theme: any) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    background: theme?.palette?.background?.default,
    padding: "2rem",
    boxShadow: 4,
    "& *": {
      whiteSpace: "nowrap",
    },
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },
  headerText: {
    fontWeight: 700,
    background: `linear-gradient(90deg, ${theme?.palette?.primary?.main}, ${theme?.palette?.secondary?.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "1rem",
  },
  descriptionText: {
    color: theme?.palette?.text?.secondary,
    lineHeight: 1.6,
    marginBottom: "1rem",
    maxWidth: "500px",
    whiteSpace: "wrap",
  },
  rightSection: {
    display: "flex",
    flex: 2,
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    fontWeight: 600,
    color: theme?.palette?.text?.primary,
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    display: "block",
    marginBottom: "0.5rem",
  },
  contactText: {
    color: theme?.palette?.text?.secondary,
  },
  divider: {
    width: "100%",
    height: 1,
    margin: "1rem 0",
  },
  footerText: {
    textAlign: "center",
    padding: "1rem",
  },
  footerCopyright: {
    color: theme?.palette?.text?.secondary,
    fontWeight: 800,
  },
});

const dynamicStyles = {
  topSection: {
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: { xs: "2rem", sm: "2rem", md: "4rem" },
  },
  headerText: {
    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
  },
  rightSection: {
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: { xs: "2rem", sm: "2rem", md: "2rem" },
  },
};

const footerLinksData = [
  {
    header: "About Us",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Our Team", href: "/team" },
    ],
  },
  {
    header: "Quick Links",
    links: [
      { label: "Home", href: "/home" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-conditions" },
    ],
  },
];

const Footer = () => {
  const theme = useTheme();

  const customStaticStyles = staticStyles(theme);

  return (
    <Box sx={customStaticStyles?.container}>
      <Box sx={[customStaticStyles?.topSection, dynamicStyles?.topSection]}>
        <Box sx={customStaticStyles?.leftSection}>
          <Box component={"img"} src={laLogo} sx={{ width: 80 }} />
          {/* <Box sx={{ display: "flex" }}> */}
          {/* <Typography
              variant="h4"
              sx={[customStaticStyles?.headerText, dynamicStyles?.headerText]}
            >
              Live Active
            </Typography> */}
          {/* </Box> */}
          <Typography variant="body2" sx={customStaticStyles?.descriptionText}>
            Empowering you to live healthier, balanced lives with expert
            fitness, wellness, and yoga programs.
          </Typography>
        </Box>

        <Box
          sx={[customStaticStyles?.rightSection, dynamicStyles?.rightSection]}
        >
          {footerLinksData?.map((column, index) => (
            <Box key={index} sx={customStaticStyles?.column}>
              <Typography variant="h6" sx={customStaticStyles?.columnHeader}>
                {column?.header}
              </Typography>
              <Box>
                {column?.links?.map((link, index) => (
                  <Link
                    key={index}
                    href={link?.href}
                    color="textSecondary"
                    sx={customStaticStyles?.link}
                  >
                    <Typography variant="body2">{link?.label}</Typography>
                  </Link>
                ))}
              </Box>
            </Box>
          ))}

          <Box sx={customStaticStyles?.column}>
            <Typography variant="h6" sx={customStaticStyles?.columnHeader}>
              Contact Us
            </Typography>
            <Box>
              <Typography variant="body2" sx={customStaticStyles?.contactText}>
                1234 Fitness Lane,
                <br />
                Wellness City, Country
                <br />
                Email: support@company.com
                <br />
                Phone: +1 (234) 567-8901
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={customStaticStyles?.divider} />

      <Box sx={customStaticStyles?.footerText}>
        <Typography variant="body2" sx={customStaticStyles?.footerCopyright}>
          &copy; {new Date().getFullYear()} Live Active. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
