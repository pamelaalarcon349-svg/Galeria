// NotasView.tsx

import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { HisView } from "./components/HisView";
import { Note } from "../domain/note.interface";
import { NoteItem } from "./components/NoteItem";
import { getNotes, saveNote, deleteNote } from "../infraestructure/dataSource";

export function NotasView() {
  const [Notas, setNotas] = useState<Note[]>([
    {
      id: 'assa',
      title: 'ejemplo de nota',
      description: 'este es un ejemplo de nota',
      date: new Date(),
    }
  ]);

  const [selected, setSelected] = useState<Note | null>(null);

  const onNewNote = () => {
    setSelected({
      id: '',
      title: '',
      description: '',
      date: new Date(),
    });
  };

  const onNoteChanged = (note: Note) => {
    saveNote(note)
      .then((result) => {

        if (!result) return;

        if (!note.id) {
          // nueva nota
          setNotas([...Notas, result]);
        } else {
          // actualizar nota
          setNotas(
            Notas.map((item) => (item.id === result.id ? result : item))
          );
        }

        setSelected(null);
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo guardar la nota.");
      });
  };

  const onCancelModal = () => {
    setSelected(null);
  };

  const onDeleteNote = (id: string) => {
    Alert.alert(
      "Eliminar",
      "¿Seguro que deseas eliminar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            deleteNote(id).then(() => {
              setNotas(Notas.filter((n) => n.id !== id));
            });
          },
        },
      ]
    );
  };

  const onEditNote = (note: Note) => {
    setSelected(note);
  };

  useEffect(() => {
    getNotes()
      .then((results) => {
        setNotas(results);
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo conectar al servidor :(");
      });
  }, []);

  return (
    <View style={styles.container}>

      <HisView
        oneSaved={onNoteChanged}
        onCancel={onCancelModal}
        note={selected}
      />

      <FlatList
        data={Notas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <NoteItem
            note={item}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton}
        onPress={onNewNote}>
        <Text style={styles.text}>Agregar Nota</Text>
      </TouchableOpacity>

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
  listContent: {
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
