import { Box, HStack, Text } from "@chakra-ui/layout";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  icon: any;
  text: string;
}

const SidebarItem = ({ icon, text }: SidebarItemProps) => {
  return (
    <Box className={`${styles.sidebarItem}`}>
        <HStack spacing={5}>
          <img alt="" src={icon} />
          <Text>{text}</Text>
        </HStack>
    </Box>
  );
};

export default SidebarItem;
