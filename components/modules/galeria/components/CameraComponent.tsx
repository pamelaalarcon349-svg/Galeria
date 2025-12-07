import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type Props ={
    onCancel: () => void;
    onPictureTaked: (uri: string) => void;
}
export default function CameraComponent({onCancel, onPictureTaked}: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  //referencia para el componente de camara
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loa
    // ding.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Se requiere acceso a la camara</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
   
  const takePicture = async()=>{
//acceder al componente de camara y tomar foto
const photo = await cameraRef.current?.takePictureAsync();

if(photo){
    onPictureTaked(photo.uri);
}
  }
  return(  
    <View style={styles.container}>
      <CameraView 
      ref={cameraRef}
      style={styles.camera}
       facing={facing} />
   <View style= {styles.container}>
                <View style={styles.buttons}>
             <TouchableOpacity
                    onPress={onCancel}>
                        <Ionicons
                          name ="close"
                          size={32}
                          color="white" />
                    </TouchableOpacity>               
                    <TouchableOpacity
                     onPress={takePicture} >
                        <Ionicons
                          name ="camera-outline"
                          size={32}
                          color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={toggleCameraFacing}>
                        <Ionicons
                          name ="camera-reverse-outline"
                          size={32}
                          color="white" />
                    </TouchableOpacity>
                </View>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,

  },
    buttons:{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent:'space-around',
    },
});
