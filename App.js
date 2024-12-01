import { useAuthentication } from './src/hooks/useAuthentication';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeNaviagtor from './src/navigation/HomeNavigator';

export default function App() {
  const { user } = useAuthentication();
  return user ? <HomeNaviagtor /> : <AuthNavigator />
}
