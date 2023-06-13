import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Button, Text, Title, Modal, Flex, Paper, List, Checkbox, Image, Center } from '@mantine/core'
import { states } from '../App'
import { Carousel } from '@mantine/carousel';

export default function Instructions({ setCurrentState }) {
    const [opened, { open, close }] = useDisclosure(false)
    const [accepted, setAccepted] = React.useState(false)

    return (
        <>
            <Flex direction='column' align='center' justify='center' mih={'80vh'} gap={20}>
                <Title>Welcome to CoCoMo!</Title>
                <Text >CoCoMo is a experimental tool for content moderation of users</Text>
                <Text>Click on the following button to open a modal with the instructions</Text>
                <Button onClick={open}>Show Instructions</Button>


                <Checkbox
                    label="I have read and understood the instructions"
                    onChange={(event) => {
                        setAccepted(event.currentTarget.checked)
                    }}
                />
                {accepted && <Button onClick={() => setCurrentState(states.Onboarding)} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} >Start work</Button>
                }
            </Flex>
            <Modal opened={opened} onClose={close} title="Instructions" centered size={'100%'}>
                <Carousel slideSize={'100%'} maw={'100%'} withIndicators height={'80vh'}>
                    <Carousel.Slide><InstructionsS1 /></Carousel.Slide>
                    <Carousel.Slide><InstructionsS2 /></Carousel.Slide>
                    <Carousel.Slide><InstructionsS3 /></Carousel.Slide>
                    <Carousel.Slide><InstructionsS4 /></Carousel.Slide>
                    <Carousel.Slide><InstructionsS5 /></Carousel.Slide>
                    {/* ...other slides */}
                </Carousel>
            </Modal></>
    )
}
function InstructionsS2() {
    return (
        <Center>
            <Image maw={'50vw'} src="./I-Board.png" alt="Application view" />
        </Center>
    )
}
function InstructionsS3() {
    return (
        <Center>
            <Image maw={'50vw'} src="./I-Controls.png" alt="Controls explanation" caption="Playback controls for videos"
            />
        </Center>
    )
}
function InstructionsS5() {
    return (
        <Center>
            <Image maw={'50vw'} src="./I-Chat.png" alt="Controls explanation"
            />
        </Center>
    )
}


function InstructionsS1() {
    return (
        <Paper padding="md" >
            <List>
                <List.Item>
                    <Text>Once you click “Start work” after reading the instructions you will be asked to fill an onboarding form consisting of three fields which need to be filled by you:</Text>
                    <List>
                        <List.Item>User code: enter code provided by us</List.Item>
                        <List.Item>Username: Any name you prefer (you will be identified by other people by this name)</List.Item>
                        <List.Item>Session code: enter code provided by us</List.Item>
                    </List>

                </List.Item>
                <List.Item>
                    <Text>The actual tasks begin now. The task consists of three phases</Text>
                </List.Item>
                <List.Item>
                    <Text>PHASE 1: 10 min video 1 min break</Text>
                    <Text>PHASE 2: 10 min video 5 min break</Text>
                    <Text>PHASE 3: 10 min video Finished</Text>
                </List.Item>
                <List.Item>
                    <Text>In each phase you are required to monitor and label explicit content possibly present in three videos, these types of explicit can be:</Text>
                    <List>
                        <List.Item>Sex</List.Item>
                        <List.Item>Violence</List.Item>
                        <List.Item>Drugs</List.Item>
                        <List.Item>Language</List.Item>
                    </List>
                </List.Item>
                <List.Item>
                    <Text>Find an overview of the application in the next slide!</Text>
                </List.Item>
            </List>
        </Paper>
    )
}
function InstructionsS4() {
    return (
        <Paper padding="md" >
            <List>
                <List.Item>
                    <Text>Once done with the first phase, there will be a break of 5 minutes. A break screen will be presented to you</Text>
                </List.Item>
                <List.Item>
                    <Text>If you finish your first task early, you will still be directed to the break screen where you can wait to start the next task</Text>
                </List.Item>
                <List.Item>
                    <Text>You will be prompted to start the second phase post the 5mins. The first break allows you to sit back and relax and no action is needed</Text>
                </List.Item>
                <List.Item>
                    <Text>You will perform the same task in the second phase as the first</Text>
                </List.Item>
                <List.Item>
                    <Text>During the second 5minute break (after second phase), you can additionally use the chat functionality to text your peer</Text>
                </List.Item>
                <List.Item>
                    <Text>The next slide contains a picture of the break screen with chat</Text>
                </List.Item>
                <List.Item>
                    <Text>Once 5 minutes break is completed, you will be directed to the third phase where you will perform the same activity. However now you can chat with you peer during the task</Text>
                </List.Item>
                <List.Item>
                    <Text>Once you complete all three phases. The experiment ends</Text>
                </List.Item>
            </List>
        </Paper>
    )
}

