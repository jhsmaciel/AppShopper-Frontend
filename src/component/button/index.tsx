import React from 'react';
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { colors } from "../../config";
import { Text } from '../text';

interface ButtonProps {
    onPress: () => void,
    disabled?: boolean,
    children?: string,
}

export function Button (props: ButtonProps) {
    const { onPress, children, disabled } = props;
    return (
        <RectButton
            style={[
                !disabled ? 
                    {
                        backgroundColor: colors.primary,
                    }
                : 
                    {
                        backgroundColor: colors.disabled
                    },
                styles.button
            ]}
            onPress={onPress}
            enabled={!disabled}
        >
            <Text style={styles.text} color={colors.light} type="light">
                {
                    children?.toUpperCase()
                }
            </Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        height: 46,
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    }
})