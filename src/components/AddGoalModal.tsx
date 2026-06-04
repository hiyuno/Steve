import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

interface Props {
  visible: boolean;
  accentColor: string;
  onClose: () => void;
  onAdd: (text: string) => void;
}

export default function AddGoalModal({ visible, accentColor, onClose, onAdd }: Props) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  const handleClose = () => {
    onClose();
    setText('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>New Goal</Text>
          <TextInput
            style={styles.input}
            placeholder="What do you want to achieve?"
            placeholderTextColor="#555"
            value={text}
            onChangeText={setText}
            autoFocus
            multiline
            maxLength={200}
          />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addBtn,
                { backgroundColor: accentColor },
                !text.trim() && styles.disabled,
              ]}
              onPress={handleAdd}
              disabled={!text.trim()}
            >
              <Text style={styles.addText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  input: {
    color: '#E8E8F0',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A2A4E',
    borderRadius: 14,
    padding: 16,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A4E',
    alignItems: 'center',
  },
  cancelText: { color: '#888', fontSize: 15, fontWeight: '600' },
  addBtn: {
    flex: 2,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  disabled: { opacity: 0.4 },
});
