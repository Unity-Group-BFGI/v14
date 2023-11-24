import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Home, Pricing, About, NotFound, Setup } from "./pages";
import { Preview, IeltsTestPreview, IeltsSolutionPreview } from "./pages/Preview";
import { 
    Dashboard,
    MyAccount,
    MyAccountOverview,
    MyAccountSettings,
    IeltsLms,
    IeltsLmsMyQuizzes,
    IeltsLmsEditQuiz
} from "./pages/Dashboard";

const Routes = () => {

    return (<>
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} element={<Home />} /> 
                <Route exact path={"/about"} element={<About />} />
                <Route exact path={"/pricing"} element={<Pricing />} />
                <Route exact path={"/complete-profile"} element={<Setup />} />
                <Route exact path={"/dashboard"} element={<Dashboard />} >
                    <Route exact path={"/dashboard/my-account"} element={<MyAccount />} >
                        <Route exact path={"/dashboard/my-account/overview"} element={<MyAccountOverview />} />
                        <Route exact path={"/dashboard/my-account/settings"} element={<MyAccountSettings />} />
                    </Route>
                    <Route exact path={"/dashboard/ielts-lms"} element={<IeltsLms />} >
                        <Route exact path={"/dashboard/ielts-lms/my-quizzes"} element={<IeltsLmsMyQuizzes />} />
                        <Route exact path={"/dashboard/ielts-lms/free-quizzes"} element={<>Free quizzes</>} />
                        <Route exact path={"/dashboard/ielts-lms/edit/:id"} element={<IeltsLmsEditQuiz />} />
                        <Route exact path={"/dashboard/ielts-lms/edit"} element={<>quiz id is required for edit</>} />
                    </Route>
                    <Route path='/dashboard/*' element={<NotFound />}/>
                </Route>
                <Route exact path={"/preview"} element={<Preview />}>
                    <Route exact path={"/preview/ielts/quiz/:category/:id"} element={<IeltsTestPreview />} />
                    <Route exact path={"/preview/ielts/solution/:category/:id"} element={<IeltsSolutionPreview />} />
                </Route>
                <Route path='*' element={<NotFound />}/>
            </Switch>
        </BrowserRouter>
    </>);
};

export default Routes;
