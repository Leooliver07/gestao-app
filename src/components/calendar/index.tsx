import { useEffect, useState } from 'react';
import arrowright from '../../assets/arrowright.svg';
import arrowleft from '../../assets/arrowleft.svg';
interface CalendarProps {
    onDateSelect: (date: string) => void;
}

function Calendar({ onDateSelect }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
    interface GetDaysInMonthParams {
        date: Date;
    }

    const getSelectedDate = () =>{
        if (selectedDay === null) return null;
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        const day = String(selectedDay).padStart(2, '0'); // Adiciona zero à esquerda se necessário 
        return `${year}-${month}-${day}`;
    }
    
    useEffect(() => {
        const selectedDate = getSelectedDate();
        if (selectedDate) {
            onDateSelect(selectedDate);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDay, currentDate, onDateSelect]);   

    const getDaysInMonth = (date: GetDaysInMonthParams['date']): (number | null)[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days: (number | null)[] = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null); // Preenche os dias vazios antes do primeiro dia do mês
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const days = getDaysInMonth(currentDate);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        setSelectedDay(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        setSelectedDay(null);
        console.log(currentDate.getMonth()+1);
      
    };

    //-------------------END CALENDAR SETUP---------------------------------------------- 
//-------------------START SELECTED DAY SETUP----------------------------------------------
   

    const handleDayClick = (day: number | null) => {
        setSelectedDay(day);
        
    };
    

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
               
                <div className='flex flex-row justify-between gap-14 items-center'>
                   <div className="flex justify-center items-center">
                        <img className="mx-1 cursor-pointer" onClick={goToPreviousMonth}src={arrowleft} width={40} height={40} alt='seta' ></img>
                    </div>
                     <div>
                         <h2 className="text-lg font-semibold">
                             {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2> 
                    </div>
                    <div>
                       <img className="mx-1 cursor-pointer" onClick={goToNextMonth}src={arrowright} width={40} height={40} alt='seta' ></img> 
                    </div> 
                    
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(index => (
                    <div key={index} className="text-center font-medium">{index}</div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="text-center cursor-pointer hover:bg-pink-200 rounded-md p-1 h-8 w-8"
                        onClick={() => handleDayClick(day)} 
                    >
                        {day && selectedDay === day ? (
                            <span className="bg-pink-400 text-white rounded-full  w-6 h-6 inline-block">{day}</span>
                        ) : (
                            day
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Calendar;