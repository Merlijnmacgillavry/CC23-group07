import React from 'react'
import { Group, Header, Image, RingProgress, Text, Title, AspectRatio, Divider, Button } from '@mantine/core'
import getTasks from '../utils/getTasks';
import { useEffect } from 'react';
import Youtube from 'react-youtube';

export const explicitCategories = [
    'Sex',
    'Violence',
    'Drugs',
    'Language'
]

export default function MainTask() {
    const buttonColors = pickRandomColors();
    const [currentTask, setCurrentTask] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);
    const [player, setPlayer] = React.useState(null);
    const [reports, setReports] = React.useState([]);

    useEffect(() => {
        getTasks().then((tasks) => {
            console.log(tasks)
            setTasks(tasks);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        console.log(reports)
    }, [reports])


    let opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    function nextTask() {
        console.log("next task"
        )
        setCurrentTask(currentTask + 1);
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
        setPlayer(event.target)
    }

    function reportExplicitContent(videoId, explicitCategory) {
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
                        sections={[{ value: 40, color: 'pink.4', }]}
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
                <Youtube videoId={tasks[currentTask]?.[3]} opts={opts} onReady={(event) => registerPlayer(event)} onEnd={nextTask} />
            </AspectRatio>
            {/* <Divider py={'sm'} /> */}
            <Group py={'md'}>
                {shuffleArray(explicitCategories).map((category, index) => {
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
                    onClick={nextTask}
                />
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