import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase.config";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";
import NewProject from "./container/NewProject";
import { SET_PROJECTS } from "./context/actions/projectAcions";




function App() {

  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);


  useEffect( () => {
    const projectQuery =  query(
      collection(db,"projects"),
      orderBy("id","desc")
    )

    const unsubscribe = onSnapshot(projectQuery, (querySnaps=>{
      const projectsList = querySnaps.docs.map(doc=> doc.data( ) )
      dispatch(SET_PROJECTS(projectsList))
    }))
    return unsubscribe;
  } ,[])

      









useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((userCred) =>{
    if(userCred){
     // console.log(userCred?.providerData[0]);
      setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0]).then(
        ()=>{
          //          console.log(SET_USER(userCred?.providerData[0]));
         dispatch(SET_USER( userCred?.providerData[0]));
         setUser(userCred?.providerData[0]);
          navigate( "/home/projects",{ replace: true });
          
        }
      )

    }else{
      navigate("/home/auth",{replace:true});
    }

    setInterval(() => {
      setIsLoading(false);
    },1000)
  })

  return () => unsubscribe();
},[dispatch])

  return (

<>
{isLoading ? (
  <div className=" w-screen h-screen flex items-center justify-center overflow-hidden">
   <Spinner/>
  </div>
):
(
  <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
  <Routes>
    <Route path="/home/*" element={<Home user = {user}/>}></Route>
    <Route  path="/newProject" element= {<NewProject user = {user} />} ></Route>

    <Route path="*" element={<Navigate to ={"/home"}/>}></Route>
  
  </Routes>

</div>  
)}


</>
  );
}

export default App;










