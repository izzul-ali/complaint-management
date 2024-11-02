import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"

export default function LoginPage() {
  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault()
      return
    }
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
  }

  const validateInputs = () => {
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

  return (
    <section className="h-screen flex flex-col md:flex-row gap-0 md:gap-10 p-8">
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-[90%] md:w-[380px]">
          <h1 className="text-2xl text-[#0C1421] font-semibold">
            Welcome Back 👋
          </h1>

          <span className="text-[#313957] mt-2 block">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
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
                placeholder="At least 6 characters"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
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
              className="bg-[#162D3A] text-white rounded-md p-3 mt-2"
            >
              Sign in
            </Button>
          </Box>
        </div>
      </div>

      <div className="order-first md:order-last rounded-3xl md:flex-1 h-[180px] md:h-full bg-[url('/images/login.png')] bg-cover"></div>
    </section>
  )
}
