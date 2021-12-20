import { Button, ButtonProps, useBreakpointValue } from "@chakra-ui/react";

const ActionButton = ({children, ...props}: ButtonProps) => {
    const breakpoint = useBreakpointValue(['sm', 'md', 'lg']);
    const btnSize = (breakpoint === 'xs' || breakpoint ===  'sm') ? 'md' : 'lg'
    
    return ( 
        <Button width={["100%", "100%", "fit-content"]} minW="fit-content" {...props} size={btnSize}>
            {children}
        </Button>
     );
}
 
export default ActionButton;