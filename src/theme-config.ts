import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./styles/components/button.styles";
import { InputStyles as Input } from "./styles/components/input.styles";

export const Radio = {
  baseStyle: {
    color: "gray",
  },
  sizes: {},
  variants: {
    primary: {
      bg: "primary",
      color: "white",
    },
  },
  defaultProps: {
    variant: "primary",
  },
};

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: "#003E66",
    secondary: "#4F7DA1",
    danger: "#F03D3E",
    success: "#44AC80",
    white: "#FFFFFF",
  },
  components: {
    Input,
    Button,
    Checkbox: {
      baseStyle: {
        control: {
          color: "#DDE2E5",
        },
        label: {
          color: "#495057",
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          color: "#DDE2E5",
        },
        label: {
          color: "#495057",
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400,
          _focus: {
            border: "1px solid",
            borderColor: "primary",
            boxShadow: "none",
          },
          _invalid: {
            borderColor: 'danger'
          }
        },
      },
      variants: {
        default: {
          field: {
            border: "1px solid",
            borderColor: "#DDE2E5",
            _focus: {
              borderColor: "primary",
              boxShadow: "none",
            },
            _invalid: {
              borderColor: 'danger'
            }
          },
        },
      },
      defaultProps: {
        variant: "default",
      },
    },
  },
});

export default theme;
