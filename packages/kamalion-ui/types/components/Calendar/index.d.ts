import { type DayPickerProps } from "react-day-picker";
export type CalendarProps = DayPickerProps & {
    /**
     * In the year view, the number of years to display at once.
     * @default 12
     */
    yearRange?: number;
    /**
     * Wether to show the year switcher in the caption.
     * @default true
     */
    showYearSwitcher?: boolean;
    monthsClassName?: string;
    monthCaptionClassName?: string;
    weekdaysClassName?: string;
    weekdayClassName?: string;
    monthClassName?: string;
    captionClassName?: string;
    captionLabelClassName?: string;
    buttonNextClassName?: string;
    buttonPreviousClassName?: string;
    navClassName?: string;
    monthGridClassName?: string;
    weekClassName?: string;
    dayClassName?: string;
    dayButtonClassName?: string;
    rangeStartClassName?: string;
    rangeEndClassName?: string;
    selectedClassName?: string;
    todayClassName?: string;
    outsideClassName?: string;
    disabledClassName?: string;
    rangeMiddleClassName?: string;
    hiddenClassName?: string;
};
/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
declare function Calendar({ className, showOutsideDays, showYearSwitcher, yearRange, numberOfMonths, ...props }: CalendarProps): import("react/jsx-runtime").JSX.Element;
declare namespace Calendar {
    var displayName: string;
}
export { Calendar };
