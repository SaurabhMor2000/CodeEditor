import React, { useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa'
import { FcSettings } from 'react-icons/fc'
import SplitPane from 'react-split-pane'
import {MdCheck ,MdEdit} from 'react-icons/md'


import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux'
import UserProfileDetails from '../components/UserProfileDetails'
import { setDoc ,doc} from 'firebase/firestore'
import { db } from '../config/firebase.config'
import Alert from '../components/Alert'


const NewProject = ({user}) => {

    const [html, setHTML] = useState("");
    const [css , setCSS] = useState("");
    const [js ,setJs] =  useState("");
    const [output ,  setOutput ]=useState("");
    // const user = useSelector(state=> state.user)
    const [alert , setAlert] = useState(false);

    const [isTitle ,  setIsTitle]=useState("");
    const [title ,setTitle] = useState("Untitled");


const saveProgram = async  () =>{
    const id = `${Date.now()}`
    const _doc = {
        id  :id ,
        title:title ,
        html :html ,
        css :css ,
        js :js,
        output:output,
        user:user,
    }
    await setDoc(doc(db,"projects" ,id),_doc).then((res)=>{
        setAlert(true)
    })
    .catch((err)=>console.log(err))

    setInterval(()=>{
        setAlert(false);
    },2000)
}



    const updateOutput = () =>{
        const combinedOutput =`
        <html>
        <head>
        <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>
        ${js}
        </script>
        </body>
        </html>`;
   setOutput(combinedOutput) 

}

  return (
    <>
    <div className=' w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
  {/* <!-- Alert --> */}
  <AnimatePresence>
    {alert && <Alert status={"Success"} alertMsg={"Project Saved..."}/>}
  </AnimatePresence>

  <header className=' w-full flex items-center justify-between px-12 py-4'>

    <div className=' flex items-center justify-center gap-6'>
        <Link to={"/home/projects"}>
            <img className=' w-32 h-auto object-contain ' src={logo}/>
        </Link>
        <div className='flex flex-col items-start justify-start '>
            <div className=' flex items-center justify-center gap-3'>
              <AnimatePresence>{isTitle?<>
              <motion.input key={"TitleInput"} 
              type='text' placeholder='Your Title'
              className=' px-3 py-2 rounded-md bg-transparent
               text-primaryText text-base outline-none border-none'
              value={title} onChange={(e) =>setTitle(e.target.value)}>
                </motion.input></>
              
            :<> 
            <motion.p key={"TitleLabel"} 
            className=' px-3 py-2 text-white text-lg'>
                {title}
            </motion.p>
            </>
            }

              </AnimatePresence>

              <AnimatePresence>{isTitle?<>
              <motion.div key={"Mdcheck"} whileTap={{scale:0.9}}
              className=' cursor-pointer' onClick={()=>setIsTitle(false)}>
                <MdCheck className = " text-2xl text-emerald-500"/>
              </motion.div>
              </>
              
            :<> 
            <motion.div key={"Mdedit"}
            whileTap={{scale:0.9}}
            className=' cursor-pointer' onClick={()=>setIsTitle(true)}>
                  <MdEdit className=" text-2xl text-gray-700"/>
             </motion.div>

            </>
            }

              </AnimatePresence>

            </div>

            <div className=' flex items-center justify-center px-3 -mt-2 gap-2'>
                <p className=' text-primaryText text-sm'>
                    {user?.displayName? user?.displayName:`${user?.email.split("@")[0]}`} 
                </p>
                <motion.p 
                whileTap={{scale:0.9}}
                className=' tet-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer'>
                    +Follow
                </motion.p>
            </div>

        </div>
    </div>
  {user && (  <div className=' flex  items-center justify-center gap-4'>
        <motion.button whileTap={{scale:0.9}} 
        onClick={saveProgram}
        className=' px-6 py-4  bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md '>
            Save
        </motion.button>
        <UserProfileDetails user={user}/>

    </div>)}
  </header>
    
      
      {/*coding Section */}
      <div>
        {/*Horizontal */}
        <SplitPane  split='horizontal'
        minSize={100}
        maxSize={-100}
        defaultSize={"50%"}
        
        >

        {/*Top coding*/}
        <SplitPane split='vertical'
        minSize={500}>
            {/*html*/}
            <div className=' w-full h-full flex flex-col items-start justify-start'>
                <div className=' w-full flex items-center justify-between'>
                    <div className=' bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                        <FaHtml5  className=' text-xl text-red-500'/>
                        <p className=' text-primaryText font-semibold'>HTML</p>
                    </div>
                    {/*icon*/}

                    <div className=' cursor-pointer flex items-center justify-center gap-5 px-4'>
                        <FcSettings className=' text-xl'/>  
                        <FaChevronDown className=' text-xl text-primaryText'/>
                    </div>
                </div>
                <div className=' w-full px-2'>
                <CodeMirror 
                value={html} 
                height="600px"
                theme={'dark'}
                extensions={[javascript({jsx: true})]}
                onChange={(value ,viewUpdate) =>{
                    setHTML(value);
                    updateOutput();
                }}
                />
                </div>
            </div>

            <SplitPane split='vertical'
        minSize={500}>
                {/*css*/}
                <div className=' w-full h-full flex flex-col items-start justify-start'>
                <div className=' w-full flex items-center justify-between'>
                    <div className=' bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                        <FaCss3  className=' text-xl text-sky-500'/>
                        <p className=' text-primaryText font-semibold'>CSS</p>
                    </div>
                    {/*icon*/}

                    <div className=' cursor-pointer flex items-center justify-center gap-5 px-4'>
                        <FcSettings className=' text-xl'/>  
                        <FaChevronDown className=' text-xl text-primaryText'/>
                    </div>
                </div>
                <div className=' w-full px-2'>
                <CodeMirror 
                value={css} 
                height="600px"
                theme={'dark'}
                extensions={[javascript({jsx: true})]}
                onChange={(value ,viewUpdate) =>{
                    setCSS(value);
                    updateOutput();
                }}
                />
                </div>
            </div>


                {/*js/ts*/}
                <div className=' w-full h-full flex flex-col items-start justify-start'>
                <div className=' w-full flex items-center justify-between'>
                    <div className=' bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                        <FaJs  className=' text-xl text-yellow-500'/>
                        <p className=' text-primaryText font-semibold'>Javascript</p>
                    </div>
                    {/*icon*/}

                    <div className=' cursor-pointer flex items-center justify-center gap-5 px-4'>
                        <FcSettings className=' text-xl'/>  
                        <FaChevronDown className=' text-xl text-primaryText'/>
                    </div>
                </div>
                <div className=' w-full px-2'>
                <CodeMirror 
                value={js} 
                height="600px"
                theme={'dark'}
                extensions={[javascript({jsx: true})]}
                onChange={(value ,viewUpdate) =>{
                    setJs(value);
                    updateOutput();
                }}
                />
                </div>
            </div>
            </SplitPane>

        </SplitPane>

        {/*bottom Result*/}
        <div className=' bg-white'
        style={{overflow:"hidden",height:"100%"}}>
            <iframe title='Result' srcDoc={output}
            style={{border:'none' ,width:"100%", height:"100%"}}/>

        </div>

        </SplitPane>


      </div>
    </div>
    </>
  )
}

export default NewProject
