import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

const staticStyles = {
  container: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "8px",
      position: "relative",
      overflow: "hidden",
    },
    heading: {
      fontWeight: 700,
      marginBottom: "1rem",
      textAlign: "center",
      color: "#333",
    },
    tagline: {
      fontWeight: 500,
      marginBottom: "2rem",
      textAlign: "center",
      color: "#555",
      fontSize: "1.1rem",
    },
    accordionContainer: {
      width: "100%",
      mt: 4,
    },
    accordion: {
      marginBottom: "1rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
      transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
      "&:hover": {
        transform: "scale(1.02)", // Slight scaling on hover
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // Darker shadow on hover
      },
    },
    accordionSummary: {
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "#333",
    },
    accordionDetails: {
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      padding: "1rem 1.5rem",
    },
  },
  typography: {
    heading: {
      color: "primary.main",
      fontSize: "2.5rem",
      sm: {
        fontSize: "3rem",
      },
    },
    tagline: {
      color: "text.secondary",
      fontSize: "1rem",
      sm: {
        fontSize: "1rem",
      },
    },
    accordionText: {
      fontWeight: 600,
      fontSize: "1rem",
      color: "#555",
    },
  },
};

const dynamicStyles = {
  container: {
    root: {
      padding: { xs: "2rem 1rem", sm: "2rem ", md: "2rem 4rem" },
    },
  },
  typography: {
    heading: {
      fontSize: {
        xs: "2rem",
        sm: "2.5rem",
      },
    },
    tagline: {
      fontSize: {
        xs: "1rem",
        sm: "1rem",
      },
    },
    accordionText: {
      fontSize: {
        lg: "1.3rem",
        md: "1rem",
        sm: "1rem",
        xs: "1rem",
      },
    },
  },
};

const NutritionFaqSection = () => {
  const faqData = [
    {
      question: "What is Nutrition Coaching?",
      answer:
        "Nutrition coaching involves personalized guidance on eating habits, meal planning, and understanding the impact of food on your health and fitness goals. A certified nutritionist helps you create a balanced, sustainable eating plan to support your wellness journey.",
    },
    {
      question: "How can Nutrition Coaching help me achieve my fitness goals?",
      answer:
        "Nutrition coaching helps you optimize your diet according to your specific fitness goals, whether it's weight loss, muscle gain, or improving overall health. By aligning your nutrition with your training program, you'll experience faster, more sustainable results.",
    },
    {
      question: "What does a Nutrition Coaching session involve?",
      answer:
        "A typical nutrition coaching session includes an assessment of your current eating habits, lifestyle, and fitness objectives. Based on this, your coach will offer meal planning tips, suggest dietary changes, and provide ongoing support and adjustments to your plan as you progress.",
    },
    {
      question: "Is Nutrition Coaching suitable for all fitness levels?",
      answer:
        "Yes, nutrition coaching is beneficial for everyone, regardless of fitness level. Whether you're a beginner looking to eat healthier or an advanced athlete seeking to optimize performance, personalized nutrition can enhance your results and well-being.",
    },
    {
      question: "Can Nutrition Coaching help with weight management?",
      answer:
        "Absolutely! Nutrition coaching is a powerful tool for weight management. By creating a personalized plan that focuses on portion control, nutrient-dense foods, and balanced meals, you can achieve and maintain a healthy weight in a sustainable way.",
    },
    {
      question: "Do I need to follow a strict diet for Nutrition Coaching?",
      answer:
        "Nutrition coaching focuses on creating a balanced, flexible approach to eating. It's not about following a strict diet but rather learning healthy habits that work for you. Your coach will help you incorporate your preferences, lifestyle, and goals into a manageable plan.",
    },
  ];

  return (
    <Container
      sx={[staticStyles?.container?.root, dynamicStyles?.container?.root]}
    >
      {/* Section Heading */}
      <Typography
        variant="h3"
        sx={[
          staticStyles?.typography?.heading,
          dynamicStyles?.typography?.heading,
        ]}
      >
        Frequently Asked Questions
      </Typography>

      {/* Tagline */}
      <Typography
        variant="h6"
        sx={[
          staticStyles?.typography?.tagline,
          dynamicStyles?.typography?.tagline,
        ]}
      >
        Get answers to the most common questions about our nutrition services
        and how you can make the most of your fitness journey.
      </Typography>

      {/* FAQ Accordion */}
      <Box sx={staticStyles?.container?.accordionContainer}>
        {faqData?.map((faq, index) => (
          <Accordion key={index} sx={staticStyles?.container?.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#333" }} />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography
                sx={[
                  staticStyles?.typography?.accordionText,
                  dynamicStyles?.typography?.accordionText,
                ]}
              >
                {faq?.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={staticStyles?.container?.accordionDetails}>
              <Typography>{faq?.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default NutritionFaqSection;
