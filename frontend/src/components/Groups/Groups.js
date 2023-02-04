import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getGroups } from '../../store/groups.js';
import './Groups.css';

const Groups = () => {
const dispatch = useDispatch()
const user = useSelector((state) => state.session.user)
const groupsObj = useSelector(state=> state.groups.allGroups)
const groups = Object.values(groupsObj)

const history = useHistory();
const [isLoaded, setIsLoaded] = useState(false)
const redirectOneGroupPage = groupId => history.push(`/groups/${groupId}`);

useEffect(() => {
  dispatch(getGroups()).then(() =>{
    setIsLoaded(true)
  })
}, [dispatch])

const handleGroupClick = (groupId) => {
  redirectOneGroupPage(groupId)
}

if (!groups) return null;

const groupInfo = groups.map((group) => {
  if (group.numMembers === 0) group.numMembers = 1
  return (
    <div onClick={() => handleGroupClick(group.id)} key = {group.id} className="group-container">
      <hr />
      <div className='img-container'>
        <img
          className='preview-img'
          src={group.previewImage === 'No images yet' ?
            "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            : group.previewImage}
          alt={`${group.name}'s preview`}
        />
      </div>
      <div className='group-description'>
        <h2 className='group-name'>{group.name}</h2>
        <h2 className='group-location'>{`${group.city}, ${group.state}`}</h2>
      </div>
      <div>
        <p className='group-about'>{group.about}</p>
        <p className='group-info-members'>{`${group.numMembers} ${group.numMembers > 1 || group.numMembers === 0 ? "members" : "member"} `}&#x2022; {group.private ? "Private" : "Public"}</p>
      </div>
    </div>
    );
  })

  return (
    <div className="group-list-container">
      {!user ? <div className='not-logged-in'>{groupInfo}</div> : groupInfo}
    </div>
  )
};

export default Groups;
