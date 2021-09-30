import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Zoom from "@mui/material/Zoom";
import { IDaily } from "../../../types/Daily";
import { Paper, Typography } from "@mui/material";
import TemperatureComponent from "../../../Shared/TemperatureComponent";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    width: "90%",
    height: 200,
    backgroundImage: "linear-gradient(to top, #1a2980, #26d0ce);",
    transition: "background-color .3s",
    borderRadius: 8,
    "&:hover": {
      backgroundImage: "linear-gradient(to bottom, #536976, #292e49);",
    },
  },
  dayIcon: {
    width: 40,
    color: "yellow",
    position: "absolute",
    top: 30,
    left: 5,
    height: 25,
  },
  nightIcon: {
    width: 40,
    color: "#FFD700",
    position: "absolute",
    bottom: 10,
    right: 5,
    height: 25,
  },
  content: {
    position: "relative",
    height: "100%",
    width: "100%",
    fontSize: "1.25em",
  },
  weekDay: {
    textAlign: "center",
  },
  dayTemperature: {
    margin: 25,
  },
  night: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
});

export default function Daily({ date, day, night }: IDaily) {
  const classes = useStyles();

  return (
    <>
      <Grid item={true} key={date} lg={2} xs={5}>
        <Zoom
          in={date ? true : false}
          style={{ transitionDelay: date ? "500ms" : "0ms" }}
        >
          <Paper className={classes.root}>
            <div className={classes.content}>
              <Typography variant={"h6"} className={classes.weekDay}>
                {moment(new Date(date)).format("dddd")}
              </Typography>
              <Typography variant={"h6"} className={classes.dayTemperature}>
                <TemperatureComponent temperature={day.temperature} />
              </Typography>
              <Slide
                direction={"down"}
                in={date ? true : false}
                style={{
                  transitionDelay: date ? "500ms" : "0ms",
                }}
              >
                <WbSunnyIcon className={classes.dayIcon} />
              </Slide>
              <Typography variant={"h6"} className={classes.night}>
                <TemperatureComponent temperature={night.temperature} />
              </Typography>
              <Slide
                direction={"up"}
                in={date ? true : false}
                style={{
                  transitionDelay: date ? "500ms" : "0ms",
                }}
              >
                <NightlightIcon className={classes.nightIcon} />
              </Slide>
            </div>
          </Paper>
        </Zoom>
      </Grid>
    </>
  );
}
