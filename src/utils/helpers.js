import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

export const signINWithGoogle = async () => {
    await signInWithRedirect(auth, GoogleProvider).then(userCred => {
        window.location.reload();
    });
};

export const signINWithGithub = async () => {
    await signInWithRedirect(auth, GithubProvider).then(userCred => {
        window.location.reload();
    });
};



export const Menus = [
    {id:uuidv4(), name :"Projects" ,uri: "/home/projects"},
    {id:uuidv4(), name: "Collections", uri:"/home/collections"},
    {id: uuidv4(),name:"Profile", uri:'/home/profile'} 
];

export const signOut = async () =>{
    await auth.signOut().then(()=>{
        window.location.reload();
    })
}