import { Box } from "@mui/material";

export default function Message({message}){
    return (
        <Box className="flex text-sm">
            <span className="font-semibold">You: <span className="font-normal">{message}</span></span>
        </Box>
    )
}