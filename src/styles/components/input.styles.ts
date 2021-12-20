export const InputStyles = {
  baseStyle: {
    field: {
      fontWeight: 400,
      _focus: {
        border: "1px solid",
        borderColor: "primary",
        boxShadow: "none",
      },
    },
  },

  sizes: {
    md: {
      field: {
        borderRadius: "8px",
        height: 10,
        fontSize: "md",
      },
    },
    lg: {
      field: {
        borderRadius: "8px",
        height: 12,
        fontSize: "md",
      },
    },
  },

  variants: {
    default:{
      field: {
        border: '1px solid',
        borderColor: '#DDE2E5',
        _focus: {
          borderColor: 'primary',
          boxShadow: 'none',
        },
        _invalid: {
          borderColor: 'danger'
        }
      },
    }
  },
  defaultProps:{
    variant: 'default'
  }
};

