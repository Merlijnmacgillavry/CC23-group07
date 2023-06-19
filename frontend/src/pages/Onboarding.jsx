import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Button, Group, Text, Title, Modal, Flex, Paper, List, TextInput } from '@mantine/core'
import { states } from '../App'
import { useSession } from '../providers/SessionProvider'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
export default function Onboarding({ setCurrentState }) {

    const { createUser, user } = useSession()

    const form = useForm({
        initialValues: {
            user_code: '',
            display_name: '',
            session_code: '',
        },

        validate: {
            user_code: (value) => (value !== '' ? null : 'User code cannot be empty!'),
            display_name: (value) => (value !== '' ? null : 'Name cannot be empty!'),
            session_code: (value) => (value !== '' ? null : 'Session code cannot be empty!'),
        }
    });

    function completeOnboarding(values) {
        notifications.show({
            id: 'saving-onboarding',
            title: `Welcome ${values.display_name}!`,
            icon: <IconCheck size="1rem" />,
            autoClose: 2000,
        })
        createUser(values.user_code, values.display_name, values.session_code, states.IntakeSurvey)
        setCurrentState(states.IntakeSurvey)
    }

    return (
        <>
            <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                <Title order={1}>Onboarding</Title>
                <form onSubmit={form.onSubmit((values) => completeOnboarding(values))}>
                    <TextInput
                        withAsterisk
                        label="User Code"
                        placeholder="123456"
                        {...form.getInputProps('user_code')}
                    />
                    <TextInput
                        withAsterisk
                        label="Display Name"
                        placeholder="John Doe"
                        {...form.getInputProps('display_name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Session Code"
                        placeholder="123456"
                        {...form.getInputProps('session_code')}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Start work</Button>
                    </Group>
                </form>
            </Flex>
        </>
    )
}

