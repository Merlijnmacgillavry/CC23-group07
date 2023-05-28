import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Button, Group, Text, Title, Modal, Flex, Paper, List, TextInput } from '@mantine/core'
import { states } from '../App'
import { useSession } from '../providers/SessionProvider'

export default function Onboarding({ setCurrentState }) {

    const { createUser, user } = useSession()

    const form = useForm({
        initialValues: {
            user_code: '',
            display_name: '',
        },

        validate: {
            user_code: (value) => (value !== '' ? null : 'User code cannot be empty!'),
            display_name: (value) => (value !== '' ? null : 'Name cannot be empty!'),
        }
    });

    function completeOnboarding(values) {
        createUser(values.user_code, values.display_name, states.IntakeSurvey)
        setCurrentState(states.IntakeSurvey)
    }

    return (
        <>
            <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                <form onSubmit={form.onSubmit((values) => completeOnboarding(values))}>
                    <TextInput
                        withAsterisk
                        label="Usercode"
                        placeholder="123456"
                        {...form.getInputProps('user_code')}
                    />
                    <TextInput
                        withAsterisk
                        label="Display Name"
                        placeholder="John Doe"
                        {...form.getInputProps('display_name')}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Start work</Button>
                    </Group>
                </form>
            </Flex>
        </>
    )
}

