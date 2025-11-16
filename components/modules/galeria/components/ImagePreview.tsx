import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    uri: string,
    onCancel: () => void;
    onSave: (uri: string) => void;
    newPhoto: () => void;
}

export function ImagePreview(
    { 
        uri,
        onCancel,
        onSave,
        newPhoto,
    }: Props
){

    return (
        <View style= {styles.container}>
            <Image
            source={{ uri}}
            style={styles.photo}
            />
            <View style={styles.buttons}>
                
                <TouchableOpacity
                onPress={onCancel}
                >
                    <Ionicons
                      name ="close"
                      size={32}
                      color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => onSave(uri)}
                 >
                    <Ionicons
                      name ="save-outline"
                      size={32}
                      color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                      name ="camera-outline"
                      size={32}
                      color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    photo:{
      height: '100%',
      objectFit: 'contain',

    },

    buttons:{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent:'space-around',
    }
})