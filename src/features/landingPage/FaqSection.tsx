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
    },
    heading: {
      fontWeight: 700,
      marginBottom: "1rem",
      textAlign: "center",
    },
    tagline: {
      fontWeight: 500,
      marginBottom: "2rem",
      textAlign: "center",
    },
    accordionContainer: {
      width: "100%",
      mt: 4,
    },
    accordion: {
      marginBottom: "1rem",
    },
    accordionSummary: {
      fontWeight: 600,
    },
  },
  typography: {
    heading: {
      color: "primary.main",
      fontSize: "2rem",
      sm: {
        fontSize: "2.5rem",
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
    },
  },
};

const dynamicStyles = {
  container: {
    root: {
      padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 4rem" },
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

const FAQSection = () => {
  const faqData = [
    {
      question: "What is Live Yoga Class?",
      answer:
        "A Live Yoga Class is a virtual yoga session conducted by an expert instructor in real-time. You can join from anywhere and practice yoga with a community of like-minded individuals.",
    },
    {
      question: "How do I join Group Fitness Classes?",
      answer:
        "Simply sign up, choose the class you want to join, and you'll get access to live group fitness sessions with our expert trainers.",
    },
    {
      question: "What are the benefits of Personalized Workouts?",
      answer:
        "Personalized workouts are tailored to your fitness level, goals, and preferences, ensuring more efficient progress and better results.",
    },
    {
      question: "What is Nutrition Coaching?",
      answer:
        "Nutrition coaching provides personalized guidance on healthy eating, meal planning, and achieving your fitness goals through proper nutrition.",
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
        Get answers to the most common questions about our services and how you
        can make the most of your fitness journey.
      </Typography>

      {/* FAQ Accordion */}
      <Box sx={staticStyles?.container?.accordionContainer}>
        {faqData?.map((faq, index) => (
          <Accordion key={index} sx={staticStyles?.container?.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
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
            <AccordionDetails>
              <Typography>{faq?.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQSection;
