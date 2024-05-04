import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdBookmark } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Projects = () => {

  const [filtered , setFiltered] = useState(null);
  const searchTerm = useSelector((state)=> state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "");


  const projects = useSelector((state) => state.projects?.projects)


  useEffect( ()=>{
    if (searchTerm?.length >0){
      setFiltered(
      projects?.filter(project => {
        const lowerCaseItem =  project?.title?.toLowerCase();
        return searchTerm.split(" ").every(item => lowerCaseItem.includes(item));
      })
      )
    }
    else{
      setFiltered(null);
    }

  },[searchTerm])



  return (
    <div className=' text-white'>
{filtered ? ( <>{filtered && 
      filtered.map((project,index) =>(
        <ProjectCard key={project.id} project ={project} index =  {index}/>
     ) )}</>):
     (    <>  {projects && 
      projects.map((project,index) =>(
        <ProjectCard key={project.id} project ={project} index =  {index}/>
     ) )}
     </>)
     }
    </div>
  )
}

const ProjectCard = ({project,index})=>{
  return (
    <motion.div key={index} 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={ { opacity : 0 }}
    transition={{duration:0.5 , delay : index * 0.25+1 }}
    
    className=' w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-3'>
      <div className=' w-full h-full'>
      <div className=' bg-primary w-full h-full rounded-md overflow-hidden'
        style={{overflow:"hidden",height:"100%"}}>
            <iframe title='Result' srcDoc={project.output}
            style={{border:'none' ,width:"100%", height:"100%"}}/>

        </div>
      </div>
      <div className=' flex items-center justify-start gap-3 w-full'>
      <div className=' w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500'>
           
      {
                project?.user?.photoURL ?(<>

                <motion.img whileMove ={{ scale: 1.2}} src={project?.user?.photoURL} alt={project?.user?.displayName}
                referrerPolicy=' no-referrer' className=' w-full h-full object-cover'>
                    </motion.img> 

                
                </>):(<>
                <p  className=' text-xl text-white font-semibold capitalize'>
                    {project?.user?.email[0]}
                </p>
                </>)
            }
      </div>
<div>
  <p className=' text-white text-lg capitalize'>{project?.title}</p>
  <p className=' text-primaryText text-sm capitalize'>
    {project?.user?.displayName ? project?.user?.displayName : `${project?.user.email.split("@")[0]}`}
  </p>

</div>
<motion.div className=' cursor-pointer ml-auto'
whileTap={{scale:0.9}}>
  <MdBookmark className=' text-primaryText text-3xl ' />


</motion.div>

      </div>
      
    </motion.div>)
}

export default Projects
