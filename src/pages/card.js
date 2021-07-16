import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import Typography from "@material-ui/core/Typography";
import { Link, NavLink } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreVert";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import {bounce} from "./scrolling.css";

const TTypography = withStyles({
  root: {
    color: "#0244fa",
    font: "bold"
  }
})(Typography);

const PTypography = withStyles({
  root: {
    color: "#d90404"
  }
})(Typography);

const RTypography = withStyles({
  root: {
    color: "#3b025e"
  }
})(Typography);

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14,
    color:"#fcca03"
  },
  pos: {
    marginBottom: 12
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  // console.log(user);

  return (
    <Card className={classes.root} variant="outlined">
      {props.page === "dashboard" ?
        <CardHeader
          action={
            <NavLink to={`/editpost/${props._id}`}>
              <EditIcon />
            </NavLink>
          }
          titleTypographyProps={{ variant: "body1",color:"#fcca03"}}
          title={props.title}
          subheader={props.time}
        />
       :props.admin === true ?(
        <CardHeader
          action={
              <Button onClick = {() => {
                props.fun(props._id)
              }}>
              <DeleteIcon />
              </Button>
          }
          titleTypographyProps={{ variant: "body1",color:"#fcca03"}}
          title={props.title}
          subheader={props.time}
        />
      )
        : (
        <CardHeader
          titleTypographyProps={{ variant: "body1",color:"#fcca03"}}
          title={props.title}
          subheader={props.time}
        />
        )
      }
      <CardContent>
        <p>
          Company Name:
          <span style={{ color: "#a60056" }}>{props.companyname}</span>
        </p>
        <p>
          Role:<span style={{ color: "#a60056" }}>{props.role}</span>
        </p>
        <div class="bounce">
        <p>Post content starts from below... </p>
        </div>
        <div style={{ height: 150, overflowY: "scroll", marginTop: 10 }}>
          <div dangerouslySetInnerHTML={{ __html: props.desc }} />
        </div>
      </CardContent>
      <CardActions>
        <Link to={`/displayingpost/${props._id}`}>
          <Button size="small">Learn More</Button>
        </Link>
        <span></span>
        <p style={{ color: "#d90404" }}>
          posted by <span style={{ color: "#3b025e" }}>{props.username}</span>
        </p>
      </CardActions>
    </Card>
  );
}
