import { Stack } from "@chakra-ui/layout";
import logoImg from "../../assets/img/logo/logo_img.svg";
import logoText from "../../assets/img/logo/logo_text.svg";
import logoHorizontal from "../../assets/img/logo/logo_horizontal.svg";
import styles from "./Logo.module.scss";

interface LogoProps {
  type: "column" | "row";
  size: "sm" | "md" | "lg";
}

const Logo = ({
    type = 'row',
    size = 'sm'
}: LogoProps) => {
  let logo = null;
  switch (type) {
    case "column":
      logo = (
        <Stack alignItems="center" justifyContent="center">
          <img alt="Iate Clube de Brasília" className={`${styles.img} ${styles[size]}`} src={logoImg} />
          <img alt="Iate Clube de Brasília"
            className={`${styles.text} ${styles[size]}`}
            style={{ marginTop: 10 }}
            src={logoText}
          />
        </Stack>
      );
      break;
    case "row":
      logo = (
          <img alt="Iate Clube de Brasília" className={`${styles.img} ${styles[size]}`} src={logoHorizontal} />
      );
      break;

    default:
      throw new Error("Tipo de logo inválido.");
  }

  return logo;
};

export default Logo;
