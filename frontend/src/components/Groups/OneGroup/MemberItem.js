
export default function MemberItem({member}) {
  const memberJoinDate = new Date(member.Membership.createdAt).toDateString().split(' ')

  return (
    <div className="og-member-item-container">
      <div className="member-image-container">
        <div className="nav-user">{member.firstName[0]}</div>
      </div>
      <div className="member-name-join">
        <p className="member-name">{member.firstName} {member.lastName}</p>
        <p>Joined {`${memberJoinDate.slice(1, 2)} ${memberJoinDate.slice(2, 3)}, ${memberJoinDate.slice(3, 4)}`}</p>
      </div>
    </div>
  )

}
