import { useState } from 'react'
import './App.css'
import Onboarding from './pages/Onboarding'
import IntakeSurvey from './pages/IntakeSurvey'
import MainTask from './pages/MainTask'
import ExitSurvey from './pages/ExitSurvey'
import { useSession } from './providers/SessionProvider'
import Instructions from './pages/Instructions'
import { useEffect } from 'react'
import CloudStoreProvider from './providers/CloudStoreProvider'

export const states = {
  Instructions: 'Instructions',
  Onboarding: 'Onboarding',
  IntakeSurvey: 'IntakeSurvey',
  MainTask: 'MainTask',
  ExitSurvey: 'ExitSurvey',
}

function App() {

  const [currentState, setCurrentState] = useState(states.Instructions)

  const { user, createUser } = useSession()

  useEffect(() => {
    console.log(user)
    if (user) setCurrentState(user.state)
  }, [user])

  useEffect(() => {
    if (user) user.updateState(currentState)
  }, [currentState])


  function renderState() {

    switch (currentState) {
      case states.Instructions:
        return <Instructions setCurrentState={setCurrentState} />
      case states.Onboarding:
        return <Onboarding setCurrentState={setCurrentState} />
      case states.IntakeSurvey:
        return <IntakeSurvey setCurrentState={setCurrentState} />
      case states.MainTask:
        return <MainTask />
      case states.ExitSurvey:
        return <ExitSurvey />
      default:
        return <Instructions />
    }
  }

  return (
    <>
      <CloudStoreProvider>

        {renderState()}
      </CloudStoreProvider>
    </>

  )
}

export default App