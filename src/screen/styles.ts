import { StyleSheet } from "react-native";
import { colors } from "../config";

export const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        backgroundColor: colors.light,
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 15,
        paddingTop: 15
    },
    background: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    inputSearch: {
        paddingHorizontal: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    viewMainRepo: {
        padding: 10,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    viewRepo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    iconSearch: { 
        width: '10%',
        height: 46,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
})