import React from 'react'
import { Text, Input, Group, Paper, Flex, Divider, Badge } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useChat } from '../providers/ChatProvider'
import { useEffect } from 'react'
import { useSession } from '../providers/SessionProvider'

export default function Chat({ stage }) {
    const chatContext = useChat()
    const sessionContext = useSession()
    const [message, setMessage] = React.useState('')

    useEffect(() => {
        chatContext.setCurrentStage(stage)

    }, [stage])

    function sendMessage() {
        chatContext.sendMessage(message, stage)
        setMessage('')

    }

    return (
        <Flex className='border-radius' mih={'100%'} justify='flex-end' direction={'column'} bg={'dark'}>
            <div className="messages">
                {chatContext.messages.map((message, index) => (
                    <Group position={message.sender === sessionContext.user.display_name ? 'right' : 'left'} mx='sm' >
                        <Paper bg={message.sender === sessionContext.user.display_name && 'pink.9'} w={'80%'} p="sm" shadow="xs" style={{ marginBottom: '10px' }} className='border-radius'>

                            <Flex direction='row' justify={'space-between'} align={'center'} mb='md' >
                                <Text size="sm" fs={'italic'} weight={500}>
                                    {message.sender === sessionContext.user.display_name ? 'You' : message.sender}                                </Text>
                                <Badge variant="light" color="gray" style={{ marginTop: '5px' }}>
                                    {message.timestamp}
                                </Badge>
                            </Flex>
                            <Text size="sm" align='left'>{message.text}</Text>

                        </Paper>
                    </Group>
                    // <Paper key={index} className='border-radius' mt={'sm'} p={'sm'} bg={'dark'} >
                    //     <Text size={'sm'}>{message.text}</Text>
                    // </Paper>
                ))}
            </div>
            <Divider />
            <Input className='border-radius' value={message} onChange={(event) => setMessage(event.currentTarget.value)}
                size={'lg'}
                placeholder="..."
                rightSection={
                    <IconSend size="1.5rem" onClick={() => sendMessage()} />
                }
            />
        </Flex >
    )
}
