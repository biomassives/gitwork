import { useState } from "react";
import { supabase } from "./supabaseClient";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <Typography component="h3" variant="h4" align="center" sx={{ m: 1.5 }}>
          Welcome to Gitwork
        </Typography>

        <p>
          <Box
            sx={{
              bgcolor: "info.light",
              boxShadow: 2,
              borderRadius: 1,
              width: 3 / 4,
              color: "info.contrastText",
              mx: "auto",
              minHeight: 40,
              maxWidth: 400
            }}
          >
            <Typography
              component="h3"
              variant="subtitle2"
              align="center"
              sx={{ m: 1.5 }}
            >
              Note that you may need to enable all cookies if you are unable to
              log in.{" "}
            </Typography>
          </Box>
        </p>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: "10px",
            width: 5 / 6,
            mx: "auto",
            maxWidth: 500,
            mt: 5
          }}
        >
          <br></br>
          <p className="description">
            <Typography variant="subtitle1">
              Sign in/up via magic link with your email below
            </Typography>
          </p>

          {loading ? (
            "Sending magic link..."
          ) : (
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email </label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <br></br>
              <button className="button block" aria-live="polite">
                <Button variant="text" size="small">
                  Send magic link
                </Button>
              </button>
            </form>
          )}
          <br></br>
        </Box>
      </div>
    </div>
  );
}
