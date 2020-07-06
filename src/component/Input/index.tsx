import React, { useState } from 'react';
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../../config";

interface InputProps {
    placeholder?: string,
    maxLength?: number,
    onChange: (value: string) => void,
    value: string
}

export function Input (props: InputProps) {
    return (
        <TextInput
            placeholderTextColor={colors.primary}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            style={styles.input}
            value={props.value}
            onChangeText={props.onChange}
            autoCorrect={false}
        />
    );
}


interface InputPasswordProps {
    placeholder: string,
    maxLength?: number,
    onChange: (value: string) => void,
    value: string,
    disabled?: boolean
}

export function InputPassword (props: InputPasswordProps) {
    const [visible, setVisible] = useState<boolean>(true);
    
    return (
        <TextInput
            placeholderTextColor={colors.primary}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            style={styles.input}
            onChangeText={props.onChange}
            secureTextEntry={visible}
            value={props.value}
            autoCapitalize="characters"
            autoCorrect={false}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 46,
        backgroundColor: colors.disabled,
        borderRadius: 10,
        marginBottom: 8,
        width: '100%',
        paddingHorizontal: 24,
        fontSize: 16,
        color: colors.primary
    }
})