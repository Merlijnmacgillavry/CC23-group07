import React from 'react'
import { useSession } from './SessionProvider'
import { db } from '../firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'

const CloudStoreContext = React.createContext()
export const useCloudStore = () => React.useContext(CloudStoreContext)

export default function CloudStoreProvider(props) {
    const sessionContext = useSession()

    async function saveSurvey(survey) {
        // save survey to firestore
        try {
            const IntakeSurveyRef = doc(db, 'users', sessionContext.user.user_code, 'surveys', 'intakeSurvey')
            await setDoc(IntakeSurveyRef, {
                survey
            }
            )
        }
        catch (error) {
            console.log(error)
            throw error
        }

    }


    return (
        <CloudStoreContext.Provider value={{ saveSurvey }}>
            {props.children}
        </CloudStoreContext.Provider>
    )
}
