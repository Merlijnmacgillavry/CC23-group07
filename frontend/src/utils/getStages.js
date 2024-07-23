import Papa from 'papaparse';
import getTasks from './getTasks';

/**
 * get Stages from stages.csv and add corresponding tasks. Each stage has a timelimit and a type.
 * @returns Promise<Stage[]>
 */
async function getStages() {
    try {
        const stages = await fetch('stages.csv').then((response) => response.text());
        const parsedStages = Papa.parse(stages).data.slice(1);
        const tasks = await getTasks();
        const result = [];
        for (const parsedStage of parsedStages) {
            let stage = new Stage(parsedStage[0], parsedStage[1], parsedStage[2], getTasksForStage(parsedStage[0], tasks), parsedStage[3]);
            result.push(stage);
        }
        return result
    }
    catch (error) {
        console.error('Error reading CSV file:', error);
    }
}

function getTasksForStage(stageId, tasks) {
    const tasksForStage = tasks.filter((task) => task[1] === stageId);
    return tasksForStage;
}

export default getStages;

export const StageTypes = {
    BaseLine: 'BaseLine',
    ChatAfter: 'ChatAfter',
    ChatDuring: 'ChatDuring',
}

class Stage {
    constructor(id, type, timeLimit, tasks, breakTime) {
        this.id = id;
        switch (type) {
            case StageTypes.BaseLine:
                this.type = StageTypes.BaseLine;
                break;
            case StageTypes.ChatAfter:
                this.type = StageTypes.ChatAfter;
                break;
            case StageTypes.ChatDuring:
                this.type = StageTypes.ChatDuring;
                break;
            default:
                console.log(type)
                throw new Error('Invalid stage type');
        }
        this.timeLimit = timeLimit;
        this.tasks = tasks
        this.breakTime = breakTime
    }
}