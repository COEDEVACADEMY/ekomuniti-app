import { Tabs } from 'expo-router';
import { Home, Users, Settings } from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';

function CustomTabButton({ children, onPress, accessibilityState, ...props }: any) {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? '#D4FF00' : 'transparent',
        borderRadius: 50,
        marginHorizontal: 4,
        paddingHorizontal: focused ? 24 : 12,
        paddingVertical: 8,
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={focused ? '#000' : color} />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: 'Members',
          tabBarIcon: ({ color, focused }) => (
            <Users size={24} color={focused ? '#000' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Settings size={24} color={focused ? '#000' : color} />
          ),
        }}
      />
    </Tabs>
  );
}
