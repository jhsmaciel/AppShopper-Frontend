import React from 'react';
import { StyleSheet, Text as TextRN, TextStyle } from "react-native";
import { sizes, colors } from "../../config";

interface TextProps {
    type?: "bold" | "light" | "regular" | "thin" | "semibold" | "medium",
    size?: "big" | "med" | "small",
    style?: TextStyle | TextStyle[]
    children?: string | React.ReactNode,
    color?: string
}

export function Text (props: TextProps) {
    const { type = "regular", size = "med", children, style, color = colors.primary } = props;
    let styleContats: TextStyle[] = [styles[type], styles[size], { color }];
    if(style instanceof Array) {
        styleContats = styleContats.concat(style);
    } else {
        styleContats.push(style)
    }
    return (
        <TextRN
            style={styleContats}
        >
            {children}
        </TextRN>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontFamily: "Exo-Bold",
    },
    medium: {
        fontFamily: "Exo-Medium",
    },
    light: {
        fontFamily: "Exo-Light",
    },
    regular: {
        fontFamily: "Exo-Regular",
    },
    semibold: {
        fontFamily: "Exo-SemiBold",
    },
    thin : {
        fontFamily: "Exo-Thin",
    },
    big: {
        fontSize: sizes.big,
    },
    med: {
        fontSize: sizes.medium
    },
    small: {
        fontSize: sizes.small
    }
})