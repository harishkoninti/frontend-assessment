
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
// import AttachmentIcon from '@mui/icons-material/Attachment';
import AttachmentIcon from '../../assets/icons/attachment.svg';
const CustomList = ({ children, keyValue, data, icon, type }) => {

    const listIcon = () => {
        return (
            icon == "circle" ?
                <CircleIcon sx={{ fontSize: 10, color: "black" }} /> : "attachment" ? <img src={AttachmentIcon} height={16} width={16} alt="attachment" /> : null
        )
    }
    const listData = () => {
        switch (type) {
            case "single":
                return (
                    <>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 0.03 }}>
                                {listIcon()}
                            </ListItemIcon>
                            <ListItemText>
                                {children}
                            </ListItemText>
                        </ListItem>
                    </>
                )
                break;
            case "multiple":
                return data.map(item => {
                    return (
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 0.03 }}>
                                {listIcon()}
                            </ListItemIcon>
                            <ListItemText>
                                <div><span style={{opacity:0.8, fontSize:"0.875rem"}}>{item[0]}</span> : {item[1]}</div>
                            </ListItemText>
                        </ListItem>
                    )
                })
                break;
            case "attachments":
                return data.map(item => {
                    return (
                    <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0.03 }}>
                            {listIcon()}
                        </ListItemIcon>
                        <ListItemText>
                            <a href={item.file_link} className="hyperLink">{item.file_label}</a>
                        </ListItemText>
                    </ListItem>
                    )
                })
                break;
            default:
        }
    }
    return (
        <>
            <List>
                {listData()}
            </List>
        </>
    )
};

export default CustomList;