"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdMenu } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth-check");
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setAuthenticated(false);
    router.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MdMenu />
          </IconButton>
          <div className="w-full flex justify-start items-center">
            <Link className="w-[100px]" href={"/"}>
              <p>News Blogs</p>
            </Link>
          </div>
          {authenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              User
            </Button>
          ) : path === "/login" ? null : (
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
