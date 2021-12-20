import { Container, Stack } from "@chakra-ui/react";
import LinkBox from "../../components/LinkBox/LinkBox";
import PageLayout from "../../components/PageLayout/PageLayout";
import { ROUTES } from "../../constants/routes";
import icon_churrasqueira from "../../assets/icons/churrasqueira.svg";
import icon_academia from "../../assets/icons/academia.svg";
import icon_calendario from "../../assets/icons/calendario.svg";
import icon_convites_tickets from "../../assets/icons/convites_tickets.svg";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";


const Reservations = () => {
  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Stack spacing={8}>
          <Breadcrumb
            items={[
              { route: "/", label: "Início" },
              { route: ROUTES.RESERVATIONS, label: "Reservas" },
            ]}
          />
          <Stack spacing={5}>
            <LinkBox
              leftIcon={icon_churrasqueira}
              label="Churrasqueira"
              to={ROUTES.RESERVATIONS_BARBECUE}
            />
            <LinkBox
              leftIcon={icon_academia}
              label="Academia"
              to={ROUTES.RESERVATIONS_GYM}
            />
            <LinkBox
              leftIcon={icon_calendario}
              label="Reservas realizadas"
              to={ROUTES.RESERVATIONS_HISTORY}
            />
            <LinkBox
              leftIcon={icon_convites_tickets}
              label="Convites da churrasqueira"
              to={ROUTES.RESERVATIONS_BARBECUE_INVITES}
            />
          </Stack>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default Reservations;
