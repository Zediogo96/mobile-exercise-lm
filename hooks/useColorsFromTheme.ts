import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const useColorsFromTheme = () => {
    const theme = useColorScheme() ?? 'light';
    return Colors[theme];
};

export default useColorsFromTheme;
