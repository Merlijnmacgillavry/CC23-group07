import { SegmentedControl, Text, Title, Flex, Group, Button, Stack } from '@mantine/core';
import React from 'react'
import { useForm } from '@mantine/form';
import { useCloudStore } from '../providers/CloudStoreProvider'
import { states } from '../App'
export const likertOptions =
    [
        { label: 'Strongly Disagree', value: '1' },
        { label: 'Disagree', value: '2' },
        { label: 'Neutral', value: '3' },
        { label: 'Agree', value: '4' },
        { label: 'Strongly Agree', value: '5' },
    ]


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
        cloudStore.saveSurvey(values).then(() => console.log('saved survey')).catch((error) => console.log(error))
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

function LikertQuestion({ form, question }) {
    return (
        <div>
            <Text fw={700} ta={'left'} my='sm'>{question}</Text>
            <SegmentedControl
                data={likertOptions}
                {...form.getInputProps(question)}
            />
        </div>)
}