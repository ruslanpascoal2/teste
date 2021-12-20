import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout/PageLayout";
import PolicyAgreement from "../../../components/PolicyAgreement/PolicyAgreement";
import styles from "./Barbecue.module.scss";
import CustomCalendar from "../../../components/Calendar/Calendar";
import { ROUTES } from "../../../constants/routes";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import CustomStepper from "../../../components/Stepper/Stepper";
import barbecueImg from "../../../assets/img/barbecue_image.svg";
import inviteBgImg from "../../../assets/img/churrasqueira.jpg";
import inviteBgImgDesktop from "../../../assets/img/churrasqueira_desktop.jpg";
import userIcon from "../../../assets/icons/user.svg";
import watchIcon from "../../../assets/icons/watch.svg";
import calendarIcon from "../../../assets/icons/calendar.svg";
import Actions from "../../../components/Actions/Actions";
import ActionButton from "../../../components/ActionButton/ActionButton";
import moment from "moment";
import { useFacilitiesService } from "../../../services/facilities.service";
import { useMutation, useQuery } from "react-query";
import { Facility } from "../../../models/facility.model";
import Loading from "../../../components/Loading/Loading";
import { FacilityReserve } from "../../../models/facility-reserve.model";
import Toast from "../../../components/Toast/Toast";

const policiyText = (
  <div>
    <p>
      <b>REGULAMENTO DO SETOR DE CHURRASQUEIRAS</b>
    </p>
    <br />
    <p>
      {" "}
      Aprovado pelo Conselho Deliberativo nas reuniões extraordinárias de
      26/2/2013, 26/3/2013 e 23/4/2013.
    </p>
    <br />
    <p>
      <b>DISPOSIÇÕES PRELIMINARES</b>
    </p>
    <br />
    <p>
      Art. 1o - O presente regulamento tem por finalidade disciplinar a
      utilização das instalações do Setor de Churrasqueiras do Iate Clube de
      Brasília. Art. 2o - As Churrasqueiras são classificadas como: I. Pequenas,
      as de números P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12. II.
      Médias, as de números M1, M2, M3, M4 III. Gourmet grandes, as de números
      G1, G2, G3 E G4. Parágrafo único. As reclassificações e as renumerações
      das churrasqueiras serão efetuadas pelo Conselho Diretor de acordo com as
      necessidades futuras. Art. 3o - Poderá fazer uso gratuito das instalações
      do Setor os sócios patrimoniais e usuário no pleno gozo de seus direitos
      estatutários e em dia com suas obrigações.
    </p>
    <br />
    <p>
      <b>DA RESERVA DE CHURRASQUEIRA</b>
    </p>
    <br />
  </div>
);

enum BarbecuePageViews {
  POLICIY,
  SELECT_BARBECUE,
  RESERVE_BARBECUE,
  EMIT_INVITES,
}

