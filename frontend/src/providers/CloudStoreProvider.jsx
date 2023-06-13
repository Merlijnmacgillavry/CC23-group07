import React from 'react'
import { useSession } from './SessionProvider'
import { db } from '../firebaseConfig'
import { setDoc, doc, getDoc } from 'firebase/firestore'

const CloudStoreContext = React.createContext()
export const useCloudStore = () => React.useContext(CloudStoreContext)

export default function CloudStoreProvider(props) {
    const sessionContext = useSession()
    const [reports, setReports] = React.useState([])

    async function saveFinalReport(finalReport, task_id) {
        try {
            const reportsRef = doc(db, 'Finalreport', sessionContext.user.user_code, "tasks", task_id.toString())
            await setDoc(reportsRef, {
                finalReport: [...finalReport].map((explicit) => ({ explicit }))
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    async function saveReport(report) {
        // save tasks to firestore
        try {
            const reportsRef = doc(db, 'reports', sessionContext.user.user_code)
            const reportsDoc = await getDoc(reportsRef)
            const existingReports = reportsDoc.exists() ? reportsDoc.data().reports : []
            const updatedReports = [...existingReports, report]
            await setDoc(reportsRef, {
                reports: updatedReports.map((task) => ({ ...task }))
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
        <CloudStoreContext.Provider value={{ saveSurvey, saveReport, saveFinalReport }}>
            {props.children}
        </CloudStoreContext.Provider>
    )
}
