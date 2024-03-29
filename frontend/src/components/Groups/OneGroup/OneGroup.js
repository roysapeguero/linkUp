import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteGroupThunk, getEvents, getGroup } from "../../../store/groups";
import "./OneGroup.css";
import EditGroupModal from "../EditGroup";
import CreateEventModal from "../../Events/CreateEvent";
import OpenModalButton from "../../OpenModalButton";
import {
  getMembers,
  addMemeberThunk,
  deleteMemberThunk,
} from "../../../store/groups";
import MemberItem from "./MemberItem";
import EventItem from "./EventItem";

export default function OneGroupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.user);
  const groupEventsObj = useSelector((state) => state.groups.allEvents);
  const groupEventsArr = Object.values(groupEventsObj);
  const groupMemsObj = useSelector((state) => state.groups.allMembers);
  const groupMemsArr = Object.values(groupMemsObj);
  const currentGroup = useSelector((state) => state.groups.group);
  const groupMems = useSelector((state) => state.groups.group.numMembers);

  useEffect(() => {
    dispatch(getGroup(groupId));
    dispatch(getMembers(groupId));
    dispatch(getEvents(groupId));
  }, [dispatch, groupId]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteGroupThunk(groupId)).then(async () => {
      history.push("/groups");
    });
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setErrors([]);
    if (currentUser) {
      return dispatch(
        addMemeberThunk(groupId, {
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          Membership: { status: "member", createdAt: Date.now() },
        })
      );
    } else {
      alert("Create an account or log in to join this group");
    }
  };

  const handleLeave = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(deleteMemberThunk(groupId, currentUser));
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const isMember = (userId) => {
    return userId in groupMemsObj;
  };

  if (!currentGroup.GroupImages) return;

  let isOrganizer = false;

  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id;
  }

  if (currentGroup.numMembers === 0) currentGroup.numMembers = 1;

  const groupInfo = currentGroup ? (
    <div className="one-group-page">
      <div className="one-group-container">
        <div className="one-group-image-container">
          <img
            className="one-group-image"
            alt={`${currentGroup.name}'s preview`}
            src={
              currentGroup.GroupImages.length > 0
                ? `${currentGroup.GroupImages[0].url}`
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            }
          />
        </div>
        <div className="one-group-description">
          <h1 className="one-group-name">{currentGroup.name}</h1>
          <div className="one-group-info">
            <div className="og-about-info">
              <img
                className="location-img"
                alt="location icon"
                src="https://secure.meetupstatic.com/next/images/design-system-icons/map-marker-outline.svg"
              />
              <p className="one-group-location">{`${currentGroup.city}, ${currentGroup.state}`}</p>
            </div>
            <div className="og-about-info">
              <img
                className="users-img"
                alt="users icon"
                src="https://icons.iconarchive.com/icons/custom-icon-design/silky-line-user/512/users-icon.png"
              />
              <p className="one-group-info-members">
                {`${currentGroup.numMembers} ${
                  currentGroup.numMembers > 1 ? "members" : "member"
                } `}
                &#x2022;
                {currentGroup.private ? " Private group" : " Public group"}
              </p>
            </div>
            <div className="og-about-info">
              <img
                className="user-img"
                alt="user icon"
                src="https://www.citypng.com/public/uploads/small/3163494658960sph4obyj9nhmdtvj6hp43eehbjake40kkqawxnvpr4kvh4qv2yxsfxmbf2ahxtgdsjwao1bftyicsrks0diqz1jkk2bokzqtvy.png"
              />
              <p className="organized">
                Organized by{" "}
                <strong>{`${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="og-middle-page">
        <div className="tabs-container">
          <div className="bloc-tabs">
            <button
              type="button"
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              About
            </button>
            <button
              type="button"
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Events
            </button>
            <button
              type="button"
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Members
            </button>
            <button
              type="button"
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              Photos
            </button>
            <button
              type="button"
              className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(5)}
            >
              Discussions
            </button>

            {isMember(currentUser?.id) ? (
              <button
                onClick={handleLeave}
                id="modal-btns"
                className="og-join-btn join-leave-btn"
              >
                Leave this group
              </button>
            ) : (
              <button
                onClick={handleJoin}
                id="modal-btns"
                className="og-join-btn join-leave-btn"
              >
                Join this group
              </button>
            )}
          </div>
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "contents  active-content" : "contents"
              }
            >
              <div className="og-about-tab-content">
                <h3 className="about-title">What we're about</h3>
                <p className="one-group-about">{currentGroup.about}</p>
              </div>
            </div>
            <div
              className={
                toggleState === 2 ? "contents  active-content" : "contents"
              }
            >
              <div className="og-events-container">
                {groupEventsArr.length ? (
                  groupEventsArr.map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))
                ) : (
                  <h3 className="og-no-events">
                    This group currently has no events, please check again
                    later!
                  </h3>
                )}
              </div>
            </div>
            <div
              className={
                toggleState === 3 ? "contents  active-content" : "contents"
              }
            >
              <div className="og-mambers-container">
                <h3 className="og-mambers-container-title">
                  All Members <span>({currentGroup.numMembers})</span>
                </h3>
                <div className="og-member-display-container">
                  {groupMemsArr.map((member) => (
                    <MemberItem key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </div>
            <div
              className={
                toggleState === 4 ? "contents  active-content" : "contents"
              }
            >
              <h3 className="og-new-feature">COMING SOON!</h3>
            </div>
            <div
              className={
                toggleState === 5 ? "contents  active-content" : "contents"
              }
            >
              <h3 className="og-new-feature">COMING SOON!</h3>
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
              <button onClick={handleDelete}>Delete Group</button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading group details...</h1>
  );
  return groupInfo;
}
