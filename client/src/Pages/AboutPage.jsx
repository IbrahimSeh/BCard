import { Box, Divider, Grid, Typography } from "@mui/material";
import CardComponentExample from "../components/Card/CardComponentExample";

const AboutPage = () => {
  return (
    <Box mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        About Page
      </Typography>
      <Typography mb={3} variant="h5" color="blue">
        On this page you can find explanations about using the application
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <Typography variant="body1" color="initial">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            at quia harum assumenda nobis qui aut atque ad nam tempore
            distinctio mollitia sint, sit nihil velit laudantium necessitatibus
            magnam omnis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Accusamus, at quia harum assumenda nobis qui aut atque ad nam
            tempore distinctio mollitia sint, sit nihil velit laudantium
            necessitatibus magnam omnis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Accusamus, at quia harum assumenda nobis qui aut
            atque ad nam tempore distinctio mollitia sint, sit nihil velit
            laudantium necessitatibus magnam omnis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Accusamus, at quia harum assumenda
            nobis qui aut atque ad nam tempore distinctio mollitia sint, sit
            nihil velit laudantium necessitatibus magnam omnis.
          </Typography>
          <Typography variant="body1" color="initial">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            at quia harum assumenda nobis qui aut atque ad nam tempore
            distinctio mollitia sint, sit nihil velit laudantium necessitatibus
            magnam omnis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Accusamus, at quia harum assumenda nobis qui aut atque ad nam
            tempore distinctio mollitia sint, sit nihil velit laudantium
            necessitatibus magnam omnis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Accusamus, at quia harum assumenda nobis qui aut
            atque ad nam tempore distinctio mollitia sint, sit nihil velit
            laudantium necessitatibus magnam omnis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Accusamus, at quia harum assumenda
            nobis qui aut atque ad nam tempore distinctio mollitia sint, sit
            nihil velit laudantium necessitatibus magnam omnis.
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <CardComponentExample />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutPage;
