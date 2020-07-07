import React, { useState } from 'react';
import { Input } from '../Input';
import { Platform, Keyboard } from 'react-native';
import moment, { Moment } from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
    value: Moment,
    onChange: (value: Moment ) => void
}

export const DatePicker = (props: DatePickerProps) => {
    const { value, onChange } = props;
    const [visible, setVisible] = useState<boolean>(false);

    function _onChange (event: any, selectedDate: any){
        const currentDate = selectedDate || value;
        setVisible(Platform.OS === 'ios');
        onChange(moment(currentDate))
    };

    return (
        <>
            <Input
                onChange={console.log}
                value={value.format("DD/MM/yyyy")}
                label="Nascimento"
                onClick={() => {
                    setVisible(true)
                    Keyboard.dismiss()
                }}
            />
            {
                visible && (
                    <DateTimePicker
                        value={value?.toDate()}
                        testID="dateTimePicker"
                        mode="date"
                        is24Hour
                        display="default"
                        onChange={_onChange}
                    />
                )
            }
        </>
    );

}