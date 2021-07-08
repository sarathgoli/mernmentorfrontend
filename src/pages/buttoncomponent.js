import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Buttoncomponent(props) {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        props.fun(props.id);
      }}
    >
      {props.name}
    </Button>
  );
}
