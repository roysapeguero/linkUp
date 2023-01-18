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
const redirectOneGroupPage = groupId => history.push(`/groups/${groupId}`);

useEffect(() => {
  dispatch(getGroups())
}, [dispatch])

const handleGroupClick = (groupId) => {
  redirectOneGroupPage(groupId)
}

if (!groups) return null;

const groupInfo = groups.map((group) => {
  return (

    <div onClick={() => handleGroupClick(group.id)} key = {group.id} className="group-container">
      <hr />
      <div className='img-container'>
        {console.log(group.previewImage)}
        <img
          className='preview-img'
          src={group.previewImage !== 'No images yet' ? group.previewImage : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}
          alt={group.name + " preview image"}
        />
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