interface SelectBarbecueProps {
  onItemSelect: (item: Facility, date: string) => void;
}
const SelectBarbecue = ({ onItemSelect }: SelectBarbecueProps) => {
  const [date, setDate] = useState({
    rawDate: new Date(),
    formattedDate: moment(new Date()).format("YYYY-MM-DD"),
  });
  const [results, setResults] = useState<Facility[]>([]);

  const facilitiesService = useFacilitiesService();

  const handleDateChange = (date: Date) => {
    const formatted = moment(date).format("YYYY-MM-DD");
    setDate({ rawDate: date, formattedDate: formatted });
  };

  const { isLoading } = useQuery<Facility[], Error>(
    "listaChurrasqueiras",
    async () => {
      return await facilitiesService.getFacilities(
        "churrasqueira",
        date.formattedDate
      );
    },
    {
      onSuccess: (data: Facility[]) => {
        setResults(data);
      },
      onError: (err) => console.error(err),
    }
  );

  return (
    <Box>
      {isLoading ? (
        <Flex justifyContent={"center"} paddingTop={"100px"}><Loading /></Flex>
      ) : (
        <>
          <Stack alignSelf="center">
            <Box width="fit-content" alignSelf="center">
              <CustomCalendar
                minDate={new Date()}
                onChange={(item) => handleDateChange(item)}
                date={date.rawDate}
              />
            </Box>
            <Box w={["100%", "75%", "50%"]} alignSelf="center">
              <Stack spacing={4} pt={5}>
                {results.map((item: Facility, index) => (
                  <Box key={index} className={styles.reservationListItem}>
                    <Stack marginRight={3}>
                      <Text fontWeight="bold" color="gray">
                        {item.descricao}
                      </Text>
                      <Stack spacing={0}>
                        <HStack>
                          <Text fontSize={12} color="gray.600">
                            Diurno:{" "}
                          </Text>
                          <Text fontSize={12} color="primary" fontWeight={500}>
                            {item.diurno}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontSize={12} color="gray.600">
                            Noturno:{" "}
                          </Text>
                          <Text fontSize={12} color="primary" fontWeight={500}>
                            {item.noturno}
                          </Text>
                        </HStack>
                      </Stack>
                    </Stack>
                    <Button
                      minW="fit-content"
                      size="sm"
                      onClick={() => onItemSelect(item, date.formattedDate)}
                      disabled={item.diurno === "OCUPADO"}
                    >
                      Reservar
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
};

interface ConfirmReservationProps {
  selectedBarbecue: FacilityReserve;
  emitInvites: () => void;
}
const ConfirmReservation = ({
  selectedBarbecue,
  emitInvites,
}: ConfirmReservationProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();
  const facilityService = useFacilitiesService();
  const toast = useToast();
  const nextStep = () => {
    setCurrentStep((old) => {
      return old + 1;
    });
  };
  const backToList = () => {
    window.location.reload();
  };

  const backToBegin = () => {
    navigate("/reservas", { replace: true });
    localStorage.setItem("reservationPolicyRead", "false");
  };

  const showToast = (data: any, type: "error" | "success") => {
    toast({
      render: () => (
        <Toast
          type={type}
          message={type === "error" ? "Erro ao confirmar reserva." : data.data}
        />
      ),
      duration: 5000,
      isClosable: false,
    });
  };

  const mutation = useMutation(
    (data: FacilityReserve) => {
      let payload = {
        ...data,
      };
      delete payload.facility;
      return facilityService.reserveFacility(payload);
    },
    {
      onSuccess: () => nextStep(),
      onError: (err: any) => {
        showToast(err, "error");
      },
    }
  );

  const handleConfirmReservation = () => {
    mutation.mutate(selectedBarbecue);
  };

  const handleCancelReservation = () => {
    //chama api
  };

  const getHeading = () => {
    switch (currentStep) {
      case 0:
        return "Pronto para se divertir?";
      case 1:
        return "Pronto, reserva feita!";

      default:
        return "";
    }
  };

  const getActionButtons = () => {
    switch (currentStep) {
      case 0:
        return (
          <Actions justify="center">
            <ActionButton
              variant="outline"
              onClick={backToList}
              disabled={mutation.isLoading}
            >
              Voltar
            </ActionButton>
            <ActionButton
              onClick={handleConfirmReservation}
              disabled={mutation.isLoading}
              isLoading={mutation.isLoading}
              loadingText="Processando"
            >
              Confirmar reserva
            </ActionButton>
          </Actions>
        );
      case 1:
        return (
          <Actions justify="center">
            <ActionButton variant="outline" onClick={backToBegin}>
              Voltar
            </ActionButton>
            <ActionButton variant="danger" onClick={handleCancelReservation}>
              Cancelar reserva
            </ActionButton>
            <ActionButton autoFocus={true} onClick={emitInvites}>
              Emissão de convites
            </ActionButton>
          </Actions>
        );

      default:
        break;
    }
  };

  return (
    <Stack spacing={3} pt={14}>
      <Stack alignSelf="center" spacing={4}>
        <Image
          height={["150px", "175px", "190px"]}
          alt="Churrasqueira"
          src={barbecueImg}
        />
        <Heading textAlign="center" alignItems="center" color="primary">
          {getHeading()}
        </Heading>
      </Stack>
      <CustomStepper
        activeStep={currentStep}
        steps={[
          { label: "Reserva" },
          { label: "Confirmação" },
          { label: "Concluído" },
        ]}
      />
      <Flex justifyContent="center" width={["100%"]}>
        <Stack pt={4} color="gray.500">
          <Heading mb={2} size="md" color="primary">
            {selectedBarbecue?.facility?.descricao}
          </Heading>
          <HStack>
            <Image src={calendarIcon} alt="Data" />
            <small>
              {selectedBarbecue &&
                moment(selectedBarbecue?.dataLocacao).format("DD/MM/YYYY")}
            </small>
          </HStack>
          <HStack>
            <Image src={watchIcon} alt="Horário" />
            <small>08:00 às 22:00</small>
          </HStack>
          <HStack>
            <Image src={userIcon} alt="Titular" />
            <small>Nome do usuário</small>
          </HStack>
        </Stack>
      </Flex>
      <Box alignSelf="center" py={7} textAlign="start">
        {currentStep === 1 ? (
          <p>
            <small>
              <b>Importante:</b> O cancelamento deverá ser feito até <br /> 72
              horas antes da data marcada para utilização da <br />{" "}
              churrasqueira.
            </small>
          </p>
        ) : (
          <></>
        )}
      </Box>
      {getActionButtons()}
    </Stack>
  );
};

interface EmitInvitesProps {
  selectedBarbecue: FacilityReserve;
  submitInvite: () => void;
}
const EmitInvites = ({ selectedBarbecue, submitInvite }: EmitInvitesProps) => {
  const handleSubmitInvite = () => {
    submitInvite();
  };

  let backgroundImg = useBreakpointValue({
    base: inviteBgImg,
    md: inviteBgImgDesktop,
  });
  let backgroundImgContainerHeight = useBreakpointValue({
    base: "250px",
    md: "300px",
    lg: "350px",
  });

  return (
    <Flex direction="column" justifyContent="center" paddingTop={4}>
      <Box
        className={styles.bgImgContainer}
        style={{ height: backgroundImgContainerHeight }}
      >
        <img className={styles.bgImg} src={backgroundImg} alt="" />
      </Box>
      <Container maxW="container.md" paddingTop={"30px"} pb={20}>
        <Stack mb={9}>
          <Heading size="md" color="primary" fontWeight="500">
            Preencha os campos abaixo
          </Heading>
          <small>
            Complete todos os dados com CPF ou Documeto de Pessoa Estrangeira
          </small>
        </Stack>
        <Box pb={7}>
          <form>
            <SimpleGrid columns={12} columnGap={4} rowGap={4}>
              <GridItem colSpan={12}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Dependência
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={12}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Data de utilização
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={12}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Nome do convidado
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={12}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Data de nascimento
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    CPF
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel fontWeight="400" color="gray.500">
                    Doc. Estrangeiro
                  </FormLabel>
                  <Input type="text" />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </form>
        </Box>
        <Actions>
          <Link to="/reservas">
            <ActionButton variant="outline">Cancelar</ActionButton>
          </Link>
          <ActionButton onClick={handleSubmitInvite}>
            Solicitar convite
          </ActionButton>
        </Actions>
      </Container>
    </Flex>
  );
};

const Barbecue = () => {
  const navigate = useNavigate();

  let policyRead = false;
  if (localStorage.getItem("reservationPolicyRead")) {
    policyRead = JSON.parse(
      localStorage.getItem("reservationPolicyRead") || "{}"
    );
  }

  const [currentView, setCurrentView] = useState<BarbecuePageViews>(
    policyRead ? BarbecuePageViews.SELECT_BARBECUE : BarbecuePageViews.POLICIY
  );

  const [selectedBarbecue, setSelectedBarbecue] = useState<FacilityReserve>({
    dependencia: 0,
    dataLocacao: "",
    periodo: "diurno",
  });

  const nextStep = () => {
    setCurrentView((old) => {
      return old + 1;
    });
  };

  const handlePolicyAction = (action: "agreed" | "not-agreed") => {
    if (action === "agreed") {
      nextStep();
      localStorage.setItem("reservationPolicyRead", "true");
    } else {
      navigate("/reservas", { replace: true });
    }
  };

  const handleBarbecueReservationSelected = (item: Facility, date: string) => {
    setSelectedBarbecue({
      facility: item,
      dependencia: item.iden,
      dataLocacao: date,
      periodo: "diurno",
    });
    nextStep();
  };

  const handlEmitInvites = () => {
    nextStep();
  };

  const handleSubmitInvite = () => {
    const id = "b24253a1-9603-4f4e-9a43-92922476772c";

    navigate(`/reservas/convites/${id}`);
  };

  const getView = (): JSX.Element => {
    switch (currentView) {
      case BarbecuePageViews.POLICIY:
        return (
          <PolicyAgreement
            title="Regulamento de uso da reserva"
            text={policiyText}
            action={handlePolicyAction}
          />
        );

      case BarbecuePageViews.SELECT_BARBECUE:
        return (
          <SelectBarbecue onItemSelect={handleBarbecueReservationSelected} />
        );

      case BarbecuePageViews.RESERVE_BARBECUE:
        return (
          <ConfirmReservation
            selectedBarbecue={selectedBarbecue}
            emitInvites={handlEmitInvites}
          />
        );

      case BarbecuePageViews.EMIT_INVITES:
        return (
          <EmitInvites
            selectedBarbecue={selectedBarbecue}
            submitInvite={handleSubmitInvite}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <PageLayout>
      <Box pt={5} pb={20}>
        <Breadcrumb
          items={[
            { route: "/", label: "Início" },
            { route: ROUTES.RESERVATIONS, label: "Reservas" },
            { route: ROUTES.RESERVATIONS_BARBECUE, label: "Churrasqueira" },
          ]}
        />
        {getView()}
      </Box>
    </PageLayout>
  );
};

export default Barbecue;
