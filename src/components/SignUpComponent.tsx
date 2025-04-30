"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupInput) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");
      return res.json();
    },
    onSuccess: () => {
      alert("Signup successful!");
      router.push("/login");
    },
    onError: (err) => alert((err as Error).message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    mutation.mutate({ name, email, password, loggedIn: false });
  };

  return (
    <Card className="p-6" component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>
        Sign Up
      </Typography>
      <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
      <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} />
      <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
      <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" margin="normal" onChange={handleChange} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={mutation.isPending}>
        {mutation.isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </Card>
  );
}
