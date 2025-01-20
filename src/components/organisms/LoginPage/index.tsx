import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { useAuth } from "../../../hooks/useAuth"

export default function LoginPage() {
  const auth = useAuth()

  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (emailError || passwordError) {
      return
    }

    const data = new FormData(event.currentTarget)

    const error = await auth?.login({
      email_phone: data.get("email")?.toString() ?? "",
      password: data?.get("password")?.toString() ?? "",
    })

    if (error) {
      setEmailError(true)
      setPasswordError(true)
      setPasswordErrorMessage(error)
    }
  }

  const validateInputs = () => {
    setEmailError(true)
    setEmailErrorMessage("")
    setPasswordError(true)
    setPasswordErrorMessage("")

    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage("Please enter a valid email address.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage("Password must be at least 6 characters long.")
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  if (auth?.user) return <></>

  return (
    <section className="h-screen flex flex-col md:flex-row gap-0 md:gap-10 p-8">
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-[90%] md:w-[380px]">
          <h1 className="text-2xl text-[#0C1421] font-semibold">
            Welcome Back 👋
          </h1>

          <span className="text-[#313957] mt-2 block">
            Please login to access your account.
          </span>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              marginTop: 3,
            }}
          >
            <FormControl>
              <FormLabel
                htmlFor="email"
                className="text-sm text-[#0C1421] mb-1 font-medium"
              >
                Email
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{
                  ariaLabel: "email",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                    height: "48px",
                    border: "1px solid #D4D4D4",
                    width: "100%",
                    backgroundColor: "#F7FBFF",
                  },
                  "& .MuiFormHelperText-root": {
                    margin: 0,
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="password"
                className="text-sm text-[#0C1421] mb-1 font-medium"
              >
                Password
              </FormLabel>

              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="Your password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                    height: "48px",
                    border: "1px solid #D4D4D4",
                    width: "100%",
                    backgroundColor: "#F7FBFF",
                  },
                  "& .MuiFormHelperText-root": {
                    margin: 0,
                  },
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              className="rounded-md p-3 mt-2"
            >
              Sign in
            </Button>
          </Box>
        </div>
      </div>

      <div className="order-first md:order-last rounded-3xl md:w-[40%] h-[180px] md:h-full flex flex-col gap-3 items-center justify-center bg-[#E2F0FF] relative">
        <img src="/images/login-icon.png" alt="login" className="w-[50%]" />

        <h1 className="text-secondary mt-5 text-2xl font-bold">
          Complaint Management System
        </h1>
        <p className="text-secondary400 text-sm text-center">
          Lorem ipsum dolor sit, amet consectetur <br /> adipisicing elit. Modi,
          quas?
        </p>
        <p className="absolute bottom-10 w-full text-center text-xs text-slate-400 tracking-wide">
          Copyright ©2024 Developer Complaint Management System <br /> All
          Rights Reserved
        </p>
      </div>
    </section>
  )
}
