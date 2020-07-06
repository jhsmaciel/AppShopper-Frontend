import React from 'react';
import { StyleSheet, View } from "react-native";
import { colors } from '../../config';
import { Text } from '../text';
import Icon from 'react-native-vector-icons/Feather';

interface HeaderProps {
    onPressBack?: () => void,
    label?: string
}

export function Header (props: HeaderProps) {
    const { label, onPressBack } = props;
    
    return (
        <View
            style={styles.header}
        >
            <View
                style={styles.left} 
                onTouchStart={onPressBack}
            >
                <Icon name="arrow-left" size={20} color={colors.light}/>
            </View>
            <View
                style={styles.mid}
            ><Text size="big" color={colors.light}>{label}</Text></View>
            <View
                style={styles.left} 
            ><Text>Voltar</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: '15%',
        backgroundColor: colors.primary,
        flexDirection: 'row',
        paddingTop: '5%',
        alignSelf: 'center',
        width: '100%'
    },
    left: {
        width: '20%',
        alignItems: 'center',
        paddingTop: '1%'
    },
    mid: {
        width: '60%',
    },
    right: {
        width: '20%',

    }
})