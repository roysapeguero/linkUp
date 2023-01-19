import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getGroup } from "../../store/groups";
import './OneGroup.css'
import EditGroupModal from "../EditGroup";
import OpenModalButton from "../OpenModalButton";

export default function OneGroupPage (){
  const dispatch = useDispatch();
  const {groupId} = useParams();

  useEffect(() => {
		dispatch(getGroup(groupId));
	}, [dispatch, groupId]);

  const currentGroup = useSelector(state => state.groups.group)
  const currentUser = useSelector((state) => state.session.user)

  if (!currentGroup.GroupImages) return;

  const images = Object.values(currentGroup.GroupImages)
  const mainImg = images.find(image => image.preview === true)
  let isOrganizer = false

  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id
  }

  const groupInfo = currentGroup ? (
    <div className="one-group-container">
      <div className='image-container'>
      <img
          className='group-image'
          alt={`${currentGroup.name}'s preview`}
          src={
            currentGroup.GroupImages?.length > 0 ?
              `${currentGroup.GroupImages[0].url}` : ""
            }
        />
      </div>
      <div className='one-group-description'>
        <h2 className='one-group-name'>{currentGroup.name}</h2>
        <h2 className='one-group-location'>{`${currentGroup.city}, ${currentGroup.state}`}</h2>
      </div>
      <div>
        <p className='one-group-about'>{currentGroup.about}</p>
        <p className='one-group-info-members'>{
          `${currentGroup.numMembers} ${currentGroup.numMembers > 1 ? "members" : "member"} `}&#x2022;
           {currentGroup.private ? " Private" : " Public"}
        </p>
      </div>
      {isOrganizer && (
        <div className="user-actions">
          <OpenModalButton
          buttonText="Edit Group"
          modalComponent={<EditGroupModal group={currentGroup} />}
        />
          <button>Delete Group</button>
        </div>
      )}
    </div>
  ) : (<h1>Loading group details...</h1>)
  return groupInfo;
}
