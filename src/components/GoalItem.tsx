import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Goal } from '../context/GoalsContext';

interface Props {
  goal: Goal;
  accentColor: string;
  onToggle: () => void;
  onDelete: () => void;
}

export default function GoalItem({ goal, accentColor, onToggle, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          goal.completed && { backgroundColor: accentColor, borderColor: accentColor },
        ]}
        onPress={onToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {goal.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text
        style={[styles.text, goal.completed && styles.completedText]}
        numberOfLines={3}
      >
        {goal.text}
      </Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  text: { flex: 1, color: '#E8E8F0', fontSize: 15, lineHeight: 22 },
  completedText: { color: '#555', textDecorationLine: 'line-through' },
  deleteBtn: { padding: 4, marginLeft: 10 },
  deleteText: { color: '#444', fontSize: 15 },
});
