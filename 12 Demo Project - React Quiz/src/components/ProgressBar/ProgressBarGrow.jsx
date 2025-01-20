import CustomProgressBar from "./CustomProgressBar.jsx";

export default function ProgressBarGrow({maxValue, onTimeUp, ...rest}){
    return <CustomProgressBar maxValue={maxValue} onTimeUp={onTimeUp} step={10} {...rest} />
}