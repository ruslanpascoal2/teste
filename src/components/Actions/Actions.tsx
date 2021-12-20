import { HStack, Stack, useBreakpointValue } from "@chakra-ui/react";

interface ActionsProps {
    children: React.ReactNode,
    justify?: string
}
 
const Actions = ({children, justify = 'flex-end' ,...props}:ActionsProps) => {
    const breakpoint = useBreakpointValue(['xs', 'sm', 'md', 'lg']);
    const isMobile = () => (breakpoint === 'xs' || breakpoint === 'sm');

    if(isMobile()){
        return (
            <Stack spacing={5} {...props}  >
                {children}
            </Stack>
        )
    }

    else{
        return (
            <HStack spacing={4} {...props} w="full" justifyContent={justify}>{children}</HStack>
        )
    }
    
}
 
export default Actions;