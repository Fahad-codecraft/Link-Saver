import LinkWrapper from "../../components/LinkWrapper";
import { Typography } from "@mui/material";


const LinkWidget = ({
    link,
    title,
    onClick
}) => {

    return (
        <LinkWrapper>
            <Typography fontWeight="500" sx={{ color: "cyan", cursor: "pointer" }} onClick={onClick}>
                {title}
            </Typography>
            <Typography color="cyan" sx={{ cursor: "pointer" }} onClick={onClick}>
                {link}
            </Typography>
        </LinkWrapper>
    )
}

export default LinkWidget;