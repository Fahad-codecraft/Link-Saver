import { Box, Typography, useMediaQuery } from "@mui/material"
import Form from "./Form"

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");
  return (
      <Box>
        <Box
          width="100%"
          backgroundColor="#0c0c0f"
          p="1rem 6%"
          textAlign="center"

        >
          <Typography fontWeight="bold" fontSize="32px" color="#e52b64">
            LinkSaver
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography fontSize="40px" color="#e52b64">
            Welcome To LS
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "28rem" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor="#0c0c0f"
        >
          <Form />
        </Box>
      </Box>
  )
}

export default LoginPage
