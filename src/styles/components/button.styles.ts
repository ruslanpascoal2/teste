import { ComponentSingleStyleConfig } from "@chakra-ui/theme";
import { whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles: ComponentSingleStyleConfig = {
    baseStyle:{
        fontWeight: 500,
        borderRadius: 8,
       
    },
    sizes: {},
    variants:{
        primary: {
            bg: "primary",
            color: "white",
            _hover:{
                bg: whiten('primary', 20),
                _disabled: {
                    bg: 'primary'
                }
            }
        },
        secondary: {
            bg: "secondary",
            color: "white",
            _hover:{
                bg: whiten('secondary', 20),
                _disabled: {
                    bg: 'secondary'
                }
            }
        },
        danger: {
            bg: 'white',
            color: "danger",
            border: '1px solid',
            borderColor: 'danger',
            _hover:{
                borderColor: 'danger',
                bg: 'white'
            }
        },
        outline: {
            bg: 'white',
            color: "primary",
            borderColor: '#ACB5BD',
            _hover:{
                borderColor: 'primary',
                bg: 'white'
            }
        }
    },
    defaultProps:{
        variant: 'primary'
    }
}