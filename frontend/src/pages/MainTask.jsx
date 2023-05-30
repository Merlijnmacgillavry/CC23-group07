import React from 'react'
import { Group, Header, Image, RingProgress, Text, Title, AspectRatio, Divider, Button } from '@mantine/core'
import getTasks from '../utils/getTasks';
import { useEffect } from 'react';
import Youtube from 'react-youtube';
import { states } from '../App'
import { useCloudStore } from '../providers/CloudStoreProvider';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const explicitCategories = [
    'Sex',
    'Violence',
    'Drugs',
    'Language'
]

export default function MainTask({ setCurrentState }) {
    const [buttonColors, setButtonColors] = React.useState(pickRandomColors());
    const [categories, setCategories] = React.useState(explicitCategories);
    const [currentTask, setCurrentTask] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);
    const [player, setPlayer] = React.useState(null);
    const [reports, setReports] = React.useState([]);

    const cloudStore = useCloudStore();

    useEffect(() => {
        getTasks().then((tasks) => {
            setTasks(tasks);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // useEffect(() => {
    //     // console.log(reports)
    // }, [reports])


    let opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
            controls: 0,
            // modestbranding: 1,
            origin: "https://www.youtube.com", 
            playsInline: 1
        },
    }

    function nextTask() {
        if (currentTask + 1 === tasks.length) {
            setCurrentTask(0);
            notifications.show({
                id: 'saving-reports',
                title: 'Saving reports',
                message: 'Please wait...',
                loading: true,
                autoClose: false,
            })
            cloudStore.saveReports(reports).then(() => {
                console.log('saved reports')
                notifications.update('saving-reports', {
                    title: 'Saved reports',
                    loading: false,
                    icon: <IconCheck size="1rem" />,
                    color: 'green',
                    autoClose: 2000,
                })

                setCurrentState(states.ExitSurvey)
            }).catch((error) => {
                console.log(error)
                notifications.update('saving-reports', {
                    title: 'Error saving reports',
                    message: 'Please try again',
                    loading: false,
                    color: 'red',
                    icon: <IconX size="1rem" />,
                    autoClose: 2000,
                })
            })

        }
        setButtonColors(pickRandomColors());
        setCategories(shuffleArray(explicitCategories));
        setCurrentTask(currentTask + 1);
        player.loadVideoById(tasks[currentTask + 1]?.[3], 0, "large")
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

    function registerPlayer(event) {
        // console.log(event.target.getPlayerState())
        // if(event.target.getPlayerState() === -1){
        //     event.target.playVideo()
        // }
        setPlayer(event.target)
    }

    function reportExplicitContent(videoId, explicitCategory) {
        notifications.show({
            id: 'reporting',
            title: 'Reporting',
            message: `You reported ${explicitCategory} content`,
            icon: <IconCheck size="1rem" />,
            color: 'green',
            autoClose: 2000,
        })
        getCurrentTimeStampOfVideo().then((time) => {
            const data = {
                videoId: videoId,
                timeStamp: time,
                explicitCategory: explicitCategory
            }
            setReports((reports) => [...reports, data])
        }).catch((error) => {
            console.log(error)
        })

    }



    return (
        <>
            <div className='header' >
                <Image src="./logo.svg" width={60} height={60} />
                <Title order={1} color='pink.4' >CoCoMo</Title>
                <Group>
                    <Text color={'pink.4'} weight='700' >Completion: </Text>
                    <RingProgress size={80} thickness={6}
                        sections={[{ value: ((currentTask + 1) / tasks.length * 100), color: 'pink.4', }]}
                        label={
                            <Text color="pink.4" weight={700} align="center" size="sm">
                                {currentTask + 1}/{tasks.length}
                            </Text>
                        }
                    />
                </Group>
            </div>
            {/* <Divider py={'sm'} /> */}
            <Title order={2} color='pink.4' ta={'left'} mb='md'>{tasks[currentTask]?.[1]} - {tasks[currentTask]?.[2]}</Title>
            <AspectRatio ratio={16 / 9} maw={'75%'}  >
                {/* <iframe
                    src={tasks[currentTask]?.[3]}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                /> */}
                <Youtube width='100%' videoId={tasks[currentTask]?.[3]} opts={opts} onReady={(event) => registerPlayer(event)} onEnd={nextTask} />
            </AspectRatio>
            {/* <Divider py={'sm'} /> */}
            <Group position='left' py={'sm'}>
                {categories.map((category, index) => {
                    return (
                        <Button
                            key={category}
                            color={buttonColors[index]}
                            radius="md"
                            size="lg"
                            style={{ margin: '5px' }}
                            onClick={() => reportExplicitContent(tasks[currentTask]?.[0], category)}
                        >
                            {category}
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