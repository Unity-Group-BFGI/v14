import './global.css';
import Routes from "./Routes";
import { ApiLayout, AuthLayout, AppLayout } from "./layouts";

const App = () => {
    console.log('log');
    return (<ApiLayout>
        <AuthLayout>
            <AppLayout>
                <Routes />
            </AppLayout>
        </AuthLayout>
    </ApiLayout>);
};

export default App;
