import React from 'react'
import { useSession } from './SessionProvider'
import { db } from '../firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'

const CloudStoreContext = React.createContext()
export const useCloudStore = () => React.useContext(CloudStoreContext)

export default function CloudStoreProvider(props) {
    const sessionContext = useSession()

    async function saveReports(reports) {
        // save tasks to firestore
        try {
            const reportsRef = doc(db, 'users', sessionContext.user.user_code, 'reports', 'reports')
            await setDoc(reportsRef, {
                reports: reports.map((task) => ({ ...task }))
            }
            )
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    async function saveSurvey(survey, surveyType) {
        // save survey to firestore
        try {
            const IntakeSurveyRef = doc(db, 'users', sessionContext.user.user_code, 'surveys', surveyType || 'intakeSurvey')
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
        <CloudStoreContext.Provider value={{ saveSurvey, saveReports }}>
            {props.children}
        </CloudStoreContext.Provider>
    )
}
