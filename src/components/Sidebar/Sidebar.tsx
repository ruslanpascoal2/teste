import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Avatar,
  Heading,
  Stack,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/icons";
import styles from "./Sidebar.module.scss";
import { useEffect } from "react";
import { MENUS } from "../../constants/menus";
import SidebarItem from "../SidebarItem/SidebarItem";
import { FiPower } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
interface SidebarProps {
  sidebarIsOpen: boolean;
  handleClose: () => void;
}

const Sidebar = ({ sidebarIsOpen, handleClose }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (sidebarIsOpen === true) {
      onOpen();
    }
  }, [sidebarIsOpen, onOpen]);

  const handleSidebarClose = () => {
    onClose();
    handleClose();
  };


  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut(() => {
      onClose();
      handleClose();
      navigate('/login', {replace: true});
      //to do: implementar serviço de logout quando ele for criado no BACKEND
    });
  }

  const SidebarHeader = () => {
    return (
      <Flex className={`${styles.sidebarHeader}`}>
        <Avatar
          size="lg"
          name="Roberto Silva"
          marginRight={5}
        />
        <Stack spacing={0}>
          <Heading size="md" color="white">
            Roberto Silva
          </Heading>
          <Text className={`${styles.sidebarHeaderLink}`}>
            <RouterLink to="/perfil" onClick={handleSidebarClose}>
              <small>Visualizar perfil</small>
            </RouterLink>
          </Text>
        </Stack>
      </Flex>
    );
  };

  const SidebarFooter = () => {
    return (
      <Flex
        className={`${styles.sidebarFooter}`}
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Link onClick={logout}>
          <HStack spacing={4}>
            <Icon as={FiPower} />
            <Text>Sair</Text>
          </HStack>
        </Link>
        <small>Versão 1.0</small>
      </Flex>
    );
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={handleSidebarClose}>
      <DrawerOverlay />
      <DrawerContent className={`${styles.sidebarContent}`} bg="primary">
        <DrawerCloseButton color="white" />
        <DrawerHeader>
          <SidebarHeader />
        </DrawerHeader>

        <DrawerBody>
          <Stack >
            {MENUS.map((menu, index) => (
             <RouterLink to={menu.route} key={index} onClick={handleSidebarClose}>
                <SidebarItem   icon={menu.icon} text={menu.text}/>
             </RouterLink>
            ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <SidebarFooter />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
