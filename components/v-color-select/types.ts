import type { TThemeColor } from "~/types/theme";

export interface ISelectThemeProps {
    color?: TThemeColor;
    colorsList: TThemeColor[];
    modelValue: TThemeColor;
}


export const defaultProps = {
    color: 'green' as TThemeColor
}





