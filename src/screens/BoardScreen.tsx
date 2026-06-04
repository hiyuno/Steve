import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Board, useGoals } from '../context/GoalsContext';
import GoalItem from '../components/GoalItem';
import AddGoalModal from '../components/AddGoalModal';

interface Props {
  board: Board;
  accentColor: string;
}

const boardLabels: Record<Board, { title: string; subtitle: string }> = {
  week: { title: 'This Week', subtitle: 'Short-term focus' },
  month: { title: 'This Month', subtitle: 'Medium-term momentum' },
  year: { title: 'This Year', subtitle: 'Big picture goals' },
};

export default function BoardScreen({ board, accentColor }: Props) {
  const { state, dispatch } = useGoals();
  const [modalVisible, setModalVisible] = useState(false);

  const goals = state.goals.filter(g => g.board === board);
  const active = goals.filter(g => !g.completed);
  const done = goals.filter(g => g.completed);
  const progress = goals.length > 0 ? done.length / goals.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{boardLabels[board].title}</Text>
          <Text style={styles.subtitle}>{boardLabels[board].subtitle}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color: accentColor }]}>
            {done.length}/{goals.length}
          </Text>
        </View>
      </View>

      {goals.length > 0 && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%`, backgroundColor: accentColor },
            ]}
          />
        </View>
      )}

      <FlatList
        data={[...active, ...done]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>No goals yet</Text>
            <Text style={styles.emptyHint}>Tap + to set your first goal</Text>
          </View>
        }
        renderItem={({ item }) => (
          <GoalItem
            goal={item}
            accentColor={accentColor}
            onToggle={() => dispatch({ type: 'TOGGLE_GOAL', payload: { id: item.id } })}
            onDelete={() => dispatch({ type: 'DELETE_GOAL', payload: { id: item.id } })}
          />
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: accentColor }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddGoalModal
        visible={modalVisible}
        accentColor={accentColor}
        onClose={() => setModalVisible(false)}
        onAdd={text => {
          dispatch({ type: 'ADD_GOAL', payload: { text, board } });
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F1E' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#555', fontSize: 13, marginTop: 3 },
  badge: {
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { fontSize: 14, fontWeight: '700' },
  progressBar: {
    height: 3,
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#555', fontSize: 18, fontWeight: '700' },
  emptyHint: { color: '#3A3A5A', fontSize: 14, marginTop: 6 },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  fabText: { color: '#fff', fontSize: 30, fontWeight: '300', lineHeight: 34 },
});
