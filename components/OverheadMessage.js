import React, { useState } from "react";
import { View, Text } from "react-native";

const OverheadMessage = ({ Route, messageType, message }) => {
    const ohmHeight = 160;

    const [animatedDynPos, setPos] = useState(0);

    var color = "#000"
    var textColor = "#fff"

    switch (messageType) {
        case "success":
            color = "#316933"
            textColor = "#fff"
            break
        case "failed":
            color = "#9A152D"
            textColor = "#fff"
            break
        default:
            color = "#587DBD"
            textColor = "#000"
            break
    }

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",

                position: "absolute",

                top: 0,

                width: "100%",
                height: ohmHeight,

                backgroundColor: color,

                justifyContent: "center",
                alignItems: "center",

            }}
        >
            <Text style={{
                color: textColor,
                padding: 10
            }}>{message}</Text>
        </View>
    )
}

const CreateOverheadMessage = (message, messageType) => {

    OverheadMessage({message, messageType})

}

export {CreateOverheadMessage}

export default OverheadMessage