function ExplicitContentGuidelines() {
    return (
        <Paper padding="md" >
            <Title order={3}>XITE Explicit Content Guidelines</Title>
            <Text>
                In this document, you will learn about XITE’s standards and conditions that make a video explicit according to the ruleset of the XITE Music Team, as determined by the music experts under supervision of Metadata Specialist Gijs Hoogland in 2022.
            </Text>

            <Text variant="h4">Explicit Tags</Text>
            <Text>
                At XITE, we hand the following tags to qualify the explicitness of a music video:
            </Text>
            <List>
                <List.Item>Sex</List.Item>
                <List.Item>Violence</List.Item>
                <List.Item>Drugs</List.Item>
                <List.Item>Language</List.Item>
            </List>

            <Text variant="h4">How to Determine the Explicitness of a Music Video</Text>

            <Text variant="h5">Sex</Text>
            <Text>
                If a video contains the following elements, we consider it to be Explicit: Sex:
            </Text>
            <List>
                <List.Item>
                    Nudity and/or scantily clad actors, as displayed in Sam Smith ft. Kim Petras - Unholy.
                </List.Item>
                <List.Item>
                    Suggestive and highly sensual scenes, as displayed in David Guetta & Bebe Rexha - I’m Good (Blue).
                </List.Item>
                <List.Item>
                    Extensive scenes of nudity and sexuality, as displayed in Fivio Foreign ft. Quavo - Magic City.
                </List.Item>
            </List>
            <Text>
                Furthermore, a video will be considered Explicit: Sex when it contains sexual scenes, sexual acts, or when the camera is zooming in on breasts, butts or genitals. A video such as Nicki Minaj - Super Freaky Girl ticks all the above mentioned boxes.
            </Text>

            <Text variant="h5">Violence</Text>
            <Text>
                If a video contains the following elements, we consider it to be Explicit: Violence:
            </Text>
            <List>
                <List.Item>
                    Scenes of fighting all the way through with clear violent impact, as displayed in My Chemical Romance - Na Na Na [Na Na Na Na Na Na Na Na Na].
                </List.Item>
                <List.Item>
                    Blood and gore, whether it’s animated or not, as displayed in Fall Out Boy - The Carpal Tunnel Of Love.
                </List.Item>
                <List.Item>
                    Gun placement and violence, as displayed in Michael Kiwanuka - Beautiful Life.
                </List.Item>
            </List>
            <Text>
                Furthermore, a video will be considered Explicit: Violence when it contains scenes of self-harm, when there are obvious signs of fear in the actor’s eyes, or when a gun is pointed in the direction of a person. A video such as Asking Alexandria - The Violence ticks all the above mentioned boxes.
            </Text>

            <Text variant="h5">Drugs</Text>
            <Text>
                If a video contains the following elements, we consider it to be Explicit: Drugs:
            </Text>
            <List>
                <List.Item>
                    Drug display and use, as well as scenes where the person in the video is under the influence of drugs, as displayed in Lil Peep - Come Around.
                </List.Item>
                <List.Item>
                    Smoking, whether it be a cigarette, cigar, or weed, as displayed in Post Malone ft. Roddy Ricch - Cooped Up.
                </List.Item>
                <List.Item>
                    Drug glamorization or stimulation, as displayed in Mike Posner - I Took A Pill in Ibiza (Seeb Remix).
                </List.Item>
            </List>
            <Text>
                Furthermore, a video will be considered Explicit: Drugs when the lyrics are explicitly mentioning drugs (see FIDLAR - Cocaine) or there are viewings of drug paraphernalia. A video such as UPSAHL - Drugs ticks all the above mentioned boxes.
            </Text>

            <Text variant="h5">Language</Text>
            <Text>
                If the lyrics of a video contain strong language and swear words, we consider it to be Explicit: Language. Be aware, soft swear words such as ‘damn’ or ‘bastard’ are not classified as explicit.
            </Text>
            <Text>
                A video such as Lizzo - About Damn Time contains strong lyrics throughout the song.
            </Text>

            <Text variant="h4">Identifying Explicit Content</Text>
            <Text>
                If you encounter a music video that seems to be explicit according to the above mentioned rules, make sure to mark the exact time(s) in the video that you think are explicit. The more timestamps, the better. We are on a mission to make sure each and every video in our database has the right explicit rating and with more accurate timestamps, it will instantly improve the quality of our music videos.
            </Text>
        </Paper>
    );
}