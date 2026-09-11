import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import MapPin from "lucide-react-native/icons/map-pin";

export default function GPSAccuracyMeter({margin}){

    const [color, setColor] = useState(null);

    const colorSetting = (margin) => {
        if(margin < 10) setColor("#00ff22")
        else if(margin > 10 && margin <= 30) setColor("#ffe600")
        else if(margin > 30 && margin <= 80) setColor("#ff3131")
    }

    useEffect(() => {
        colorSetting(margin);
    }, [margin]);

    return(
        <View style={{alignItems: 'center', width: 'auto'}}>
            <MapPin color={color}/>
            {margin <= 10 && ( // High & Highest
                <Text style={{color: color}}>Precisão alta</Text>
            )}
            {margin > 10 && margin <= 30 && ( // Balanced
                <Text style={{color: color}}>Precisão média</Text>
            )}
            {margin > 30 && ( // Low
                <Text style={{color: color}}>Precisão baixa</Text>
            )}
        </View>
    );
}