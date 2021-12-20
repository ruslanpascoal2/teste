import { Calendar, CalendarProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {pt} from 'date-fns/locale';

const CustomCalendar = (props: CalendarProps) => {
    return (
        <Calendar color='#4F7DA1' locale={pt} {...props} />
      );
}
 
export default CustomCalendar;