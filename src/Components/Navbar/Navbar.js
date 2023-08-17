"use client";
import { AppBar, Button, Menu, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {AiOutlineMenu} from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { withWidth } from "@material-ui/core";
import Sidebar from "@/app/(users)/Admin/Sidebar/Sidebar";
import { signOut } from "next-auth/react";

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

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const LoggedIn = searchParams.get("LoggedIn");
  const LibLogged = searchParams.get("LibLogged");

  const classes = useStyles();
  const goToLogin = () => {
    router.push(`Login/?LoginClicked=${true}`);
  };

  // const openSideBar=()=>{
  //   Sidebar.openSideBar();
  // }

  return (
    <AppBar position="static" style={{ backgroundColor: "#234" }}>
      <Toolbar>
      {/* <AiOutlineMenu onClick={openSideBar} className=""/> */}
        <Typography variant="h6" className={classes.title}>
          {LoggedIn ? (
            <div style={{ marginLeft: 20 }}> Library Management System</div>
          ) : (
            <div>Library Management System</div>
          )}
        </Typography>
        {LoggedIn ? (
          <>
            <p className="block font-medium p-4">Welcome Admin</p>
            <Button href="/" color="inherit">
              Logout
            </Button>
          </>
        ): LibLogged ? (
          <>
            <p className="block font-medium p-4">Welcome Librarian</p>
            <Button href="/"  color="inherit">
              Logout
            </Button>
          </>
        ):(
          <Button onClick={goToLogin} color="inherit">
            Login
          </Button>
        ) }
{/* 
        {!LoggedIn || !LibLogged ? (
          <Button onClick={goToLogin} color="inherit">
            Login
          </Button>
        ) :LoggedIn ? (
          <>
            <p className="block font-medium p-4">Welcome Admin</p>
            <Button href="/" color="inherit">
              Logout
            </Button>
          </>
        ):LibLogged?(
          <>
            <p className="block font-medium p-4">Welcome Librarian</p>
            <Button href="/" color="inherit">
              Logout
            </Button>
          </>
        ):''} */}
      </Toolbar>
    </AppBar>
  );
}
