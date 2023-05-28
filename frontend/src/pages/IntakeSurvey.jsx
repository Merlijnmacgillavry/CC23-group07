import { SegmentedControl, Title, Flex, Group, Button, Stack } from '@mantine/core';
import React from 'react'
import { useForm } from '@mantine/form';
export const likertOptions =
    [
        { label: 'Strongly Disagree', value: '1' },
        { label: 'Disagree', value: '2' },
        { label: 'Neutral', value: '3' },
        { label: 'Agree', value: '4' },
        { label: 'Strongly Agree', value: '5' },
    ]


export default function IntakeSurvey() {



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
    return (
        <>
            <Title order={1}>Intake Survey</Title>
            <form onSubmit={form.onSubmit((values) => completeOnboarding(values))}>
                <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                    <SegmentedControl
                        data={likertOptions}
                        label='I am confident in my ability to complete this task'
                        {...form.getInputProps('question_1')}
                    />
                    <SegmentedControl
                        data={likertOptions}
                        {...form.getInputProps('question_2')}
                    />
                    <SegmentedControl
                        data={likertOptions}
                        {...form.getInputProps('question_3')}
                    />
                    <SegmentedControl
                        data={likertOptions}
                        {...form.getInputProps('question_4')}
                    />
                    <SegmentedControl
                        data={likertOptions}
                        {...form.getInputProps('question_5')}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Start work</Button>
                    </Group>
                </Flex>
            </form>
        </>
    )
}
