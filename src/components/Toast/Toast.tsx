import { Box, Text } from "@chakra-ui/layout"
import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import styles from "./Toast.module.scss";
import { BiBell} from "react-icons/bi";
import { FiAlertTriangle, FiCheckCircle} from "react-icons/fi";

interface ToastProps{
    type: "error" | "success" | "alert",
    message: string
}

const Toast = ({
    type, message
}: ToastProps) => {
    
    let icon;
    switch (type) {
        case 'error':
            icon = FiAlertTriangle
            break;
        case 'success':
            icon = FiCheckCircle 
            break;
        case 'alert':
            icon = BiBell
            break;
        default:
            break;
    }

    return (
        <Box p={3} className={`${styles.toast}`}>
            <Flex alignItems="center">
                <Icon marginRight={4} as={icon} className={`${styles[type]}`} />
                <Text className={`${styles.message}`}>{message}</Text>
            </Flex>
        </Box>
    )
}

export default Toast;