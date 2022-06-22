// UI component for user profile
export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.photoURL || '/hacker.png'}
        className="card-img-center"
        alt="profile pic"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  )
}
