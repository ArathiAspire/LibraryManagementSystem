'use client'
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const links=[
  {
   id:1,
   title:"Home",
   url:"/Admin" ,
  },
  {
    id:2,
    title:"About",
    url:"/StudentList" ,
   },
   {
    id:3,
    title:"Contact",
    url:"/BookList" ,
   }
   
]

export default function Navbar() {
  const classes = useStyles();
  return (
    
    <AppBar position="static" style={{ backgroundColor: "#234" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Library Management System
        </Typography>
        <Button href="/Login" color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
