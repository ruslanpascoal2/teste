import {
  Avatar,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Select,
  Container,
  FormErrorMessage,
  useToast,
  Text,
} from "@chakra-ui/react";
import AvatarWithUpload from "../../../components/AvatarWithUpload/AvatarWithUpload";
import styles from "./ProfileForm.module.scss";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../../components/PageLayout/PageLayout";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Actions from "../../../components/Actions/Actions";
import ActionButton from "../../../components/ActionButton/ActionButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import { useProfileService } from "../../../services/profile.service";
import { Profile } from "../../../models/profile.model";
import { UNIDADES_FEDERATIVAS as UFs } from "../../../common/ufs";
import { CAMPO_OBRIGATORIO } from "../../../common/feedbacks";
import Toast from "../../../components/Toast/Toast";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";

const ProfileForm = () => {
  
  const navigate = useNavigate();

  type FormData = {
    email: string;
    residencialEndereco: string;
    residencialBairro: string;
    residencialCidade: string;
    residencialUf: string;
    residencialCep: string;
    residencialTelefone: string;
    comercialEndereco: string;
    comercialBairro: string;
    comercialCidade: string;
    comercialUf: string;
    comercialCep: string;
    comercialTelefone: string;
    correspondencia: boolean;
    carne: boolean;
  };

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido.").required(CAMPO_OBRIGATORIO),
    residencialEndereco: yup.string().required(CAMPO_OBRIGATORIO),
    residencialBairro: yup.string().required(CAMPO_OBRIGATORIO),
    residencialCidade: yup.string().required(CAMPO_OBRIGATORIO),
    residencialUf: yup.string().required(CAMPO_OBRIGATORIO),
    residencialCep: yup.string().required(CAMPO_OBRIGATORIO),
    residencialTelefone: yup.string().required(CAMPO_OBRIGATORIO),
    comercialEndereco: yup.string(),
    comercialBairro: yup.string(),
    comercialCidade: yup.string(),
    comercialUf: yup.string(),
    comercialCep: yup.string(),
    comercialTelefone: yup.string(),
    correspondencia: yup.boolean(),
    carne: yup.boolean(),
  });


  const transformPayload = (data: FormData): Profile => {
    let payload: Profile = {
      carne: true,
      correspondencia: false,
      email: data.email,
      enderecoComercial: {
        bairro: data.comercialBairro,
        cidade: data.comercialCidade,
        endereco: data.comercialEndereco,
        uf: data.comercialUf,
        cep: data.comercialCep,
        telefone: data.comercialTelefone,
      },
      enderecoResidencial: {
        bairro: data.residencialBairro,
        cidade: data.residencialCidade,
        endereco: data.residencialEndereco,
        uf: data.residencialUf,
        cep: data.residencialCep,
        telefone: data.residencialTelefone,
      },
    };

    return payload;
  };

  const { getProfile, updateProfile } = useProfileService();

  const toast = useToast();

  const showToast = (type: "error" | "success", data: any) => {
    toast({
      render: () => <Toast type={type} message={data} />,
      duration: 5000,
      isClosable: false,
    });
  };

  const [profile, setProfile] = useState<Profile>({
    email: '',
    correspondencia: false,
    carne: false,
    enderecoResidencial: {
        endereco: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        telefone: ''
    },
    enderecoComercial: {
        endereco: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        telefone: ''
    },
  });

  const query = useQuery<Profile, Error>(
    "perfil",
    async () => {
      return await getProfile();
    },
    {
      onSuccess: (profile: Profile) => {
        setProfile(profile);
      },
      onError: () => showToast('error', "Não foi possível recuperar os dados do perfil. Tente novamente.")
    }
  );
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('email', profile.email || '');
    setValue('correspondencia', profile.correspondencia || false);
    setValue('carne', profile.carne || false);
    setValue('residencialEndereco', profile.enderecoResidencial?.endereco || '');
    setValue('residencialBairro', profile.enderecoResidencial?.bairro || '');
    setValue('residencialCep', profile.enderecoResidencial?.cep || '');
    setValue('residencialCidade', profile.enderecoResidencial?.cidade || '');
    setValue('residencialUf', profile.enderecoResidencial?.uf || '');
    setValue('residencialTelefone', profile.enderecoResidencial?.telefone || '');
    setValue('comercialEndereco', profile.enderecoComercial?.endereco || '');
    setValue('comercialBairro', profile.enderecoComercial?.bairro || '');
    setValue('comercialCep', profile.enderecoComercial?.cep || '');
    setValue('comercialCidade', profile.enderecoComercial?.cidade || '');
    setValue('comercialUf', profile.enderecoComercial?.uf || '');
    setValue('comercialTelefone', profile.enderecoComercial?.telefone || '');
  }, [profile, setValue])



  const profileMutation = useMutation(
    (data: FormData) => updateProfile(transformPayload(data)),
    {
      onSuccess: () => {
        showToast("success", "Perfil atualizado.");
        navigate("/perfil");
      },
      onError: () =>
        showToast("error", "Não foi possível completar a solicitação."),
    }
  );

  const onSubmit = handleSubmit((data: FormData) =>
    profileMutation.mutate(data)
  );

  return (
    <PageLayout>
      <Container maxW="container.md" pt={5} pb={20}>
        <Stack spacing={10} className={styles.profileForm}>
          <Breadcrumb
            items={[
              { route: "/", label: "Início" },
              { route: "/perfil", label: "Perfil" },
              { route: "/perfil/editar-perfil", label: "Editar Perfil" },
            ]}
          />

          <div className={styles.avatar}>
            <AvatarWithUpload>
              <Avatar size="2xl" name="Roberto Silva" />
            </AvatarWithUpload>
          </div>

            {
              query.isLoading ? <Stack spacing={6} justifyContent={"center"} alignItems={"center"}><Loading blockUi/> <Text>Carregando dados do perfil...</Text></Stack> : 
              (
                <form
                id="profile-form"
                style={{ paddingBottom: "1rem" }}
                onSubmit={onSubmit}
              >
                <Stack spacing={4}>
                  <Heading size="md" fontWeight="500" color="primary">
                    Endereço Eletrônico
                  </Heading>
                  <FormControl isInvalid={!!errors?.email}>
                    <FormLabel fontWeight="400" color="gray.500">
                      E-mail
                    </FormLabel>
                    <Input
                      type="email"
                      autoComplete="none"
                      placeholder=""
                      {...register("email")}
                    />
                    <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                  </FormControl>
                </Stack>
    
                <Heading my={6} size="md" fontWeight="500" color="primary">
                  Endereço Residencial
                </Heading>
    
                <SimpleGrid columns={12} columnGap={3} rowGap={6} w="full">
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.residencialEndereco}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Endereço
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        placeholder=""
                        {...register("residencialEndereco")}
                      />
                      <FormErrorMessage>
                        {errors?.residencialEndereco?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.residencialBairro}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Bairro
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("residencialBairro")}
                      />
                      <FormErrorMessage>
                        {errors?.residencialBairro?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={8}>
                    <FormControl isInvalid={!!errors?.residencialCidade}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Cidade
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("residencialCidade")}
                      />
                      <FormErrorMessage>
                        {errors?.residencialCidade?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <FormControl isInvalid={!!errors?.residencialUf}>
                      <FormLabel fontWeight="400" color="gray.500">
                        UF
                      </FormLabel>
                      <Select placeholder="" {...register("residencialUf")}>
                        <option value=""></option>
                        {UFs.map((uf, i) => {
                          return (
                            <option key={i} value={uf.sigla}>
                              {uf.nome}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage>
                        {errors?.residencialUf?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.residencialTelefone}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Telefone
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("residencialTelefone")}
                      />
                      <FormErrorMessage>
                        {errors?.residencialTelefone?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={8}>
                    <FormControl isInvalid={!!errors?.residencialCep}>
                      <FormLabel fontWeight="400" color="gray.500">
                        CEP
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("residencialCep")}
                      />
                      <FormErrorMessage>
                        {errors?.residencialCep?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </SimpleGrid>
    
                <Heading my={6} size="md" fontWeight="500" color="primary">
                  Endereço Comercial
                </Heading>
    
                <SimpleGrid columns={12} columnGap={3} rowGap={6} w="full">
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.comercialEndereco}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Endereço
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("comercialEndereco")}
                      />
                      <FormErrorMessage>
                        {errors?.comercialEndereco?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.comercialBairro}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Bairro
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("comercialBairro")}
                      />
                      <FormErrorMessage>
                        {errors?.comercialBairro?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={8}>
                    <FormControl isInvalid={!!errors?.comercialBairro}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Cidade
                      </FormLabel>
                      <Input
                        type="text"
                        autoComplete="none"
                        {...register("comercialCidade")}
                      />
                      <FormErrorMessage>
                        {errors?.comercialBairro?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <FormControl isInvalid={!!errors?.comercialUf}>
                      <FormLabel fontWeight="400" color="gray.500">
                        UF
                      </FormLabel>
                      <Select placeholder="" {...register("comercialUf")}>
                        <option value=""></option>
                        {UFs.map((uf, i) => {
                          return (
                            <option key={i} value={uf.sigla}>
                              {uf.nome}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage>
                        {errors?.comercialUf?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <FormControl isInvalid={!!errors?.comercialTelefone}>
                      <FormLabel fontWeight="400" color="gray.500">
                        Telefone
                      </FormLabel>
                      <Input type="text" {...register("comercialTelefone")} />
                      <FormErrorMessage>
                        {errors?.comercialTelefone?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={8}>
                    <FormControl isInvalid={!!errors?.comercialCep}>
                      <FormLabel fontWeight="400" color="gray.500">
                        CEP
                      </FormLabel>
                      <Input type="text" {...register("comercialCep")} />
                      <FormErrorMessage>
                        {errors?.comercialCep?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </SimpleGrid>
    
                <Heading my={6} size="md" fontWeight="500" color="primary">
                  Recebimento de correspondência
                </Heading>
    
                <RadioGroup defaultValue="1">
                  <Stack spacing={4}>
                    <Radio {...register("correspondencia")} value="1">
                      Endereço residencial
                    </Radio>
                    <Radio {...register("correspondencia")} value="2">
                      Endereço comercial
                    </Radio>
                  </Stack>
                </RadioGroup>
    
                <Heading my={6} size="md" fontWeight="500" color="primary">
                  Recebimento de carnê
                </Heading>
    
                <RadioGroup defaultValue="1">
                  <Stack spacing={4}>
                    <Radio {...register("carne")} value="1">
                      Endereço residencial
                    </Radio>
                    <Radio {...register("carne")} value="2">
                      Endereço comercial
                    </Radio>
                  </Stack>
                </RadioGroup>
              </form>
    
              )
            }
         
          <Actions>
            <Link to="/perfil">
              <ActionButton variant="outline">Cancelar</ActionButton>
            </Link>
            <ActionButton type="submit" form="profile-form" isLoading={profileMutation.isLoading}>
              Salvar alterações
            </ActionButton>
          </Actions>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default ProfileForm;
