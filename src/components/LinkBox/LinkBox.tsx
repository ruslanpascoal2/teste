import { Box, HStack, Icon,  Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./LinkBox.module.scss";
import { FaChevronRight } from "react-icons/fa";
interface LinkBoxProps {
  label: string;
  leftIcon?: any;
  to: string;
}

const LinkBox = ({ label, leftIcon, to }: LinkBoxProps) => {
  console.log();
  
  return (
    <RouterLink to={to}>
      <Box className={styles.linkBox}>
        <HStack spacing={4}>
          {leftIcon && (typeof leftIcon === 'string') ? <img alt="" style={{height: '16px'}} src={leftIcon}/> : <Icon as={leftIcon} />}
          <Text>{label}</Text>
        </HStack>
        <Icon as={FaChevronRight} />
      </Box>
    </RouterLink>
  );
};

export default LinkBox;
