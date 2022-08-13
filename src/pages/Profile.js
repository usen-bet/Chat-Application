import {useEffect, useState} from 'react'
import Img from "../index.png"
import { useNavigate } from "react-router-dom"
import "./Profile.css"
import Camera from '../Components/Camera'
import Delete from '../Components/Delete'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"



const Profile = () => {
    const [user, setUser] = useState("")
    const [img, setImg] = useState(null)
            const navigate = useNavigate()
 
    // The profile picture functionality
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }

    }
    // The profile picture/rendering func
      
    useEffect(() => {
        getDoc(doc(db, "rooms", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        })

        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage,
                    ` avatar/${new Date().getTime()} - ${img.name}`
                );
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

                    await updateDoc(doc(db, "rooms", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath,
                    });

                    setImg("")
          
                }
                catch (err) {
                    console.log(err.message)
                }
            };
            uploadImg();
        }
    }, [img])

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Delete avatar?')
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath))
                await updateDoc(doc(db, "rooms", auth.currentUser.uid), {
                    avatar: "",
                    avatarPath:"",
                })
            navigate("/")  
            }
        } catch (err) {
            console.log(err.message)
        }
    }

  return (
      <div>
          <div className="profile-container">
          <div className='img-container'>
              <img src={user.avatar || Img} alt="index.png"/>
              </div>
              <div >
               <label htmlFor='photo' className="overlay" >
                  <Camera />
                  </label>
                  {user.avatar ?
                      (
                   <label htmlFor='trash' className="overlayy" >
                  <Delete 
                  deleteImage={ deleteImage } 
                  />
                  </label>
                      ) : null} 
                  <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo"
                      onChange={handleImageChange}
                  />
             </div>
          <div className="text-container">
              <h3>
                  {user.name}
              </h3>
              <p>
                  {user.email}
              </p>
              
              <small>
               {/* joined on: {user.createdAt.toDate().toDateString()}    */}
              </small>
          </div>
          </div>
      </div>
      
  )
}

export default Profile