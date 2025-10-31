import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as community from '@/seed/community_information.json';

export default function Invite() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {community.community_name}
      </Text>
      <QRCode value={community.community_name} size={200} />
    </View>
  );
}
