import { Avatar, Container, Stack } from "@chakra-ui/react";
import AvatarWithUpload from "../../components/AvatarWithUpload/AvatarWithUpload";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import LinkBox from "../../components/LinkBox/LinkBox";
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./Profile.module.scss";
import { AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Profile = () => {
  const location = useLocation();
 
  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Breadcrumb
          items={[
            { route: "/", label: "Início" },
            { route: "/perfil", label: "Perfil" },
          ]}
        />
        <Stack spacing={8} pt={10}>
          <div className={styles.avatar}>
            <AvatarWithUpload>
              <Avatar
                size="2xl"
                name="Roberto Silva"
              />
            </AvatarWithUpload>
          </div>

          {location.pathname === "/perfil" ? (
            <Stack spacing={5}>
              <LinkBox
                to={ROUTES.EDIT_PROFILE}
                leftIcon={AiOutlineUser}
                label="Editar perfil"
              />
              <LinkBox
                to={ROUTES.CHANGE_PASSWORD}
                leftIcon={RiLockPasswordLine}
                label="Alterar senha"
              />
              <LinkBox
                to={ROUTES.DEPENDENTS}
                leftIcon={AiOutlineUsergroupAdd}
                label="Dependentes"
              />
            </Stack>
          ) : (
            <></>
          )}

          <Outlet />
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default Profile;
