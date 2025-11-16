// GalleryView.tsx
// vista de galeria

import { FlatList, Image, StyleSheet, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";
import { useState } from "react";
/**
 * Contiene:
 * - Botón para añadir imagen
 * - Galería de imágenes en un FlatList
 */
export function GalleryView() {
  // estado para las imágenes
  const [images, setImages] = useState<string[]>([]);

  // agregar imagen nueva a la colección
  const addPhoto = (uri: string) => {
    setImages([uri, ...images]);
  };

  return (
    <View style={styles.container}>
      {/* botón para añadir imagen */}
      <ImagePicker onPhotoSelected={addPhoto} />

      {/* mostrar fotos con FlatList */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // para mostrar en formato de galería
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  gallery: {
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
});
