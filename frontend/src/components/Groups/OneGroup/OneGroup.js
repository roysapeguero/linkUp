import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { deleteGroupThunk, getGroup } from "../../../store/groups";
import './OneGroup.css'
import EditGroupModal from "../EditGroup";
import CreateEventModal from "../../Events/CreateEvent";
import OpenModalButton from "../../OpenModalButton";

export default function OneGroupPage (){
  const dispatch = useDispatch();
  const history = useHistory();
  const {groupId} = useParams();

  useEffect(() => {
		dispatch(getGroup(groupId));
	}, [dispatch, groupId]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteGroupThunk(groupId))
    .then(async () => {
      history.push('/groups')
    })
  }

  const currentGroup = useSelector(state => state.groups.group)
  const currentUser = useSelector((state) => state.session.user)

  if (!currentGroup.GroupImages) return;

  let isOrganizer = false

  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id
  }

  if (currentGroup.numMembers === 0) currentGroup.numMembers = 1

  const groupInfo = currentGroup ? (
    <div className="one-group-page">
      <div className="line"></div>
      <div className="one-group-container">
        <div className='one-group-image-container'>
          <img
              className='one-group-image'
              alt={`${currentGroup.name}'s preview`}
              src={currentGroup.GroupImages.length > 0 ?
                  `${currentGroup.GroupImages[0].url}`
                  : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                }
          />
        </div>
        <div className='one-group-description'>
          <h1 className='one-group-name'>{currentGroup.name}</h1>
          <div className="one-group-info">
            <img className="location-img" alt='location icon' src='https://secure.meetupstatic.com/next/images/design-system-icons/map-marker-outline.svg' />
            <p className='one-group-location'>{`${currentGroup.city}, ${currentGroup.state}`}</p>
            <p className='one-group-info-members'>{
              `${currentGroup.numMembers} ${currentGroup.numMembers > 1 ? "members" : "member"} `}&#x2022;
              {currentGroup.private ? " Private group" : " Public group"}
            </p>
            <img className="users-img" alt='users icon' src='https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/users-icon.png' />
            <img className='user-img' alt='user icon' src='https://www.citypng.com/public/uploads/small/3163494658960sph4obyj9nhmdtvj6hp43eehbjake40kkqawxnvpr4kvh4qv2yxsfxmbf2ahxtgdsjwao1bftyicsrks0diqz1jkk2bokzqtvy.png' />
            <p className="organized">Organized by </p>
            <p className="org-user-name">{`${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</p>
            <h3 className="about-title">What we're about</h3>
            <p className='one-group-about'>{currentGroup.about}</p>
          </div>
        </div>
      </div>
      <div className="user-btns">
        {isOrganizer && (
        <div className="user-actions">
          <OpenModalButton
          buttonText="Edit Group"
          modalComponent={<EditGroupModal group={currentGroup} />}
          />
          <OpenModalButton
          buttonText="Create An Event"
          modalComponent={<CreateEventModal group={currentGroup} />}
          />
          <button onClick={handleDelete}>
            Delete Group
          </button>
        </div>
          )}
      </div>
    </div>
  ) : (<h1>Loading group details...</h1>)
  return groupInfo;
}
