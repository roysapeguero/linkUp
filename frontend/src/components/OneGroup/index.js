import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getGroup } from "../../store/groups";

export default function OneGroupPage (){
  const dispatch = useDispatch();
  const {groupId} = useParams();
  useEffect(() => {
		dispatch(getGroup(groupId));
	}, [dispatch, groupId]);

  const currentGroup = useSelector(state => state.groups.group)

  const groupInfo = currentGroup ? (
    <div className="one-group-container">
      <div className='img-container'>
        <img className='preview-img' alt='' src="https://secure.meetupstatic.com/photos/event/a/1/0/b/600_508961227.webp?w=1080" />
      </div>
      <div className='group-description'>
        <h2 className='group-name'>{currentGroup.name}</h2>
        <h2 className='group-location'>{`${currentGroup.city}, ${currentGroup.state}`}</h2>
      </div>
      <div>
        <p className='group-about'>{currentGroup.about}</p>
        <p className='group-info-members'>{`${currentGroup.numMembers} ${currentGroup.numMembers > 1 ? "members" : "member"} `}&#x2022; {currentGroup.private ? "Private" : "Public"}</p>
      </div>
    </div>
  ) : (<h1>Loading group details...</h1>)
  return groupInfo
}
