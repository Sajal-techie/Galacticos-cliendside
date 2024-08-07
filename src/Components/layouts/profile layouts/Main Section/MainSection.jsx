import React, { Suspense, useState } from 'react'
import { baseUrl } from '../../../../api/api'
import coverImage from '../../../../assets/cover.png'
import userApi from '../../../../api/axiosconfig'
import { useQueryClient } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UpdateDetailsModal = React.lazy(()=>import ('./UpdateDetailsModal'))
const ViewDetailsModal =  React.lazy(()=>import ('./ViewDetailsModal'))
const CoverImgModal = React.lazy(()=>import ('./CoverImgModal'))
const ImgModal = React.lazy(()=>import ('./ImgModal'))

const MainSection = React.memo(({id,academy,profile_pic,cover_pic,userData,ownProfile}) => {
    console.log(userData);
    const [profile,setProfile] = useState()
    const [coverModalOpen,setCoverModalOpen] = useState(false)
    const [cover,setCover] = useState()
    const [updateModalOpen,setUpdateModalOpen] = useState(false)
    const [viewDetailModalOpen,setViewDetailsModalOpen] = useState(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {role, user_id} = useSelector(state=>state.auth)

    const bgColor = academy ? "bg-indigo-500 hover:bg-indigo-800 ":"bg-gblue-400 hover:bg-gblue-700" 
    const textColor = academy ? "text-indigo-500": "text-gblue-500" 
    const imgDivClass = academy ? "items-center mr-0 m-1 ":"mr-36 m-12"
    const textDivClass = academy? "flex flex-col items-center":""
    const textPositon = academy ? "justify-center" : "justify-between"
    const coverImgSrc = cover_pic ? baseUrl+cover_pic: ""
    const profileImgSrc = profile_pic ? baseUrl+profile_pic: ""
    
    //  to  view profile photo
    const ViewProfilePhoto = (image)=>{
        document.getElementById('my_modal_3').showModal() 
        setProfile(image) 
    }
    //  to view/change cover photo
    const ChangeCovelModalOpen = (image)=>{
        setCoverModalOpen(prev=>!prev)
        setCover(image)
    }
    const openUpdateDetailsModal = ()=>{
        setUpdateModalOpen(true)
    }
    const closeUpdateModal = ()=>{
        setUpdateModalOpen(false)
    }
    const changeDetailsModalOpen = ()=>{
        setViewDetailsModalOpen(true)
    }
    const closeDetailsModal = ()=>{
        setViewDetailsModalOpen(false)
    }
    const handleCancelRequest = async ()=>{
        try{
            const res = await userApi.post(`cancel_request/${id}`)
            console.log(res);
            queryClient.invalidateQueries('profile')
        }catch(error){
            console.log(error);
        }
    }
    const handleAccept = async ()=>{
        try{
            const res = await userApi.post(`friend_request_accept/${id}`)
            console.log(res);
            queryClient.invalidateQueries('profile')
        }catch(error){
            console.log(error);
        }
    }
    const handleAddFriend = async ()=>{
        try{
            const res = await userApi.post(`friend_request`,{'to_user':id})
            console.log(res);
            queryClient.invalidateQueries('profile')
        }catch(error){
            console.log(error);
        }
    }
    const handleFollow = async ()=>{
        try{
            const res = await userApi.post(`follow`,{'academy':id})
            console.log(res);
            queryClient.invalidateQueries('profile')
        }catch(error){
            console.log(error);
        }
    }
    const handleUnfollow = async ()=>{
        try{
            const res = await userApi.post('unfollow',{'academy':id})
            console.log(res);
            queryClient.invalidateQueries('profile')
        }catch(error){
            console.log(error);
        }
    }
    const handleMessageClick = async ()=>{
        console.log(id, );
        try{
            const response = await userApi.post(`chat`,{
                sender_id: user_id,
                receiver_id:id
            })
            console.log(response);
            const {thread_name} = response.data
            navigate(`/chat/${thread_name}`)
        }catch(error){
            console.log(error,'error getting thread ');
        }
    }

    return (
    <>
        <div className="bg-white rounded-lg shadow-2xl pb-2">
        {/* cover pic edit  */}
            {
                ownProfile &&
            <div className="absolute  right-0  sm:right-14 md:right-20 xl:right-44  mt-4 rounded mr-2" onClick={()=>ChangeCovelModalOpen(coverImgSrc)}>
                <button  className="border bg-black border-white p-2 rounded text-white hover:text-black hover:bg-white hover:border-black bg-opacity-40" title="change cover picture">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                </button> 
            </div>
            }
            
            {/* cover pic */}
            <div className="w-full h-[250px] bg-slate-300 rounded-lg shadow-md"> 
                <img src={cover_pic ? coverImgSrc :coverImage} 
                        className="w-full h-full rounded-tl-lg rounded-tr-lg"/>
            </div>
            {/* cover pic end  */}

            <div className={`${imgDivClass} flex flex-col -mt-20 font-kanit capitalize`}>                 
                    <img src={profile_pic?profileImgSrc:"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"} style={{borderRadius:'50%'}}
                             className="w-44 h-44 object-cover  border-4 border-white " onClick={()=>ViewProfilePhoto(profileImgSrc)} />                    
                    <div className="flex  w-full">
                        <div className={`${textPositon} flex items-center w-full`}>
                            <div className={`${textDivClass}`}>
                                <div className="flex items-center space-x-2 mt-2">
                                    <p className="text-2xl">{userData?.user?.username}</p>
                                    {
                                        userData?.user?.is_academy ?
                                        <>
                                        {userData?.followers > 5 &&
                                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            </span>
                                        }
                                        </>
                                        :
                                        <>
                                            {userData?.user?.friends?.length > 5 &&
                                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </span>
                                            }                                        
                                        </>
                               }
                                </div>
                                <p className="text-gray-700">{userData?.profile?.bio}</p>
                                <p className="text-sm text-gray-500">{userData?.profile?.state}, {userData?.profile?.district}</p>
                                <p className={`${textColor} normal-case font-semibold`}> 
                                     {
                                        userData?.user?.is_academy ? 
                                        <> {userData?.followers} followers </>
                                        :
                                        <>{userData?.user?.friends?.length} friends </> 
                                     } 
                                </p>
                                {
                                    ownProfile ?
                                    <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={changeDetailsModalOpen}> 
                                        view detials 
                                    </button>
                                    :
                                    role === 'player' ?
                                    <>
                                    {

                                        userData?.friend_status === 'friends' ?
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleMessageClick}> 
                                            message 
                                        </button>
                                        :
                                        userData?.friend_status === 'sent' ?
                                        <button className={`bg-white  border border-gblue-500 rounded-full px-2 py-1 mt-2 text-gblue-500 hover:bg-gblue-400 hover:text-white`} onClick={()=>handleCancelRequest()}> 
                                            cancel request 
                                        </button>
                                        :
                                        userData?.friend_status === 'received' ?
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleAccept}> 
                                            Accept 
                                        </button>
                                        :
                                        userData?.friend_status === 'none' ?
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleAddFriend}> 
                                            Add friend 
                                        </button>
                                        :
                                        userData?.friend_status === 'follow' ?
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleFollow}> 
                                            follow 
                                        </button>
                                        :
                                        userData?.friend_status === 'following' ?
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleUnfollow}> 
                                            following 
                                        </button>
                                        :
                                        <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={changeDetailsModalOpen}> 
                                            nothing 
                                        </button>
                                    }
                                    </> 
                                    :
                                    userData?.user?.is_academy ?
                                    <button>
                                        {/* message */}
                                    </button>
                                    :
                                    userData?.friend_status === 'follower' ?
                                    <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={handleMessageClick}> 
                                        message 
                                    </button>
                                    :
                                    <></>
                                    // <button className={`${bgColor} border border-black rounded-full px-2 py-1 mt-2 text-white`} onClick={changeDetailsModalOpen}> 
                                    //     not followed 
                                    // </button>
                                }
                            </div>
                            
                            {/* current academy section only for players */}
                                {/* { !academy &&  
                                    <div className='sm:flex items-center ml-6 hidden -mt-6 '>
                                        <img className='w-12 h-12' src="https://cdn.pixabay.com/photo/2016/11/21/15/00/academic-1845844_640.jpg" alt="academy image" />
                                        <p className="text-lgml-1 ">Academy name</p>
                                    </div>
                                } */}
                        </div>
                    </div>        
                {
                    ownProfile &&
                    <div className="absolute  right-0  sm:right-14 md:right-20 xl:right-44  mt-24 rounded ">
                        <button  className=" p-2 rounded text-black hover:text-gray-300  bg-opacity-10 hover:bg-opacity-20" title="edit" onClick={openUpdateDetailsModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-6 size-5  text-black hover:text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
        <Suspense fallback={<>loading</>}>

            <ImgModal state={profile} is_pic={profile_pic} 
                    id={id} 
                    bgColor={bgColor} textColor={textColor} 
                    ownProfile={ownProfile}
                    />
        </Suspense>
        <Suspense fallback={<>loading</>}>
            {coverModalOpen &&   
                    <CoverImgModal  id={id} isOpen={coverModalOpen} 
                                    changeModalStatus={ChangeCovelModalOpen}  
                                    state={cover} 
                                    bgColor={bgColor} textColor={textColor}
                                    />
                }
        </Suspense>
        { updateModalOpen && 
            <Suspense fallback={<>loading</>}>
                <UpdateDetailsModal isOpen={updateModalOpen} 
                                    closeModal={closeUpdateModal} 
                                    username={userData?.user?.username} 
                                    phone={userData?.user?.phone}
                                    bio={userData?.profile?.bio}
                                    state={userData?.profile?.state} 
                                    district={userData?.profile?.district}
                                    academy={academy}
                                    sport={userData.sport}
                                    />
        </Suspense>}
        <Suspense fallback={<>loading</>}>
            { viewDetailModalOpen &&   <ViewDetailsModal isOpen={viewDetailModalOpen} 
                            userData={userData} 
                            closeModal={closeDetailsModal}
                            />
                            }
        </Suspense>
    </>
  )
}
)
export default MainSection
