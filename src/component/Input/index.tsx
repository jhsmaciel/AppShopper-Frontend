import React, { useState } from 'react';
import { StyleSheet, TextInput, View,  } from "react-native";
import { colors } from "../../config";
import { Text } from '../text';
import { ErrorMessage, useFormikContext, FormikValues } from 'formik';
import { FormValidateContext } from '../../screen/login/createuser';

export interface InputProps {
    placeholder?: string,
    maxLength?: number,
    onChange: (value: string) => void,
    label?: string,
    value: string,
    editable?: boolean,
    onClick?: () => void,
    onBlur?: (value: any) => void,
}

const MessageError: React.FC<{ name: string }> = (props) => {
    return (
        <ErrorMessage name={props.name} render={(errMsg) =><Text color={colors.error}>{errMsg}</Text>}/>
    );
}

export function Input (props: InputProps) {
    const { editable = true } = props;

    return (
        <View
            style={{
                width: '100%'
            }}
        >
            {
                props?.label && <Text size="small" style={styles.label}>{props?.label}</Text>
            }
            <TextInput
                placeholderTextColor={colors.primary}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                style={styles.input}
                value={props.value}
                onBlur={props.onBlur}
                editable={editable}
                onChangeText={props.onChange}
                onTouchStart={props?.onClick}
                autoCorrect={false}
            />
        </View>
    );
}

interface FieldProps {
    name: string,
    label?: string,
    // value: string,
    onClick?: () => void,
    placeholder?: string,
    maxLength?: number,
    onChange?: (value: string) => void,
    onBlur?: (e: any) => void,
}
export function Field (props: FieldProps) {
    const { touched, handleBlur, handleChange, isSubmitting, values, initialValues } = useFormikContext<FormikValues>();
    const { name } = props;
    return (
        <View
            style={{
                width: '100%'
            }}
        >
            {
                props?.label && <Text size="small" style={styles.label}>{props?.label}</Text>
            }
            <TextInput
                placeholderTextColor={colors.primary}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                style={styles.input}
                // onBlur={handleChange(props.name)}
                editable={!isSubmitting}
                onChangeText={props?.onChange}
                value={values[name]}
                onBlur={props?.onBlur}
                // onChangeText={handleBlur(props.name)}
                autoCorrect={false}
            />
            <MessageError name={props.name}/>
        </View>
    );
}

interface InputPasswordProps {
    placeholder?: string,
    maxLength?: number,
    onChange: (value: string) => void,
    value: string,
    disabled?: boolean,
    label?: string,
}

export function InputPassword (props: InputPasswordProps) {
    const [visible, setVisible] = useState<boolean>(true);
    
    return (
        <View 
            style={{
                width: '100%'
            }}
        >
            {
                props?.label && <Text size="small" style={styles.label}>{props?.label}</Text>
            }
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
        </View>
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
    },
    label: {
        paddingBottom: 2
    }
})