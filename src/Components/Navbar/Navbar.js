"use client";
import {
  AppBar,
  Avatar,
  Button,
  Logout,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
  Paper,
  MenuList,
  Popper,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { green } from "@mui/material/colors";

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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const username = useSelector((state) => state.authReducer.value.username);

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
      } else {
        setAdminLogged(false);
        setLibrarianLogged(false);
      }
    });
    return () => {
      unsubscribe();
    };
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const LoggedIn = searchParams.get("LoggedIn");
  const LibLogged = searchParams.get("LibLogged");

  const classes = useStyles();
  const goToLogin = () => {
    router.push("/signin");
  };

  const onSignOutHandler = () => {
    signOut(auth)
      .then(() => {
        toast("Signed Out successfully", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "success",
          position: "top-center",
        });
        router.push("/");
      })
      .catch((error) => {
        console.log("Error occured while signing out");
      });
      dispatch(logOut())
  };
  const userMenu = (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar sx={{ width: 32, height: 32,backgroundColor:'white',color:'black'}}>
          {adminLogged ? "A" : "L"}
        </Avatar>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>{username}</MenuItem>
                  <MenuItem onClick={onSignOutHandler}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
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
        <ul className={`${classes.title} flex space-x-10 pr-20 space-around`}>
          <li>
            <Link href="/" className="text-white hover-text-blue">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white">
              About Us
            </Link>
          </li>
        </ul>
        <>
          {(adminLogged || librarianLogged) && userMenu}

          {adminLogged && (
            <p className="block font-medium p-4">Welcome Admin</p>
          )}
          {librarianLogged && (
            <p className="block font-medium p-4">Welcome Librarian</p>
          )}
          {adminLogged || librarianLogged ? (
            ""
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
