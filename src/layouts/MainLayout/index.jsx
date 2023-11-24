import { Helmet } from "react-helmet";
import ApiNavbar from "../../components/default/ApiNavbar";
import Container from "../../components/styled/Container";
import PrimaryNavbar from "../../components/default/PrimaryNavbar";


const MainLayout = ({children}) => {
    return (<>
        <Helmet>
            <link href="/css/main.layout.css" type="text/css" rel="stylesheet" />
        </Helmet>
        <ApiNavbar />
        <PrimaryNavbar />
        <Container>
            {children}
        </Container>
        
    </>);
};

export default MainLayout;