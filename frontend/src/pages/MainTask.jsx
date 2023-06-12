import React from 'react'
import { Group, Badge, RingProgress, Text, Title, AspectRatio, Divider, Button, Flex, ActionIcon } from '@mantine/core'
import getTasks from '../utils/getTasks';
import getStages from '../utils/getStages';
import { useEffect } from 'react';
import Youtube from 'react-youtube';
import { states } from '../App'
import { useCloudStore } from '../providers/CloudStoreProvider';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Timer } from '../utils/timer';
import Chat from '../utils/Chat';
import { StageTypes } from '../utils/getStages';
export const explicitCategories = {
    'Sex': 'blue',
    'Violence': 'green',
    'Drugs': 'yellow',
    'Language': 'red'
}

const stageModes = {
    Ready: 'Ready',
    Tasks: 'Tasks',
    Idle: 'Idle',
}
export function Ready({ startStage }) {
    return (
        <Group position="center" direction="column" spacing="lg">
            <Title order={1}>Ready?</Title>
            <Button onClick={startStage}>Start</Button>
        </Group>
    )
}
export function RemoveButton({ category, removeReport, categories }) {
    return (
        <ActionIcon size="xs" color={categories[category]} radius="xl" variant="transparent">
            <IconX size={'md'} onClick={removeReport(category)} />
        </ActionIcon>
    )
}
export function Tasks({ tasks, currentTask, nextTask, registerPlayer, reportExplicitContent, stages, currentStage, finalReport, setFinalReport }) {
    const [categories, setCategories] = React.useState(explicitCategories);
    let currentTaskIndex = currentTask % 3;

    function addReport(category) {
        setFinalReport((prev) => {
            let newSet = new Set(prev);
            newSet.add(category);
            return newSet;
        })
    }
    function removeReport(category) {
        setFinalReport((prev) => {
            let newSet = new Set(prev);
            newSet.delete(category);
            return newSet;
        })
    }



    let opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            // modestbranding: 1,
            origin: "https://www.youtube.com",
            playsInline: 1
        },
    }

    function report(category) {
        if (!finalReport.has(category)) {
            addReport(category);
        }
        reportExplicitContent(tasks[currentTask]?.[0], category);
    }

    function removeButton(color, category) {
        return (
            <ActionIcon size="xs" color={color} radius="xl" variant="transparent">
                <IconX size={'10rem'} onClick={() => removeReport(category)} />
            </ActionIcon>
        );
    }


    return (
        <div className='task'>
            <div className='left'>
                <Flex align={'center'} justify={'space-between'} direction={'row'}>
                    <Title order={2} color='pink.4' align='center' ta={'left'} >{tasks[currentTaskIndex]?.[2]} - {tasks[currentTaskIndex]?.[3]}</Title>
                    <Group align={'center'}>
                        {[...finalReport].map((category, index) => {
                            return (
                                <Badge key={index} color={categories[category]} rightSection={removeButton(categories[category], category)}>
                                    {category}
                                </Badge>
                            )
                        })}
                    </Group>
                </Flex>
                <AspectRatio ratio={16 / 9}  >
                    <Youtube width='100%' videoId={tasks[currentTaskIndex]?.[4]} opts={opts} onReady={(event) => registerPlayer(event)} onEnd={nextTask} />
                </AspectRatio>
                <Group position='left' py={'sm'}>
                    {Object.entries(categories).map(([k, v], index) => {
                        return (
                            <Button
                                key={k}
                                color={v}
                                radius="md"
                                size="lg"
                                style={{ margin: '5px' }}
                                onClick={() => report(k)}
                            >
                                {k}
                            </Button>
                        )
                    })}
                    <Button
                        color={'pink'}
                        radius="md"
                        size="lg"
                        style={{ margin: '5px' }}
                        onClick={() => reportExplicitContent(tasks[currentTask]?.[0], 'Trigger')}
                    >
                        Trigger
                    </Button>
                </Group>
            </div>
            <div className="right">
                {stages[currentStage].type === StageTypes.ChatDuring && <Chat stage={'ChatDuring'} />}
            </div>
        </div>
    )
}

export function Idle({ endStage, stages, currentStage }) {
    return (
        <Flex position="center" align={'center'} gap={'1em'} direction="column" spacing="lg">
            <Title order={1} w>Break Time!</Title>
            {stages[currentStage].type === StageTypes.ChatAfter ?
                <>
                    <Text>You can discuss your feelings with your colleagues</Text>
                    <Chat stage={'ChatAfter'} />
                </> :
                <Text>You can rest a little before starting the next stage.</Text>
            }
            <Button maw={'25%'} onClick={endStage}>End</Button>
        </Flex>
    )
}

