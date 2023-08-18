"use client";
import { AppBar, Button, Menu, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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
  const [adminLogged, setAdminLogged] = useState(false);
  const [librarianLogged, setLibrarianLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        if (userEmail === "admin@gmail.com") {
          setAdminLogged(true);
        } else {
          setLibrarianLogged(true);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, );
  const router = useRouter();
  const searchParams = useSearchParams();
  const LoggedIn = searchParams.get("LoggedIn");
  const LibLogged = searchParams.get("LibLogged");

  const classes = useStyles();
  const goToLogin = () => {
    router.push('/signin');

  };
 
  
  const onSignOutHandler = () => {
    signOut(auth).then(()=>{
      toast("Signed Out successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
        position: "top-center",
      });
      router.push('/')
    }).catch((error)=>{
      console.log("Error occured while signing out");
    })
  };
 
  return (
    <AppBar position="static" style={{ backgroundColor: "#234" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {LoggedIn ? (
            <div style={{ marginLeft: 20 }}> Library Management System</div>
          ) : (
            <div>Library Management System</div>
          )}
        </Typography>
        <>
          {adminLogged && (
            <p className="block font-medium p-4">Welcome Admin</p>
          )}
          {librarianLogged && (
            <p className="block font-medium p-4">Welcome Librarian</p>
          )}
          {adminLogged || librarianLogged ? (
            <Button onClick={onSignOutHandler} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={goToLogin} color="inherit">
              Login
            </Button>
          )}
        </>
     
      </Toolbar>
    </AppBar>
  );
}
