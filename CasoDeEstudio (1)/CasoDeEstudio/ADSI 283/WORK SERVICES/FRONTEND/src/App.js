import { Home } from "./Components/Pages/Home/Home";
import { Route, Routes } from 'react-router-dom'
import { Postulados } from "./Components/Pages/Postulados/Postulados";  
import { Postulation } from "./Components/Layouts/Postulation/Postulation";
import { Profile } from "./Components/Pages/Profile/Profile"
import { Chat } from "./Components/Pages/Chat/Chat";
import { useAuth } from "./hooks"
import { Reports } from "./Components/Pages/Admin/Reports/Reports"
import { Users } from "./Components/Pages/Admin/Users/Users";
import { ProfilePostulates } from "./Components/Layouts/ProfilePostulates/ProfilePostulates";
import { RecoverPassword } from "./Components/Layouts/RecoverPassword/RecoverPassword";
import { Historical } from "./Components/Pages/Historical/Historical";
import { WorksPath } from "./Components/Layouts/WorksPath/WorksPath";
import {LoginRegister} from './Components/Pages/Login-Register/LoginRegister'

function App() {
  const { user } = useAuth()

  return (
    <div>
      <Routes>
      {!user ? (
        <>
          <Route path="/*" element={<Home/>}></Route>
          <Route path= {"/auth"} element={<LoginRegister/>}></Route>
          <Route path= {"/auth"} element={<LoginRegister/>}></Route>
          <Route path= {"/auth/recoverPassword"} element={<RecoverPassword/>}></Route>
        </>
      ) : (
      <>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/notificaciones" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path={"/trabajo/postulados/:path"} element={<Postulados/>}></Route>
        <Route path="/postulaciones" element={<Postulation/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/historialTrabajos" element={<Historical/>}></Route>
        <Route path="/favoritos" element={<Home/>}></Route>
        <Route path="/reportes" element={<Reports/>}></Route>
        <Route path="/administrarUsuarios" element={<Users/>}></Route>
        <Route path="/administrarTrabajos" element={<Home/>}></Route>
        <Route path="/user/:path" element={<ProfilePostulates/>}></Route>
        <Route path="/trabajos/:path" element={<WorksPath/>}></Route>
      </>)}
      </Routes>
    </div>
  );
}

export default App;
