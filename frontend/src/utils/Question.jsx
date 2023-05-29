import React from 'react'
import { Text, SegmentedControl } from '@mantine/core';

export default function LikertQuestion({ form, question }) {
    return (
        <div>
            <Text fw={700} ta={'left'} my='sm'>{question}</Text>
            <SegmentedControl
                data={likertOptions}
                {...form.getInputProps(question)}
            />
        </div>)
}
export const likertOptions =
    [
        { label: 'Strongly Disagree', value: '1' },
        { label: 'Disagree', value: '2' },
        { label: 'Neutral', value: '3' },
        { label: 'Agree', value: '4' },
        { label: 'Strongly Agree', value: '5' },
    ]
