import { View, Text, StyleSheet, Button } from "react-native"
import { Note } from "../../domain/note.interface"

type Props = {
    note: Note,
    onEdit: (note: Note) => void,
    onDelete: (id: string) => void
}

export function NoteItem({ note, onEdit, onDelete }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.description}>{note.description}</Text>
            <Text style={styles.date}>
                {note.date.toLocaleString()}
            </Text>

            <View style={styles.row}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Editar"
                        onPress={() => onEdit(note)}
                    />
                </View>

                <View style={{ width: 10 }} />

                <View style={styles.buttonContainer}>
                    <Button
                        title="Eliminar"
                        color="green"
                        onPress={() => onDelete(note.id)}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 14,
        marginVertical: 8,
        backgroundColor: "#eee",
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        marginTop: 4,
    },
    date: {
        marginTop: 6,
        fontSize: 12,
        color: "#555"
    },

    row: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },

    buttonContainer: {
        flex: 1
    }
});
