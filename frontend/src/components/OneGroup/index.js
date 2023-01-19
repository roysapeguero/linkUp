import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getGroup } from "../../store/groups";
import './OneGroup.css'

export default function OneGroupPage (){
  const dispatch = useDispatch();
  const {groupId} = useParams();

  useEffect(() => {
		dispatch(getGroup(groupId));
	}, [dispatch, groupId]);

  const currentGroup = useSelector(state => state.groups.group)
  const currentUser = useSelector((state) => state.session.user)

  if (!currentGroup.GroupImages) return null
  const images = Object.values(currentGroup.GroupImages)
  const mainImg = images.find(image => image.preview === true)
  let isOrganizer = false

  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id
  }

  const groupInfo = currentGroup ? (
    <div className="one-group-container">
      <div className='img-container'>
      <img
          className='group-image'
          src={mainImg.url ? mainImg.url : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}
          alt={currentGroup.name + " preview image"}
        />
      </div>
      <div className='group-description'>
        <h2 className='group-name'>{currentGroup.name}</h2>
        <h2 className='group-location'>{`${currentGroup.city}, ${currentGroup.state}`}</h2>
      </div>
      <div>
        <p className='group-about'>{currentGroup.about}</p>
        <p className='group-info-members'>{`${currentGroup.numMembers} ${currentGroup.numMembers > 1 ? "members" : "member"} `}&#x2022; {currentGroup.private ? "Private" : "Public"}</p>
      </div>
      {isOrganizer && (
        <div className="user-actions">
          <button>Edit Group</button>
          <button>Delete Group</button>
        </div>
      )}
    </div>
  ) : (<h1>Loading group details...</h1>)
  return groupInfo;
}
