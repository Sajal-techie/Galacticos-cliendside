import React, { useEffect, useState } from 'react'
import Navbar from '../../../layouts/navbar/Navbar'
import SideBarLayout from '../SideBarLayout'
import FriendListItem from '../friends list/FriendListItem'
import userApi from '../../../../api/axiosconfig'
import BottomNavbar from '../../../layouts/navbar/BottomNavbar'

const Following = () => {
    const [following,setFollowing] = useState([])

    useEffect(()=>{
        fetchFollowings()
    },[])

    const fetchFollowings = async () =>{
        try{
            const response = await userApi.get('follow')
            console.log(response);
            setFollowing(response.data)
        }catch(error){
            console.log(error);
        }
    } 
  return (
    <>
    <Navbar />
    <SideBarLayout >
    <div className="flex-grow p-8 bg-gray-100 font-kanit">
      <h1 className="text-2xl font-bold mb-4">Following</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
        {
            following.length > 0 ? 
            <div>
            {following.map((friend, index) => (
                <FriendListItem
                key={index}
                name={friend?.academy?.username}
                bio={friend?.academy?.bio}
                id={friend?.academy?.id}
                profileImage={friend?.academy?.profile_photo}
                type={'academy'}
                fetchData={fetchFollowings}
                />
            ))}
        </div>
        :
        <div className='flex items-center p-4 bg-white shadow-md rounded-lg mb-4'>
            No followings
        </div>
        }
    </div>
    </SideBarLayout>
    <BottomNavbar />
    </>
  )
}

export default Following
