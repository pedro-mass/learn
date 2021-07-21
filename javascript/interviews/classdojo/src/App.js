import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const { classRooms, isLoading } = useClassRooms()

  return (
    <div className="App">
      {isLoading && <Loading />}
      {!isLoading &&
        classRooms.map(classroom => (
          <ClassRoom key={classroom.name} {...classroom} />
        ))}
    </div>
  )
}

function Loading() {
  return <p>Loading...</p>
}

function ClassRoom({ name, students }) {
  return (
    <div className="class-room">
      <h2 className="title">{name}</h2>
      <section>
        {students.map(student => (
          <Student key={student.name} {...student} />
        ))}
      </section>
    </div>
  )
}

function Student({ avatar, name, value }) {
  return (
    <section class="student">
      <div className="avatar">
        <img src={avatar} alt={name} />
      </div>
      <p>{name}</p>
      <p className={value > 0 ? 'positive' : 'negative'}>{value}</p>
    </section>
  )
}

function useClassRooms() {
  // make http call
  const [isLoading, setIsLoading] = useState(true)
  const [classRooms, setClassRooms] = useState()

  useEffect(() => {
    async function fetchData() {
      const awards = await fetch(
        'https://teach.classdojo.com/api/interviewChallenge'
      )
        .then(res => res.json())
        .then(x => x.awards)

      const classRoomsObj = awards.reduce(function groupByClassRoom(
        acc,
        award
      ) {
        if (!acc[award.classroom]) {
          acc[award.classroom] = {
            name: award.classroom,
            students: {},
          }
        }

        if (!acc[award.classroom].students[award.student]) {
          acc[award.classroom].students[award.student] = {
            name: award.student,
            avatar: award.studentAvatar,
            value: 0,
          }
        }

        acc[award.classroom].students[award.student].value += award.weight

        return acc
      },
      {})

      const classRooms = Object.values(classRoomsObj).map(classRoom => {
        classRoom.students = Object.values(classRoom.students)

        return classRoom
      })
      setClassRooms(classRooms)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return { classRooms, isLoading }
}

export default App
