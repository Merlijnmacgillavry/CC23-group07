import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

async function getTasks() {
    try {
        const tasks = await fetch('tasks.csv').then((response) => response.text());

        const parsedTasks = Papa.parse(tasks).data.slice(1);

        return parsedTasks;
    }
    catch (error) {
        console.error('Error reading CSV file:', error);
    }
}

export default getTasks;