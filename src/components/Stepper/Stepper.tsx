import { Stepper } from "react-form-stepper";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { StepperProps } from "react-form-stepper/dist/components/Stepper/StepperTypes";
import styles from './Stepper.module.scss'

const stepStyles: StepStyleDTO = {
    activeBgColor: '#003E66',
    activeTextColor: '#003E66',
    completedBgColor: '#003E66',
    completedTextColor: '#003E66',
    size: '13px',
    inactiveTextColor: '#F1EBF5',
    inactiveBgColor: '#F1EBF5',
    circleFontSize: '0px',
    labelFontSize: '0.875rem',
    borderRadius: '50%',
    fontWeight: 500,
}

const CustomStepper = (props: StepperProps) => {
  return (
    <Stepper stepClassName={styles.step} styleConfig={stepStyles}{...props}/>
  );
};

export default CustomStepper;