export default function MainTask({ setCurrentState }) {
    const [finalReport, setFinalReport] = React.useState(new Set());

    const [stages, setStages] = React.useState([]);
    const [currentStage, setCurrentStage] = React.useState(0);
    const [currentTask, setCurrentTask] = React.useState(0);
    const [mode, setMode] = React.useState(stageModes.Ready);
    const [stageDeadline, setStageDeadline] = React.useState(null);
    const [buttonColors, setButtonColors] = React.useState(pickRandomColors());
    const [categories, setCategories] = React.useState(explicitCategories);
    const [player, setPlayer] = React.useState(null);
    const cloudStore = useCloudStore();


    useEffect(() => {
        getStages().then((stages) => {
            setStages(stages);
            console.log(stages)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function startStage() {
        let currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + parseInt((stages[currentStage].timeLimit)))
        setStageDeadline(currentDate);
        setMode(stageModes.Tasks);
        console.log("start stage", stages[currentStage].tasks[0][0])
        setCurrentTask(parseInt(stages[currentStage].tasks[0][0]) - 1);
    }

    function endTasks() {
        setMode(stageModes.Idle);
    }



    function nextTask() {
        const tasks = stages[currentStage].tasks;
        if ((currentTask % 3) + 1 === tasks.length) {
            endTasks();
        }
        cloudStore.saveFinalReport(finalReport, currentTask).then(() => {
            setFinalReport(new Set());
        }).catch((error) => {
            console.log(error)
        })
        setButtonColors(pickRandomColors());
        setCategories(shuffleArray(explicitCategories));
        setCurrentTask(currentTask + 1);
        player.loadVideoById(tasks[currentTask + 1]?.[4], 0, "large")
    }

    async function getCurrentTimeStampOfVideo() {
        try {
            const time = await player.getCurrentTime()
            return time
        }
        catch (e) {
            return "-1"
        }
    }
    function endStage() {
        if (currentStage + 1 === stages.length) {
            setCurrentState(states.Instructions)
        }
        setCurrentStage(currentStage + 1);
        setMode(stageModes.Ready)
        setStageDeadline(null);
    }
    function startBreak() {
        if (mode !== stageModes.Idle) {
            notifications.show({
                title: 'Break time!',
                message: 'It is time for a break',
                color: 'green',
                icon: <IconX />,
                autoClose: 5000,
            });

            setMode(stageModes.Idle)
        }
    }

    function timeUp() {
        endStage()
        notifications.show({
            title: 'Time up!',
            message: 'Time is up for this stage',
            color: 'orange',
            icon: <IconX />,
            autoClose: 5000,
        });
    }

    function registerPlayer(event) {
        setPlayer(event.target)
    }

    function reportExplicitContent(videoId, explicitCategory) {
        notifications.show({
            id: 'reporting',
            title: 'Reporting',
            message: `You reported ${explicitCategory} content`,
            icon: <IconCheck size="1rem" />,
            color: 'green',
            loading: true,
            autoClose: false,
        })
        getCurrentTimeStampOfVideo().then((time) => {
            const data = {
                videoId: videoId,
                timeStamp: time,
                explicitCategory: explicitCategory
            }
            cloudStore.saveReport(data).then(() => {
                notifications.update({
                    id: 'reporting',
                    title: 'Saved report',
                    message: `You reported ${explicitCategory} content`,
                    loading: false,
                    icon: <IconCheck size="1rem" />,
                    color: 'green',
                    autoClose: 1000,
                })
            }).catch((error) => {
                console.log(error)
                notifications.update('reporting', {
                    id: 'reporting',
                    title: 'Error saving report',
                    message: 'Please try again',
                    loading: false,
                    color: 'red',
                    icon: <IconX size="1rem" />,
                    autoClose: 1000,
                })
            })
        }).catch((error) => {
            console.log(error)
        })


    }

    function renderMode() {
        switch (mode) {
            case stageModes.Ready:
                return <Ready startStage={() => startStage()} />
            case stageModes.Tasks:
                return <Tasks tasks={stages[currentStage].tasks} nextTask={nextTask} currentTask={currentTask} registerPlayer={registerPlayer} reportExplicitContent={reportExplicitContent} stages={stages} currentStage={currentStage} finalReport={finalReport} setFinalReport={setFinalReport} />
            case stageModes.Idle:
                return <Idle endStage={() => endStage()} stages={stages} currentStage={currentStage} />
            default:
                return <Idle endStage={() => endStage()} />
        }
    }




    return (
        <>
            <div className='header' >
                <Group>
                    <Text color={'pink.4'} weight='700' >Stage: </Text>
                    <RingProgress size={80} thickness={6}
                        sections={[{ value: (((currentStage + 1)) / stages.length * 100), color: 'pink.4', }]}
                        label={
                            <Text color="pink.4" weight={700} align="center" size="sm">
                                {currentStage + 1}/{stages.length}
                            </Text>
                        }
                    />
                    {stageDeadline &&
                        <Timer deadline={stageDeadline} timeUp={timeUp} startBreak={startBreak} />
                    }
                </Group>
                <Title order={1} color='pink.4' >CoCoMo</Title>
                {stages.length > 0 &&
                    <Group>
                        <Text color={'pink.4'} weight='700' >Completion: </Text>
                        <RingProgress size={80} thickness={6}
                            sections={[{ value: ((currentTask) % 3 / stages[currentStage].tasks.length * 100), color: 'pink.4', }]}
                            label={
                                <Text color="pink.4" weight={700} align="center" size="sm">
                                    {(currentTask) % 3}/{stages[currentStage].tasks.length}
                                </Text>
                            }
                        />
                    </Group>
                }
            </div>
            <div className='main' >
                {renderMode()}
            </div>
        </>
    )
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


// Function to pick a random color
function pickRandomColors() {
    const pickedColors = [];
    const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'teal'];
    while (pickedColors.length < 4) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        if (!pickedColors.includes(randomColor)) {
            pickedColors.push(randomColor);
        }
    }
    return pickedColors;
}