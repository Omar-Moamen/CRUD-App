import { Button, Tooltip } from '@mui/material'
// Styles
import styles from './styles.module.css';

type TooltipButtonProps = {
   className?: string;
   text: string;
   title: string;
   disabled: boolean;
   placement: 'top' | 'right' | 'bottom' | 'left';
   size?: 'small' | 'medium' | 'large';
   color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
   onClick: () => void;
}

const { tooltipSpan } = styles;

const TooltipButton = ({
   className,
   text,
   title,
   placement = 'bottom',
   color = 'primary',
   size = 'small',
   disabled,
   onClick }: TooltipButtonProps) =>
{

   if (disabled)
   {
      return (
         <Tooltip title={title} placement={placement}>
            <span className={tooltipSpan}>
               <Button
                  className={className} type="button" variant="outlined"
                  size={size} color={color}
                  disabled={disabled}
                  onClick={onClick}
               >
                  {text}
               </Button>
            </span>
         </Tooltip>
      )
   }

   return (
      <Button
         className={className} type="button" variant="outlined"
         size={size} color={color}
         onClick={onClick}
      >
         {text}
      </Button>
   )
}

export default TooltipButton
