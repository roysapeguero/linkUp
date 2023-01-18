import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroups } from '../../store/groups.js';
import './Groups.css';

const Groups = () => {
const dispatch = useDispatch()
const groupsObj = useSelector(state=> state.groups.allGroups)
const groups = Object.values(groupsObj)
const history = useHistory();

useEffect(() => {
  dispatch(getGroups())
}, [])

if (!groups) return null;
const groupInfo = groups.map((group) => {
  return (
    <div key = {group.id} className="group-container">
      <hr />
      <div className='img-container'>
        <img className='preview-img' alt='' src="https://secure.meetupstatic.com/photos/event/a/1/0/b/600_508961227.webp?w=1080" />
      </div>
      <div className='group-description'>
        <h2 className='group-name'>{group.name}</h2>
        <h2 className='group-location'>{`${group.city}, ${group.state}`}</h2>
      </div>
      <div>
        <p className='group-about'>{group.about}</p>
        <p className='group-info-members'>{`${group.numMembers} ${group.numMembers > 1 ? "members" : "member"} `}&#x2022; {group.private ? "Private" : "Public"}</p>
      </div>
    </div>
    );
  })
  return <div className="group-list-container">{groupInfo}</div>;
};

export default Groups;
