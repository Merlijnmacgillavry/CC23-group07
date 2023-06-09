import React from 'react'
import { Text, Input, Group, Paper, Flex, Divider, Badge } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useChat, Message } from '../providers/ChatProvider'
import { useEffect } from 'react'
import { useSession } from '../providers/SessionProvider'
import { ScrollArea } from '@mantine/core';
import { useRef } from 'react';

export default function Chat({ stage }) {
    const chatContext = useChat()
    const sessionContext = useSession()
    const [message, setMessage] = React.useState('')

    useEffect(() => {
        chatContext.setCurrentStage(stage)
    }, [])

    function botMessage() {
        let rmsg = new Message('How are you feeling after the work you have just done? Do you want to share anything about how you are feeling?', 'CocoBot')
        switch (stage) {
            case 'ChatAfter':
                rmsg = new Message("Hey! How are you feeling? Let's talk about something less serious with your colleague.\nIf you could have one superpower what would it be?", 'CocoBot')
                return (<ChatMessage message={rmsg} robo={true} />)
                break;
            case 'ChatDuring':
                rmsg = new Message('How are you doing with your task? Anything out of the box?', 'CocoBot')
                return (<ChatMessage message={rmsg} robo={true} />)
                break;
            case _:
                return (<></>)
                break;

        }
    }

    function sendMessage() {
        chatContext.sendMessage(message, stage)
        setMessage('')
        scrollToBottom()

    }

    function handleEnter(event) {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatContext.messages])

    const viewport = useRef(null);

    const scrollToBottom = () =>
        viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

    return (
        <Flex className='border-radius' mah={500} mih={'100%'} justify='flex-end' direction={'column'} bg={'dark'}>
            <ScrollArea.Autosize className="messages" mah={600} viewportRef={viewport} >
                {botMessage()}
                {chatContext.messages.length > 0 && chatContext.messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                    // <Paper key={index} className='border-radius' mt={'sm'} p={'sm'} bg={'dark'} >
                    //     <Text size={'sm'}>{message.text}</Text>
                    // </Paper>
                ))}
            </ScrollArea.Autosize>
            <Divider />
            <Input className='border-radius' value={message} onKeyDown={handleEnter} onChange={(event) => setMessage(event.currentTarget.value)}
                size={'lg'}
                placeholder="..."
                rightSection={
                    <IconSend size="1.5rem" onClick={() => sendMessage()} />
                }
            />
        </Flex >
    )
}

export function ChatMessage({ message, robo = false }) {
    const sessionContext = useSession()
    return (
        <Group position={message.sender === sessionContext.user.display_name ? 'right' : 'left'} mx='sm' >
            <Paper bg={message.sender === sessionContext.user.display_name && 'pink.9'} w={'80%'} p="sm" shadow="xs" style={{ marginBottom: '10px' }} className='border-radius'>

                <Flex direction='row' justify={'space-between'} align={'center'} mb='md' >
                    <Text size="sm" fs={'italic'} weight={500}>
                        {message.sender === sessionContext.user.display_name ? 'You' : message.sender}                                </Text>
                    {!robo && <Badge variant="light" color="gray" style={{ marginTop: '5px' }}>
                        {message.timestamp}
                    </Badge>}
                </Flex>
                <Text size="sm" align='left'>{message.text}</Text>

            </Paper>
        </Group>
    )
}