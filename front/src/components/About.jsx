import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Button, Divider, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AboutCompo() {
  const theme = useTheme();
  const { t } = useTranslation();

  const sectionStyle = {
    maxWidth: "750px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  };

  const headingColor = theme.custom.mycustomblur.text;
  const textColor = theme.custom.mycustomblur.text;

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        minHeight: "calc(100vh - 64px)",
        px: { xs: 2, md: 4 },
        py: 4,
        color: textColor,
      }}
    >
      <div
        className="read-glass-shell"
        style={{
          backgroundColor: theme.custom.mycustomblur.main,
          boxShadow: theme.custom.mycustomblur.boxShadow,
          WebkitBackdropFilter: theme.custom.mycustomblur.blur,
          backdropFilter: theme.custom.mycustomblur.blur,
          padding: "2rem 1.5rem",
          height: "auto",
        }}
      >
        {/* Titre principal */}
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: "center", color: headingColor, mb: 4, mt: 2 }}
        >
          <span style={{ fontFamily: "'Lettrine', serif", fontSize: "1.4em" }}>
            {t("about.pageTitle")[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
          </span>
          <span style={{ fontFamily: "'Titre', serif", fontSize: "1.4em" }}>
            {t("about.pageTitle").slice(1)}
          </span>
        </Typography>

        {/* Section : Qui suis-je */}
        <Box sx={{ ...sectionStyle, mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: headingColor, mb: 1.5, fontFamily: "'Titre', serif", textAlign: "center" }}
          >
            {t("about.whoTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
          >
            {t("about.whoText")}
          </Typography>
        </Box>

        <Divider sx={{ maxWidth: "750px", margin: "0 auto 1.5rem" }} />

        {/* Section : Ce que je fais */}
        <Box sx={{ ...sectionStyle, mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: headingColor, mb: 1.5, fontFamily: "'Titre', serif", textAlign: "center" }}
          >
            {t("about.workTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
          >
            {t("about.workText")}
          </Typography>
        </Box>

        <Divider sx={{ maxWidth: "750px", margin: "0 auto 1.5rem" }} />

        {/* Section : Mon livre */}
        <Box
          sx={{
            ...sectionStyle,
            mb: 4,
            textAlign: "center",
          }}
        >
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: headingColor, mb: 1.5, fontFamily: "'Titre', serif", textAlign: "center" }}
        >
          {t("about.bookTitle")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.8, mb: 2.5, textAlign: "justify" }}
        >
          {t("about.bookText")}
        </Typography>
        <Button
          variant="contained"
          href={t("about.bookLink")}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<ShoppingCartIcon />}
          sx={{
            backgroundColor: theme.custom.mymodal.button,
            color: theme.custom.mymodal.text,
            px: 3,
            py: 1,
            borderRadius: "8px",
            fontFamily: "'Titre', serif",
            "&:hover": {
              filter: "brightness(1.2)",
            },
          }}
        >
          {t("about.buyButton")}
        </Button>
        </Box>
      </div>
    </Box>
  );
}
