export default function UserData({userData}) {
  return (
    <div>
        <h1>Hello, {userData.name}</h1>
        <br/>
        <h2>Here is your data: {userData.desc}</h2>
    </div>
  )
}