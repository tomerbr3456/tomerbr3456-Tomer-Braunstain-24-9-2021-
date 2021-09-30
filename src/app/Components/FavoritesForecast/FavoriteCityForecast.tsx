import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import TemperatureComponent from "../../Shared/TemperatureComponent";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    transition: "transform .3s ease",
    width: 300,
    backgroundColor: "#1976d2",
    height: 300,
    borderRadius: 8,
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  content: {
    display: "flex",
    width: "100%",
    height: "100%",
    fontSize: "1.25em",
    fontWeight: 700,
    color: "#fff",
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  description: {
    fontSize: "1em",
  },
  homePageLink: {
    width: "100%",
    height: "100%",
  },
});

function Favorite(props: {
  name: string;
  temperature: number;
  description: string;
  cityName: string;
  id: string;
}) {
  const { name, temperature, description, cityName, id } = props;
  const classes = useStyles({});

  return (
    <>
      <Grid
        component={Link}
        to={{
          pathname: `Home/:${id}`,
          state: { id, name: cityName },
        }}
        style={{
          textDecoration: "none",
        }}
        item={true}
        key={name}
        lg={4}
        xs={12}
      >
        <Paper className={classes.root}>
          <div className={classes.content}>
            <Typography variant={"h6"}>{cityName}</Typography>
            <Typography variant={"h2"}>
              <TemperatureComponent temperature={temperature} />
            </Typography>
            <div className={classes.description}>{description}</div>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
export default Favorite;
