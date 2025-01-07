import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FAQSection = () => {
  const theme = useTheme();

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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "2rem 1rem", sm: "3rem 2rem", md: "4rem 4rem" },
        // backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        // boxShadow: 3,
      }}
    >
      {/* Section Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.5rem" },
          color: theme.palette.primary.main,
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Tagline */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: { xs: "1rem", sm: "1rem" },
          color: theme.palette.text.secondary,
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Get answers to the most common questions about our services and how you
        can make the most of your fitness journey.
      </Typography>

      {/* FAQ Accordion */}
      <Box sx={{ width: "100%" }}>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: "1rem" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: {
                    lg: "1.3rem",
                    md: "1rem",
                    sm: "1rem",
                    xs: "1rem",
                  },
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQSection;
