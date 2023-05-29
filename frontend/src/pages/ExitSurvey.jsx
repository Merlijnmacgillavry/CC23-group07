import { Title, Flex, Group, Button } from '@mantine/core';
import React from 'react'
import { useForm } from '@mantine/form';
import { useCloudStore } from '../providers/CloudStoreProvider'
import { states } from '../App'
import LikertQuestion from '../utils/Question'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

export default function ExitSurvey({ setCurrentState }) {
    const cloudStore = useCloudStore()


    const form = useForm({
        initialValues: {
            question_1: '',
            question_2: '',
            question_3: '',
            question_4: '',
            question_5: '',
        },

        validate: {

        }
    });

    function completeExitSurvey(values) {
        notifications.show({
            id: 'saving-exit-survey',
            title: 'Saving exit survey',
            message: 'Please wait...',
            loading: true,
            autoClose: false,
        })
        cloudStore.saveSurvey(values, 'exitSurvey').then(() => {
            console.log('saved survey')
            notifications.update('saving-exit-survey', {
                title: 'Saved exit survey',
                loading: false,
                icon: <IconCheck size="1rem" />,
                color: 'green',
                autoClose: 2000,
            })
        }).catch((error) => {
            console.log(error)
            notifications.update('saving-exit-survey', {
                title: 'Error saving exit survey',
                message: 'Please try again',
                loading: false,
                color: 'red',
                icon: <IconX size="1rem" />,
                autoClose: 2000,
            })
        })

        setCurrentState(states.Instructions)
    }


    return (
        <>
            <Title order={1}>Exit Survey</Title>
            <form onSubmit={form.onSubmit((values) => completeExitSurvey(values))}>
                <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                    {Object.keys(form.values).map((question, index) => {
                        return (<LikertQuestion key={index} form={form} question={question} />)
                    })}
                    <Group position="right" mt="md">
                        <Button type="submit">End work</Button>
                    </Group>
                </Flex>
            </form>
        </>
    )
}
