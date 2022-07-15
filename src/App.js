import "./styles.css";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";

import Auth from "./Auth";
import Account from "./Account";
import TopBar from "./routes/components/TopBar";
import Typography from "@mui/material/Typography";
import FakeTopBar from "./routes/components/FakeTopBar";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="App">
      {!session ? (
        <>
          <FakeTopBar />
          <Box
            sx={{
              bgcolor: "",
              boxShadow: 2,
              borderRadius: 7,
              width: 3 / 4,
              color: "",
              mx: "auto",
              minHeight: 450
            }}
          >
            <br></br>
            <Auth />
            <br></br>
          </Box>
        </>
      ) : (
        <>
          <TopBar />
          <Typography
            component="h1"
            variant="h3"
            align="center"
            sx={{ m: 1.5 }}
          >
            Welcome!
          </Typography>

          <Account key={session.user.id} session={session} />
        </>
      )}
    </div>
  );
}

//http://localhost:3000
