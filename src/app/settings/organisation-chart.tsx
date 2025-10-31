import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Avatar,
  Button,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  IconProps,
} from '@ui-kitten/components';
import initialData from '@/seed/organisation_chart.json';
import { members as allMembers } from '@/data/members';

// Type definitions
interface Member {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
}

interface Tier {
  tier: number;
  members: Member[];
}

const PlusIcon = (props: IconProps) => (
  <Icon {...props} name='plus-outline'/>
);

const EditIcon = (props: IconProps) => (
  <Icon {...props} name='edit-outline'/>
);

const DeleteIcon = (props: IconProps) => (
  <Icon {...props} name='trash-2-outline'/>
);

// Add unique IDs to initial data for key and update operations
const initialDataWithIds: Tier[] = initialData.map((tier, tierIndex) => ({
  ...tier,
  members: tier.members.map((member, memberIndex) => ({
    ...member,
    id: `${tier.tier}-${memberIndex}-${Date.now()}`
  }))
}));


export default function OrganisationChartScreen() {
  const [data, setData] = useState<Tier[]>(initialDataWithIds);
  const [editingTier, setEditingTier] = useState<number | undefined>();
  const [editingMember, setEditingMember] = useState<Partial<Member> | undefined>();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<IndexPath | undefined>();

  const handleAddTier = () => {
    const newTier: Tier = { tier: data.length + 1, members: [] };
    setData([...data, newTier]);
  };

  const handleAddMember = (tierIndex: number) => {
    setEditingTier(tierIndex);
    setEditingMember({ name: '', position: '' });
    setSelectedMemberIndex(undefined);
  };

  const handleSaveMember = (tierIndex: number) => {
    if (!editingMember) return;

    const newData = [...data];
    const memberFromList = selectedMemberIndex ? allMembers[selectedMemberIndex.row] : null;

    if (editingMember.id) {
      // Update existing member
      const memberIndex = newData[tierIndex].members.findIndex(m => m.id === editingMember.id);
      if (memberIndex !== -1) {
        const originalMember = newData[tierIndex].members[memberIndex];
        newData[tierIndex].members[memberIndex] = {
          ...originalMember,
          position: editingMember.position || originalMember.position,
          name: memberFromList ? memberFromList.name : (editingMember.name || originalMember.name),
          avatarUrl: memberFromList ? memberFromList.avatar : (editingMember.avatarUrl || originalMember.avatarUrl),
        };
      }
    } else {
      // Add new member
      if (memberFromList) {
          const newMember: Member = {
            id: Date.now().toString(),
            name: memberFromList.name,
            position: editingMember.position || '',
            avatarUrl: memberFromList.avatar,
          };
          newData[tierIndex].members.push(newMember);
      }
    }
    setData(newData);
    setEditingTier(undefined);
    setEditingMember(undefined);
    setSelectedMemberIndex(undefined);
  };

  const handleEditMember = (tierIndex: number, member: Member) => {
    setEditingTier(tierIndex);
    setEditingMember(member);
    const memberIndexInAllMembers = allMembers.findIndex(m => m.name === member.name);
    if (memberIndexInAllMembers > -1) {
        setSelectedMemberIndex(new IndexPath(memberIndexInAllMembers));
    } else {
        setSelectedMemberIndex(undefined);
    }
  }

  const handleDeleteMember = (tierIndex: number, memberId: string) => {
    const newData = [...data];
    newData[tierIndex].members = newData[tierIndex].members.filter(m => m.id !== memberId);
    setData(newData);
  }

  const renderTier = ({ item: tier, index: tierIndex }: { item: Tier, index: number }) => (
    <View style={styles.tierContainer}>
      <Text category="h6" style={styles.tierTitle}>Tier {tier.tier}</Text>
      {
        tier.members.map((member) => (
          <ListItem
            key={member.id}
            style={styles.memberItem}
            title={`${member.name}`}
            description={`${member.position}`}
            accessoryLeft={() => <Avatar source={{ uri: member.avatarUrl }} />}
            accessoryRight={() => (
              <View style={styles.memberActions}>
                <Button appearance='ghost' accessoryLeft={EditIcon} onPress={() => handleEditMember(tierIndex, member)} />
                <Button appearance='ghost' accessoryLeft={DeleteIcon} onPress={() => handleDeleteMember(tierIndex, member.id)} />
              </View>
            )}
          />
        ))
      }
      {
        editingTier === tierIndex && editingMember && (
          <View style={styles.editForm}>
            <TextInput
              placeholder="Jawatan"
              value={editingMember.position || ''}
              onChangeText={(text) => setEditingMember({ ...editingMember, position: text })}
              style={styles.input}
            />
            <Select
              style={styles.select}
              placeholder='Nama'
              value={selectedMemberIndex ? allMembers[selectedMemberIndex.row].name : (editingMember.name || '')}
              selectedIndex={selectedMemberIndex}
              onSelect={(index) => {
                // This is the key change: ensure we only set an IndexPath or undefined
                if (index instanceof IndexPath) {
                  setSelectedMemberIndex(index);
                } else {
                  setSelectedMemberIndex(undefined);
                }
              }}>
              {allMembers.map((member, i) => (
                <SelectItem key={i} title={member.name}/>
              ))}
            </Select>
            <Button onPress={() => handleSaveMember(tierIndex)}>Simpan</Button>
          </View>
        )
      }
      <Button style={styles.addMemberButton} appearance='ghost' accessoryLeft={PlusIcon} onPress={() => handleAddMember(tierIndex)} />
    </View>
  );

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Carta Organisasi
      </Text>
      <List
        style={styles.list}
        data={data}
        renderItem={renderTier}
        keyExtractor={(item) => item.tier.toString()}
      />
       <Button style={styles.addTierButton} onPress={handleAddTier}>Add Tier</Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    backgroundColor: 'transparent',
  },
  tierContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tierTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  memberItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  memberActions: {
    flexDirection: 'row',
  },
  addMemberButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  addTierButton: {
    marginTop: 20,
  },
  editForm: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  select: {
    marginBottom: 10,
  },
});
