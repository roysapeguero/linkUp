import { useSelector } from "react-redux";
import { getMembers } from "../../../store/groups";


export default function MemberItem({member}) {

  return (
    <div className="og-member-item--container">
      <div className="member-image-container">

      </div>
      <div className="member-image-container">
        <p className="member-name">{member.firstName} {member.lastName}</p>
        {member.Membership.createdAt}
      </div>
    </div>
  )

}
