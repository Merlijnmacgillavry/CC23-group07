import { Title, Flex, Group, Button } from '@mantine/core';
import React from 'react'
import { useForm } from '@mantine/form';
import { useCloudStore } from '../providers/CloudStoreProvider'
import { states } from '../App'
import LikertQuestion from '../utils/Question'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

export default function IntakeSurvey({ setCurrentState }) {

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

    function completeIntakeSurvey(values) {
        notifications.show({
            id: 'saving-intake-survey',
            title: 'Saving intake survey',
            message: 'Please wait...',
            loading: true,
            autoClose: false,
        })
        cloudStore.saveSurvey(values, 'intakeSurvey').then(() => {
            console.log('saved intake survey')
            notifications.update('saving-intake-survey', {
                title: 'Saved intake survey',
                loading: false,
                icon: <IconCheck size="1rem" />,
                color: 'green',
                autoClose: 2000,
            })

        }).catch((error) => {
            console.log(error)
            notifications.update('saving-intake-survey', {
                title: 'Error saving intake survey',
                message: 'Please try again',
                loading: false,
                color: 'red',
                icon: <IconX size="1rem" />,
                autoClose: 2000,
            }
            )
        })
        setCurrentState(states.MainTask)
    }


    return (
        <>
            <Title order={1}>Intake Survey</Title>
            <form onSubmit={form.onSubmit((values) => completeIntakeSurvey(values))}>
                <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                    {Object.keys(form.values).map((question, index) => {
                        return (<LikertQuestion key={index} form={form} question={question} />)
                    })}
                    <Group position="right" mt="md">
                        <Button type="submit">Start work</Button>
                    </Group>
                </Flex>
            </form>
        </>
    )
}

