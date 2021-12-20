import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Flex } from "@chakra-ui/layout";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiBell } from "react-icons/bi";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  handleSidebar: () => void;
}
const Navbar = ({ handleSidebar }: NavbarProps) => {
  const { pathname } = useLocation();

  if (pathname === "/login") {
    return <></>;
  }

  return (
    <Box bg="primary" className={styles.navbar}>
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <IconButton
          variant="none"
          aria-label="Menu"
          fontSize="25px"
          onClick={handleSidebar}
          icon={<Icon color="white" as={GiHamburgerMenu} />}
        />
        <Link to="/">
          <Logo size="sm" type="row" />
        </Link>
        <IconButton
          variant="none"
          aria-label="Menu"
          fontSize="25px"
          icon={<Icon color="white" as={BiBell} />}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
