import { THEME, useTheme } from "./context/Themeprovider";
import clsx from "clsx";

export default function ThemeContent(){

  const {theme,toggleTheme} = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;

  return ( 
    <div className={clsx(
      'p-4 h-dvh w-full',
      isLightMode ? 'bg-white' : 'bg-gray-800' 

    )}>
      <h1 className={clsx(
      'text-wxl fond-bold',
      isLightMode ? 'text-black' : 'text-white' 

    )}>
    
'슬픔이여안녕' <br></br> <br></br>
    </h1>
    <p className={clsx(
      'text-wxl fond-bold',
      isLightMode ? 'text-black' : 'text-white' 

    )}>이봐, 젊은 친구야 <br></br>
    잃어버린 것들은 잃어버린 그 자리에 <br></br>
    가끔 뒤 돌아 보면은 <br></br>
    슬픔 아는 빛으로 피어</p>
    </div>
  );
}